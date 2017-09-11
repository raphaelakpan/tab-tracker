const { User } = require('../models')
const jwtPolicy = require('../policies/jwtPolicy')

function filterUserCredentials(user) {
  return {
    id: user.id,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  }
}
module.exports = {
  register (req, res) {
    User.create(req.body).then(user => {
      const filteredUer = filterUserCredentials(user)

      res.status(200).send({
        message: 'User successfully created!',
        user: filteredUer,
        token: jwtPolicy.generateToken(filteredUer)
      })
    }).catch(error => {
      let message = []
      if (error.errors[0].type == 'unique violation') {
        message.push('Email has already been taken')
      }
      res.status(400).send({
        errors: message
      })
    })
  },

  login (req, res) {
    const { email, password } = req.body

    const query = {
      where: { email }
    }

    User.findOne(query).then(user => {
      if (user && user.comparePassword(password)) {
        const filteredUer = filterUserCredentials(user)

        res.status(200).send({
          message: 'User logged in successfully!',
          user: filteredUer,
          token: jwtPolicy.generateToken(filteredUer)
        })
      } else {
        res.status(401).send({
          errors: ['Invalid login credentials!']
        })
      }
    }).catch(error => {
      res.status(400).send({
        errors: ['There was an error!']
      })
    })
  }
}

