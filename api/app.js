const express = require('express')
const app = express()
const cors = require('cors')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const routes = require('./routes')
require('./db')

app.use(cors())

app.use('/uploads', express.static('uploads'))

// file uploads
app.use(fileUpload({
  createParentPath: true,
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const port = process.env.PORT || 3000

app.use('/api', routes)

app.listen(port, () => {
  console.log(`---SERVER INITIALIZED ON PORT : ${port}---`)
})
