import winston from 'winston'
import path from 'path'

const logdir = '../../../logs'

const errorFilename = process.env.NODE_ENV !== 'test' ? 'error.log' : 'error-test.log'
const combinedFilename = process.env.NODE_ENV !== 'test' ? 'combined.log' : 'combined-test.log'

const errorFile = path.join(__dirname, logdir, errorFilename)
const combinedFile = path.join(__dirname, logdir, combinedFilename)

const logger = winston.createLogger({
  // level: 'info',
  // format: winston.format.json(),
  // defaultMeta: { service: 'user-service' },
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.printf((info) =>
      JSON.stringify({
        timestamp: info.timestamp,
        level: info.level,
        message: info.message,
      })
    )
  ),
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: errorFile, level: 'error' }),
    new winston.transports.File({ filename: combinedFile }),
  ],
})

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
        winston.format.cli()
      ),
      level: 'info',
    })
  )
}

export { logger }
