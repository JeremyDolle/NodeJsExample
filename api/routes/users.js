const userRouter = require('express').Router()
const userController = require('../controllers/userController')
const { authMiddleware, userValidators } = require('../middlewares')

userRouter.route('/')
  .all(authMiddleware)
  .get(userController.index)
  .post(userValidators.create, userController.new)

userRouter.route('/:id')
  .all(authMiddleware)
  .get(userController.view)
  .put(userValidators.update, userController.update)
  .delete(userController.delete)

module.exports = userRouter
