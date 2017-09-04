// import dependencies
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

// Create express app instance
const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.post('/register', (req, res) => {
  res.send({
    message: 'User registered successfully!'
  })
})

const port = process.env.PORT || 8000
app.listen(port, function () {
  console.log('Listening at port ' + port)
})
