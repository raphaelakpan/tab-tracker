const { User } = require('../models')

function userCredentials(user) {
  return {
    id: user.id,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  }
}
module.exports = {
  register (req, res) {
    User.create(req.body).then(user =>
      res.status(200).send({
        message: 'User successfully created!',
        user: userCredentials(user)
      })
    ).catch(error => {
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
    const query = {
      where: { email: req.body.email }
    }

    User.findOne(query).then(user => {
      if (user && user.password == req.body.password) {
        res.status(200).send({
          message: 'User logged in successfully!',
          user: userCredentials(user)
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

