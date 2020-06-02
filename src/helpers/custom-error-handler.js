const _ = require('lodash')
const status = require('http-status')

const _notIdentifiedErrorMessage = 'Ocorreu um erro sem descrição na solicitação'
const _genericErrorMessage = 'Ocorreu um erro inesperado ao tentar tratar a solicitação'

const _isJoiError = (err) => {
  return !_.isEmpty(err.error) && err.error.isJoi
}

const _isPublicError = (err) => {
  return !_.isEmpty(err) && err.isPublic
}

const _getPublicErrorStatusCode = (err) => {
  return err.statusCode || status.PRECONDITION_FAILED
}

const _getErrorMessage = (err) => {
  return err.message || _notIdentifiedErrorMessage
}

module.exports = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }

  if (_isJoiError(err)) {
    res
      .status(status.PRECONDITION_FAILED)
      .send(_getErrorMessage(err.error.details[0]))
  } else if (_isPublicError(err)) {
    if (_getErrorMessage(err) === _notIdentifiedErrorMessage) {
      console.error('error', err)
    }

    res
      .status(_getPublicErrorStatusCode(err))
      .send(_getErrorMessage(err))
  } else {
    console.error('error', err)

    res
      .status(status.INTERNAL_SERVER_ERROR)
      .send(_genericErrorMessage)
  }

  res.end()
}
