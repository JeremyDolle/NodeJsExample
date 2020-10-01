const express = require('express')
const app = express()
const cors = require('cors')
// const formidable = require('express-formidable')
const bodyParser = require('body-parser')
const routes = require('./routes')
require('./db')

app.use(cors())

// file uploads
// app.use(formidable())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const port = process.env.PORT || 3000

app.use('/api', routes)

app.listen(port, () => {
  console.log(`---SERVER INITIALIZED ON PORT : ${port}---`)
})
