// import dependencies
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const { sequelize } = require('./models')
const config = require('./config/config')

// Create express app instance
const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

// Use the routes defined
require('./routes')(app)

// Sync up sequelize with our database, run the server afterwards
sequelize.sync().then(() => {
  app.listen(config.port, function () {
    console.log('Listening at port ' + config.port)
  })
})
