import FileWriter from './file-writer.js';
import ConsoleWriter from './console-writer.js';
import padZero2 from './pad-zero2.js';
import base from './base.js';

/**
 * Logger class
 * @class
 */
class Logger {

  /**
   * Constructor
   * @param logDir    if log directory not specified log
   *                  will write in console
   */
  constructor(logDir) {
    this.writer = !logDir ? new ConsoleWriter() : new FileWriter(logDir);
  }

  /**
   * Trace log
   * @param msg
   */
  trace(msg) {
    this.write_(base.TRACE_MSG, msg);
  }

  /**
   * Warn log
   * @param msg
   */
  warn(msg) {
    this.write_(base.WARN_MSG, msg);
  }

  /**
   * Info log
   * @param msg
   */
  info(msg) {
    this.write_(base.INFO_MSG, msg);
  }

  /**
   * Debug log
   * @param msg
   */
  debug(msg) {
    this.write_(base.DEBUG_MSG, msg);
  }

  /**
   * Error log
   * @param msg
   */
  error(msg) {
    this.write_(base.ERROR_MSG, msg);
  }

  /**
   * Retrieve current time string
   * @returns String
   */
  getTime_() {
    const date = new Date();

    return [
      padZero2(date.getHours()),
      padZero2(date.getMinutes()),
      padZero2(date.getSeconds()),
    ].join(base.TIME_SEPARATOR);
  }

  /**
   * Write log
   * @param logType
   * @param msg
   */
  write_(logType, msg) {
    // Write log into Writer class
    this.writer.write(this.getTime_(), logType, msg);
  }
}

export default Logger;
