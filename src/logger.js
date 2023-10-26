import fs from 'fs';

/**
 * Logger class
 * @class
 */
class Logger {

  /**
   * Constructor
   * @param filepath    if filepath not specified log will write in console
   */
  constructor(filepath) {
    this.filepath = filepath;
  }

  /**
   * Trace log
   * @param msg
   */
  trace(msg) {
    this.write('TRACE', msg);
  }

  /**
   * Warn log
   * @param msg
   */
  warn(msg) {
    this.write('WARN', msg);
  }

  /**
   * Info log
   * @param msg
   */
  info(msg) {
    this.write('INFO', msg);
  }

  /**
   * Debug log
   * @param msg
   */
  debug(msg) {
    this.write('DEBUG', msg);
  }

  /**
   * Error log
   * @param msg
   */
  error(msg) {
    this.write('ERROR', msg);
  }

  /**
   * Retrieve current datetime
   * @returns String
   */
  getTime_() {
    const date = new Date();

    return [
      date.getFullYear(),
      '-',
      date.getMonth() + 1,
      '-',
      date.getDay(),
      ' ',
      date.getHours(),
      ':',
      date.getMinutes(),
      ':',
      date.getSeconds(),
    ].join('');
  }

  /**
   * Write log
   * @param logType
   * @param msg
   */
  write(logType, msg) {
    msg = `[${this.getTime_()} ${logType}] ${msg}`;
  }
}
