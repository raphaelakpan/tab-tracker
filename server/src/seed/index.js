const model = require('../models')

const songs = require('./songs.json')
const users = require('./users.json')
const bookmarks = require('./bookmarks.json')

model.sequelize.sync({ force: true }).then(function () {
  model.User.bulkCreate(users).then(() => {
    model.Song.bulkCreate(songs).then(() => {
      model.Bookmark.bulkCreate(bookmarks).then(() => {
        process.exit(0)
    })
   })
  })
})


