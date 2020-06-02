module.exports = (req, res, next) => {
    res.setHeader('cache-control', 'no-store')
    next()
  }
  