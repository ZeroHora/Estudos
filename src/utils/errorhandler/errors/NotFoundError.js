const status = require('http-status')
const GenericError = require('../../errorhandler/errors/GenericError')

const defaultMessage = 'Recurso não encontrado'
class NotFoundError extends GenericError {
  constructor (message) {
    super(message)
    Error.captureStackTrace(this, NotFoundError)
    this.statusCode = status.NOT_FOUND
    this.message = message || defaultMessage
  }
}

module.exports = NotFoundError
