import kleur from 'kleur';
import base from './base.js';

/**
 * ConsoleWriter class
 * @class
 */
class ConsoleWriter {

  /**
   * Constructor
   */
  constructor() {
    this.colors = {};

    this.colors[base.DEBUG_MSG] = kleur.gray;
    this.colors[base.ERROR_MSG] = kleur.red;
    this.colors[base.TRACE_MSG] = kleur.cyan;
    this.colors[base.INFO_MSG]  = kleur.blue;
    this.colors[base.WARN_MSG]  = kleur.yellow;
  }

  /**
   * Colorize message
   *
   * @param {string} time
   * @param {string} logType
   * @param {string} msg
   *
   * @returns string
   */
  colorize_(time, logType, msg) {
    msg = `[${kleur.magenta(time)}][${this.colors[logType](logType)}] ${msg}`;
    return msg;
  }

  /**
   * Write log
   *
   * @param {string} time
   * @param {string} logType
   * @param {string} msg
   */
  write(time, logType, msg) {
    let colorizedMsg = this.colorize_(time, logType, msg);

    console.log(colorizedMsg);
  }

}

export default ConsoleWriter;
