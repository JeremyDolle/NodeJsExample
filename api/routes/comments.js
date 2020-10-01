const commentRouter = require('express').Router()
const commentController = require('../controllers/commentController')

commentRouter.route('/')
  .get(commentController.index)
  .post(commentController.new)

commentRouter.route('/:id')
  .get(commentController.view)
  .patch(commentController.update)
  .put(commentController.update)
  .delete(commentController.delete)

module.exports = commentRouter
