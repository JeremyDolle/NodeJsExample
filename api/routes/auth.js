const authRouter = require('express').Router()
const authController = require('../controllers/authController')

authRouter.route('/login').post(authController.login)

module.exports = authRouter
