const User = require('../models/userModel')

exports.login = async (req, res) => {
  // Login a registered user
  try {
    const { email, password } = req.body
    const user = await User.findByCredentials(email, password)
    if (!user) {
      return res.status(401).send({ error: 'Login failed! Check authentication credentials' })
    }
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch (error) {
    res.status(400).send(error)
  }
}

exports.me = async (req, res) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const user = await User.findOne({ token })
    res.json({
      status: 200,
      message: 'user retrieved successfully',
      data: user,
    })
  } catch (error) {
    res.status(400).send(error)
  }
}
