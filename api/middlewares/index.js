const userMiddleware = require('./users')
const authMiddleware = require('./auth')

module.exports = {
  ...authMiddleware,
  ...userMiddleware,
}
