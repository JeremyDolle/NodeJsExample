const isAdminMiddleware = require('./isAdminMiddleware')
const userValidators = require('./validators')

module.exports = {
  ...isAdminMiddleware,
  userValidators,
}
