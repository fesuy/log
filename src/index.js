import Logger from './logger.js';

// Creating new instance logger in every file make me boring
let logger = void 0;

/**
 * Create logger instance once
 * @param filepath
 */
export default function createLogger(filepath) {
  if (!logger) {
    logger = new Logger(filepath);
  }
}

/**
 * Retrieve logger instance
 * @returns Logger
 */
export default function getLogger() {
  return logger;
}
