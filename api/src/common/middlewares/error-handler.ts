import { Request, Response, NextFunction } from 'express'
import { constants } from 'http2'

import { CustomError } from '../errors/custom-error'

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() })
  }

  console.log(err.stack)
  console.log(err)

  res.status(constants.HTTP_STATUS_BAD_REQUEST).send({
    errors: [{ message: `Something went wrong: ${err.message}` }],
  })
}
