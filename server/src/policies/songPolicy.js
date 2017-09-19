const Joi = require('joi')

module.exports = {
  validateSongFields(req, res, next) {
    const schema = {
      title: Joi.string().required(),
      artist: Joi.string().required(),
      album: Joi.string().required(),
      genre: Joi.string().required(),
      albumImageUrl: Joi.string(),
      youtubeId: Joi.string().required(),
      lyrics: Joi.string(),
      tab: Joi.string(),
    }

    const { error, value } = Joi.validate(req.body, schema)
    if (error) {
      res.status(400).send({
        errors: [error.details[0].message]
      })
    } else {
      next()
    }
  },

  validateIdParams(req, res, next) {
    const schema = {
      id: Joi.number().required()
    }

    const { error, value } = Joi.validate(req.params, schema)
    if (error) {

      res.status(400).send({
        errors: [error.details[0].message]
      })
    } else {
      next()
    }
  }
}
