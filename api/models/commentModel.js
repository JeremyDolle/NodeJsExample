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

commentSchema.index({
  name: 'text',
  body: 'text',
})

// Create model
const Comment = module.exports = mongoose.model('Comment', commentSchema)

module.exports.get = (search, limit, page, filters, callback) => {
  const sort = Object.entries(filters).map(([key, value]) => {
    return [key, value === 'asc' ? 'asc' : 'desc']
  })

  if (search !== '') {
    console.log(sort)
    if (sort.length) {
      Comment.find({ $text: { $search: search } }, callback)
        .sort(sort)
        .limit(limit)
        .skip((page - 1) * limit)
        .lean()
    } else {
      Comment.find({ $text: { $search: search } }, callback)
        .limit(limit)
        .skip((page - 1) * limit)
        .lean()
    }
  } else {
    if (sort.length) {
      Comment.find(callback)
        .sort(sort)
        .limit(limit)
        .skip((page - 1) * limit)
        .lean()
    } else {
      Comment.find(callback)
        .limit(limit)
        .skip((page - 1) * limit)
        .lean()
    }
  }
}
