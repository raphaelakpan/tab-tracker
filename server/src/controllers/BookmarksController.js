const { Bookmark, User, Song } = require('../models')
const helper = require('./helpers/songHelper')
const _ = require('lodash')

module.exports = {
  index(req, res) {
    const query = {
      where: {
        UserId: req.query.UserId,
        SongId: req.query.SongId
      }
    }
    Bookmark.findOne(query).then((bookmark) => {
      res.status(200).send({ bookmark })
    })
  },

  create(req, res) {
    if (!(req.body.UserId && req.body.SongId)) {
      return res.status(400).send({ message: 'Invalid parameters' })
    }

    const { SongId, UserId } = req.body
    Bookmark.findOne({
        where: { SongId, UserId }
      }).then((bookmark) => {
      if (bookmark) {
        return res.status(400).send({ message: 'Already bookmarked!' })
      }

      Bookmark.create(req.body).then(bookmark => {
        const query = {
          where: { UserId },
          include: [{ model: Song }]
        }

        // Bookmark.findAll(query).then(bookmarks => {
        //   res.status(200).send({ bookmarks })
        // }).catch(error => helper.handleError(res, error))
        res.status(201).send({
          message: 'Bookmarked successfully!',
          bookmark
        })
      }).catch(error => helper.handleError(res, error))
    })
  },

  delete(req, res) {
    Bookmark.findById(req.params.id)
    .then(bookmark => {
      if (!bookmark) {
        return res.status(404).send({ message: 'Bookmark not found!' })
      }

      bookmark.destroy().then(() => {
        res.status(200).send({ message: 'Bookmark succesfully deleted!' })
      }).catch(error => helper.handleError(res, error))
    }).catch(error => helper.handleError(res, error))
  },

  getBookmarksByUser(req, res) {
    const { id } = req.params

    User.findById(id).then(user => {
      if (!user) {
        return res.status(404).send({ message: 'User not found!' })
      }

      const query = {
        where: { UserId: id },
        include: [{ model: Song }]
      }

      Bookmark.findAll(query).then(bookmarks => {
        res.status(200).send({
          bookmarks: bookmarks.map(bookmark => _.extend({
            id: bookmark.id,
            SongId: bookmark.SongId,
            SongTitle: bookmark.Song.title,
            SongArtist: bookmark.Song.artist
          }))
        })
      }).catch(error => helper.handleError(res, error))
    })
  },
}
