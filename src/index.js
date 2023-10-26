import Logger from './logger.js';

// Creating new instance logger in every file make me boring
let logger = void 0;

/**
 * Create logger instance once
 * @param filepath
 */
export function createLogger(filepath) {
  if (!logger) {
    logger = new Logger(filepath);
  }
}

/**
 * Retrieve logger instance
 * @returns Logger
 */
export function getLogger() {
  return logger;
}
