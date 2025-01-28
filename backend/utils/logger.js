const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');
require('dotenv').config();

// Custom log levels and colors
const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'blue',
  },
};

// Add colors to Winston
require('winston').addColors(customLevels.colors);

// Daily rotating file transport
const dailyRotateTransport = new transports.DailyRotateFile({
  filename: 'logs/application-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d',
  maxSize: '20m',
  level: process.env.NODE_ENV === 'production' ? 'warn' : 'debug', // File log level
});

// Create logger instance
const logger = createLogger({
  levels: customLevels.levels, // Use custom levels
  level: process.env.LOG_LEVEL || (process.env.NODE_ENV === 'production' ? 'warn' : 'debug'), // Default level
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(
      ({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`
    )
  ),
  transports: [
    // Console transport with colorized output
    new transports.Console({
      format: format.combine(
        format.colorize({ all: true }), // Enable colorization for all elements
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(
          ({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`
        )
      ),
    }),
    dailyRotateTransport, // File logging
  ],
  exitOnError: false, // Prevent logger from exiting on error
});

// Log an initialization message
logger.info('Logger initialized successfully');

module.exports = logger;
