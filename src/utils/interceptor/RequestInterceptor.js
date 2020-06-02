const extractUserFromToken = (jwt, req) => {
    try {
      return jwt
        .decode(req.headers.authorization)
        .username.replace('AzureAD_', '')
    } catch (error) {}
  }
  
  module.exports = (container, awilix) => {
    return (req, res, next) => {
      const jwt = container.resolve('jwt')
      req.scope = container.createScope()
      req.scope.register({
        currentUser: awilix.asValue({ 
                       userToken: extractUserFromToken(jwt, req),
                              ip: req.clientIp 
                      })
      })
      next()
    }
  }
  