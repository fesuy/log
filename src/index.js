import Logger from './logger.js';

// Creating new instance logger in every file make me boring
let logger = void 0;

export default {
  /**
   * Create logger instance once
   * @param filepath
   */
  createLogger: filepath => {
    if (!logger) {
      logger = new Logger(filepath);
    }
  },
  /**
   * Retrieve logger instance
   * @returns Logger
   */
  getLogger: () => {
    return logger;
  }
}
