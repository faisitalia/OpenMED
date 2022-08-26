import { CustomError } from './custom-error'

export class NotFoundError extends CustomError {
  statusCode = 404
  errorMessage = ''

  constructor(message = 'Route not found') {
    super(message)
    this.errorMessage = message

    Object.setPrototypeOf(this, NotFoundError.prototype)
  }

  serializeErrors() {
    return [{ message: this.errorMessage }]
  }
}
