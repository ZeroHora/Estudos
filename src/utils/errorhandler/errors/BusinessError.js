const status = require('http-status')
const GenericError = require('../../errorhandler/errors/GenericError')

const defaultMessage = 'Uma pré-condição falhou'

class BusinessError extends GenericError {
  constructor (message) {
    super(message)
    Error.captureStackTrace(this, BusinessError)
    this.statusCode = status.PRECONDITION_FAILED
    this.message = message || defaultMessage
  }
}

module.exports = BusinessError
