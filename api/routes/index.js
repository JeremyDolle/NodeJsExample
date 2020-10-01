const router = require('express').Router()
const authRouter = require('./auth')
const userRouter = require('./users')
const postRouter = require('./posts')
const commentRouter = require('./comments')

// Set default API response
router.get('/', (req, res) => { res.json({ status: 200, message: 'Hi' }) })

// USERS
router.use('/auth', authRouter)
router.use('/users', userRouter)
router.use('/posts', postRouter)
router.use('/comments', commentRouter)

module.exports = router
