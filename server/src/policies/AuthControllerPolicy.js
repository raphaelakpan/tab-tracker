const Joi = require('joi')

module.exports = {
  validateCredentials(req, res, next) {
    const schema = {
      email: Joi.string().email(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}$')
      )
    }

    const { error, value } = Joi.validate(req.body, schema)
    if (error) {
      let message = []
      for (index in error.details) {
        if (error.details[index].context.key == 'email') {
          message.push('Email is invalid!')
        }
        if (error.details[index].context.key == 'password') {
          message.push('Password must contain only: character and numbers')
          message.push('Password must be at least 8 characters and at most 32 characters long')
        }
      }
      res.status(400).send({
        errors: message
      })
    } else {
      next()
    }
  }
}
