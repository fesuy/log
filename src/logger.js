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
   * Retrieve current date string
   * @returns string
   */
  getDate_() {
    const date = new Date();

    return [
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDay(),
    ].join('-');
  }

  /**
   * Retrieve current time string
   * @returns String
   */
  getTime_() {
    const date = new Date();

    return [
      this.padZero2_(date.getHours()),
      this.padZero2_(date.getMinutes()),
      this.padZero2_(date.getSeconds()),
    ].join(':');
  }


  /**
   * Pad zero into number
   * @param  number
   * @returns
   */
  padZero2_(number) {
    let numbers = (number + '').split('')

    while (numbers.length < 2)
        numbers.unshift('0')

    return numbers.join('');
  }

  /**
   * Write log
   * @param logType
   * @param msg
   */
  write(logType, msg) {
    msg = `[${this.getTime_()}][${logType}] ${msg}\n`;

    // Write log into file if filepath specified
    if (this.filepath) {
      fs.appendFile(this.filepath, msg, err => {
        console.log(err);
      });
    } else {
      console.log(msg);
    }
  }
}

export default Logger;
