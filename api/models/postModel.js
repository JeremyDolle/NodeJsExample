const mongoose = require('mongoose')

// setup schema
const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
  body: {
    type: String,
    required: false,
  },
  create_date: {
    type: Date,
    default: Date.now(),
  },
})

// Create model
const Post = module.exports = mongoose.model('post', postSchema)

module.exports.get = (callback, limit = 1) => {
  return Post.find(callback).limit(limit)
}
