import fs from 'fs';
import FileWriter from './file-writer.js';
import padZero2 from './pad-zero2.js';

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
    this.writer = !logDir ? console : new FileWriter(logDir);
    this.TIME_SEPARATOR = ':'; // Separator

    // Message
    this.INFO_MSG   = 'INFO';
    this.TRACE_MSG  = 'TRACE';
    this.DEBUG_MSG  = 'DEBUG';
    this.WARN_MSG   = 'WARN';
    this.ERROR_MSG  = 'ERROR';
  }

  /**
   * Trace log
   * @param msg
   */
  trace(msg) {
    this.write_(this.TRACE_MSG, msg);
  }

  /**
   * Warn log
   * @param msg
   */
  warn(msg) {
    this.write_(this.WARN_MSG, msg);
  }

  /**
   * Info log
   * @param msg
   */
  info(msg) {
    this.write_(this.INFO_MSG, msg);
  }

  /**
   * Debug log
   * @param msg
   */
  debug(msg) {
    this.write_(this.DEBUG_MSG, msg);
  }

  /**
   * Error log
   * @param msg
   */
  error(msg) {
    this.write_(this.DEBUG_MSG, msg);
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
    ].join(this.TIME_SEPARATOR);
  }

  /**
   * Write log
   * @param logType
   * @param msg
   */
  write_(logType, msg) {
    msg = `[${this.getTime_()}][${logType}] ${msg}\n`;

    this.writer.log(msg);
  }
}

export default Logger;
