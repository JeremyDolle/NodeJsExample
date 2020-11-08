const jwt = require('jsonwebtoken')
const User = require('../../models/userModel')

module.exports.authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const data = jwt.verify(token, process.env.JWT_KEY)
    const user = await User.findOne({ _id: data._id, token: token })
    if (!user) {
      throw new Error()
    }
    req.user = user
    req.token = token
    return next()
  } catch (error) {
    return res.status(401).send({ error: 'Not authorized to access this resource' })
  }
}
