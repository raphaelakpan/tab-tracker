const { Bookmark } = require('../models')

module.exports = {
  index(req, res) {
    const query = {
      where: {
        UserId: 1,
        SongId: req.query.songId
      }
    }
    Bookmark.findOne(query).then((bookmark) => {
      res.send(bookmark)
    })
  }
}
