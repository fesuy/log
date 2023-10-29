import fs from 'fs';
import path from 'path';
import padZero2 from './pad-zero2.js';

/**
 * File Writer class
 * @class
 */
class FileWriter {

  /**
   * Constructor
   * @param logDir
   */
  constructor(logDir) {
    this.logDir           = logDir;
    this.encoding         = 'utf8';
    this.DATE_SEPARATOR   = '-'; // Separator
    this.fs               = void 0; // Initialize fs
    this.currentPath      = void 0;

    this.MAX_LOG_FILE     = 7;
  }

  /**
   * Retrieve log file path
   */
  getLogPath_() {
    const filename = this.getDate_() + '.log';

    return path.join(this.logDir, filename);
  }

  /**
   * Retrieve current date string
   * @returns string
   */
  getDate_() {
    const date = new Date();

    return [
      date.getFullYear(),
      padZero2(date.getMonth() + 1),
      padZero2(date.getDate()),
    ].join(this.DATE_SEPARATOR);
  }

  /**
   * Retrieve is log file should change
   * @returns bool
   */
  shouldChangeFile_() {
    const newLogPath  = this.getLogPath_();
    const changed     = newLogPath !== this.currentPath;

    // Log path different
    // Remove other log file when reached MAX_LOG_FILE
    if (changed) {
      this.currentPath = newLogPath;
      this.removeUnusedLog_();
    }

    return changed;
  }

  /**
   * Remove Unused log files
   */
  removeUnusedLog_() {
    const that = this;

    fs.readdir(that.logDir, (err, files) => {
      if (err) {
        throw err;
      }

      // 1. Get time modified of file
      // 2. Filter only `.log` extension
      // 3. Sort file by modified
      const logFiles = files.map(filename => ({
          name: filename,
          time: fs.statSync(path.join(that.logDir, filename)).mtime.getTime()
        })) // 1
        .filter(file => path.extname(file.name) == '.log') // 2
        .sort((a, b) => a.time - b.time); // 3

      if (logFiles.length > that.MAX_LOG_FILE) {
        for (let i=0;i<(logFiles.length - that.MAX_LOG_FILE);i++) {
          const logFile = path.join(that.logDir, logFiles[i].name);

          // Untrusted
          if (logFile !== that.currentPath) {
            fs.unlinkSync(logFile);
          }
        }
      }
    });
  }

  /**
   * Create new log file
   */
  createLogFile_() {
    // End stream when already set
    if (this.fs) this.fs.end();

    this.fs = fs.createWriteStream(this.currentPath, { flags: 'a' });

    this.fs.on('error', err => {
      throw err;
    });
  }

  /**
   * Write log message
   * @param msg
   */
  log(msg) {
    if (this.shouldChangeFile_()) {
      this.createLogFile_();
    }

    this.fs.write(msg, this.encoding);
  }
}

export default FileWriter;
