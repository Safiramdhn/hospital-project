const {createLogger, format, transports} = require('winston');
require('winston-daily-rotate-file');
require('dotenv').config()

// Define a transport for rotating log files
const dailyRotateTransport = new transports.DailyRotateFile({
    filename: 'logs/application-%DATE%.log',
    datePattern: ' YYYY-MM-DD',
    maxFiles: '14d',
    maxSize: '20m',
});

// Create the logger instance
const logger = createLogger({
    level: process.env.NODE_ENV === 'production' ? 'warn' : 'info', // default level
    format: format.combine(
        format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        format.printf(({timestamp, level, message}) => `${timestamp} [${level.toUpperCase()}]: ${message}`)
    ),
    transports: [
        new transports.Console(), // logs to console
        dailyRotateTransport, // logs to rotating files
    ],
});

module.exports = logger;