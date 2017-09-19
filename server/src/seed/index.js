const { sequelize, User, Song } = require('../models')

const songs = require('./songs.json')
const users = require('./users.json')

sequelize.sync({ force: true }).then(function () {
  User.bulkCreate(users).then(() => {
   Song.bulkCreate(songs).then(() => {
     process.exit(0)
   })
  })
})


