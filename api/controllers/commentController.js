const Comment = require('../models/commentModel')

// fetch all users
exports.index = (req, res) => {
  Comment.get((err, comments) => {
    if (err) {
      res.json({
        status: 'error',
        message: err,
      })
    } else {
      res.json({
        status: 200,
        message: 'comments retrieved successfully',
        data: comments,
      })
    }
  })
}

// create user
exports.new = (req, res) => {
  const comment = new Comment()
  comment.name = req.body.name
  comment.postId = req.body.postId
  comment.body = req.body.body
  comment.save((err) => {
    if (err) {
      res.json(err)
    } else {
      res.json({
        status: 201,
        message: 'comment created successfully',
        data: comment,
      })
    }
  })
}

// get user by id
exports.view = (req, res) => {
  Comment.findById(req.params.id, (err, comment) => {
    if (err) {
      res.send(err)
    } else {
      res.json({
        status: 200,
        message: 'comment retrieved successfully',
        data: comment,
      })
    }
  })
}

// update user
exports.update = (req, res) => {
  Comment.findById(req.params.id, (err, comment) => {
    if (err) {
      res.send(err)
    } else {
      comment.name = req.body.name
      comment.postId = req.body.postId
      comment.body = req.body.body
      comment.save((err) => {
        if (err) {
          res.json(err)
        } else {
          res.json({
            status: 200,
            message: 'comment updated successfully',
            data: comment,
          })
        }
      })
    }
  })
}

// delete user
exports.delete = (req, res) => {
  Comment.remove({
    _id: req.params.id,
  }, (err, comment) => {
    if (err) {
      res.send(err)
    } else {
      res.json({
        status: 204,
        message: 'comment deleted successfully',
      })
    }
  })
}
