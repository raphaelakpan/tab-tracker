const Authentication = require('../controllers/AuthController')
const AuthPolicy = require('../policies/AuthControllerPolicy')
const jwtPolicy = require('../policies/jwtPolicy')

module.exports = (app) => {
  app.post('/register',
    AuthPolicy.validateCredentials,
    Authentication.register)

  app.post('/login',
    AuthPolicy.validateCredentials,
    Authentication.login)
}
