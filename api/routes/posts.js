const postRouter = require('express').Router()
const postController = require('../controllers/postController')

postRouter.route('/')
  .get(postController.index)
  .post(postController.new)

postRouter.route('/:id')
  .get(postController.view)
  .patch(postController.update)
  .put(postController.update)
  .delete(postController.delete)

module.exports = postRouter
