const status = require('http-status')
const GenericError = require('../../errorhandler/errors/GenericError')

const defaultMessage = 'Uma regra de validação foi violada'

class ValidationError extends GenericError {
  constructor (message) {
    super(message)
    Error.captureStackTrace(this, ValidationError)
    this.statusCode = status.BAD_REQUEST
    this.message = message || defaultMessage
  }
}

module.exports = ValidationError
