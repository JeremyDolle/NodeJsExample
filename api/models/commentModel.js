const mongoose = require('mongoose')

// setup schema
const commentSchema = mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  postId: {
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
const Comment = module.exports = mongoose.model('comment', commentSchema)

module.exports.get = (callback, limit) => {
  Comment.find(callback).limit(limit)
}
