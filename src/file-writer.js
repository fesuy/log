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
    if (changed) this.currentPath = newLogPath;

    return changed;
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
