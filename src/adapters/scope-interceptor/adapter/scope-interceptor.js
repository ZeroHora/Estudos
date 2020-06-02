module.exports = ({ container }) => {
    return (req, res, next) => {
      req.scope = container.createScope()
      next()
    }
  }
  