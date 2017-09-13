module.exports = {
  handleError(res, error) {
    res.status(400).send({
      errors: "Sorry, an error occured!"
    })
  },

  handleNotFound(res, resource) {
    res.status(404).send({
      message: resource + ' not found!'
    })
  }
}
