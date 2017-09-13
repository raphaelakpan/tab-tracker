const Authentication = require('../controllers/AuthController')
const Songs = require('../controllers/SongsController')

const AuthPolicy = require('../policies/AuthControllerPolicy')
const jwtPolicy = require('../policies/jwtPolicy')
const songPolicy = require('../policies/songPolicy')

module.exports = (app) => {
  app.post('/register',
    AuthPolicy.validateCredentials,
    Authentication.register)

  app.post('/login',
    AuthPolicy.validateCredentials,
    Authentication.login)

  app.get('/songs', Songs.index)
  app.post('/songs', songPolicy.validateSongFields, Songs.create)
  app.get('/songs/:id', songPolicy.validateIdParams, Songs.show)
  app.put('/songs/:id', songPolicy.validateIdParams, Songs.update)
  app.delete('/songs/:id', songPolicy.validateIdParams, Songs.delete)
}
