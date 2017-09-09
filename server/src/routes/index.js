const Authentication = require('../controllers/AuthController')
const AuthPolicy = require('../policies/AuthControllerPolicy')

module.exports = (app) => {
  app.post('/register', AuthPolicy.validateCredentials, Authentication.register)
  app.post('/login', AuthPolicy.validateCredentials, Authentication.login)
}
