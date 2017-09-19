const { Song } = require('../models')
const helper = require('./helpers/songHelper')

module.exports = {
  // Get all songs
  index (req, res) {
    const query = { limit: 10 }
    let search = req.query.search

    if (search) {
      query.where = {
        $or: [
          'title', 'artist', 'album', 'genre'
        ].map(key => ({
          [key]: {
            $iLike: `%${search}%`
          }
        }))
      }
    }

    Song.findAll(query).then(songs => {
      res.status(200).send({ songs })
    }).catch(error => helper.handleError(res, error))
  },

  // Get a song with :id params
  show (req, res) {
    Song.findById(req.params.id).then(song => {
      if (!song) {
        return helper.handleNotFound(res, 'Song')
      }

      res.status(200).send({ song })
    }).catch(error => helper.handleError(res, error))
  },

  // Create a new song
  create (req, res) {
    Song.create(req.body).then(song => {
      res.status(200).send({ message: 'Song successfully created!', song })
    }).catch(error => helper.handleError(res, error))
  },

  // Update a song with :id params
  update (req, res) {
    Song.findById(req.params.id).then(song => {
      if (!song) {
        return helper.handleNotFound(res, 'Song')
      }

      song.update(req.body).then(updatedSong => {
        res.status(201).send({ message: 'Song successfully updated!', song: updatedSong })
      }).catch(error => helper.handleError(res, error))
    }).catch(error => helper.handleError(res, error))
  },

  // Delete a song
  delete (req, res) {
    Song.findById(req.params.id).then(song => {
      if (!song) {
        return helper.handleNotFound(res, 'Song')
      }

      song.destroy().then(() => {
        res.status(200).send({ message: 'Song succesfully deleted!' })
      }).catch(error => helper.handleError(res, error))
    }).catch(error => helper.handleError(res, error))
  }
}
