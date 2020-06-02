const status = require('http-status')
const defaultMessage = 'Ocorreu um erro inesperado'

class GenericError extends Error {
  constructor (message) {
    super(message)
    Error.captureStackTrace(this, GenericError)
    this.statusCode = status.INTERNAL_SERVER_ERROR
    this.message = message || defaultMessage
    this.isPublic = true
  }
}

module.exports = GenericError
