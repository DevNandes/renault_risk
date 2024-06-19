/**
 * @file 
 * Log
 *
 */

"use strict";

const winston = require('winston');

const logFileName = `${process.env.renault_risk_LOG_FILE}`;


// define the custom settings for each transport (file, console)
const options = {
  file: {
    level: 'info',
    filename: logFileName,
    handleExceptions: true,
    json: false,
    colorize: true,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

// instantiate a new Winston Logger with the settings defined above
const logger = new winston.Logger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false, // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function (message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  },
};

module.exports = logger;