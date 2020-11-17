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

postSchema.index({
  title: 'text',
  body: 'text',
})

// Create model
const Post = module.exports = mongoose.model('Post', postSchema)

module.exports.get = (search, limit, page, filters, callback = 10) => {
  const sort = Object.entries(filters).map(([key, value]) => {
    return [key, value === 'asc' ? 'asc' : 'desc']
  })

  if (search !== '') {
    if (sort.length) {
      Post.find({ $text: { $search: search } }, callback)
        .sort(sort)
        .limit(limit)
        .skip((page - 1) * limit)
        .lean()
    } else {
      Post.find({ $text: { $search: search } }, callback)
        .limit(limit)
        .skip((page - 1) * limit)
        .lean()
    }
  } else {
    if (sort.length) {
      Post.find(callback)
        .sort(sort)
        .limit(limit)
        .skip((page - 1) * limit)
        .lean()
    } else {
      Post.find(callback)
        .limit(limit)
        .skip((page - 1) * limit)
        .lean()
    }
  }
}
