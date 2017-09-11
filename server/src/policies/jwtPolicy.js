const jwt = require('jsonwebtoken')
const config = require('../config/config')

module.exports = {
  generateToken (user) {
    const ONE_DAY = 60 * 60 * 24
    return jwt.sign(
      user,
      config.authentication.jwtSecret,
      { expiresIn: ONE_DAY }
    )
  },
  verifyToken (req, res, next) {
    const token = req.headers.authorization
    if (!token) {
      res.status(401).send({
        errors: ['No token provided!'],
      })
    }
    jwt.verify(token, config.authentication.jwtSecret, (error, decoded) => {
      if (error) {
        return res.status(401).send({
          errors: ['Invalid token!']
        })
      }

      req.decoded = decoded
      next()
    })
  }
}
