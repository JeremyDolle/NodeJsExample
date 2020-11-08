const authRouter = require('express').Router()
const authController = require('../controllers/authController')
const { authMiddleware } = require('../middlewares')

authRouter.route('/login').post(authController.login)
authRouter.route('/me').all(authMiddleware).get(authController.me)

module.exports = authRouter
