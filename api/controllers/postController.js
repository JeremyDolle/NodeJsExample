const Post = require('./../models/postModel')

// fetch all users
exports.index = async (req, res) => {
  const { search = '', page = 1, limit = 10, ...filters } = req.query || {}

  const count = await Post.countDocuments()

  Post.get(search, limit, page, filters, (err, posts) => {
    if (err) {
      res.json({
        status: 'error',
        message: err,
      })
    } else {
      res.json({
        status: 200,
        message: 'posts retrieved successfully',
        data: posts,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      })
    }
  })
}

// create user
exports.new = (req, res) => {
  const post = new Post()
  post.title = req.body.title
  post.body = req.body.body
  post.save((err) => {
    if (err) {
      res.json(err)
    } else {
      res.json({
        status: 201,
        message: 'post created successfully',
        data: post,
      })
    }
  })
}

// get user by id
exports.view = (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) {
      res.send(err)
    } else {
      res.json({
        status: 200,
        message: 'post retrieved successfully',
        data: post,
      })
    }
  })
}

// update user
exports.update = (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) {
      res.send(err)
    } else {
      post.title = req.body.title
      post.body = req.body.body
      post.save((err) => {
        if (err) {
          res.json(err)
        } else {
          res.json({
            status: 200,
            message: 'post updated successfully',
            data: post,
          })
        }
      })
    }
  })
}

// delete user
exports.delete = (req, res) => {
  Post.remove({
    _id: req.params.id,
  }, (err, user) => {
    if (err) {
      res.send(err)
    } else {
      res.json({
        status: 204,
        message: 'post deleted successfully',
      })
    }
  })
}
