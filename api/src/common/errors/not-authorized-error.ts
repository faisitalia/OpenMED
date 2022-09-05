import { CustomError } from './custom-error'

export class NotAuthorizedError extends CustomError {
  statusCode = 401
  errorMessage = ''

  constructor(message = 'Not Authorized') {
    super(message)
    this.errorMessage = message

    Object.setPrototypeOf(this, NotAuthorizedError.prototype)
  }

  serializeErrors() {
    return [{ message: this.errorMessage }]
  }
}
