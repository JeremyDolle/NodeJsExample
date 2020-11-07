const User = require('./../models/userModel')
const { v4: uuidv4 } = require('uuid')

// fetch all users
exports.index = (req, res) => {
  User.get((err, users) => {
    if (err) {
      res.json({
        status: 'error',
        message: err,
      })
    } else {
      res.json({
        status: 200,
        message: 'users retrieved successfully',
        data: users,
      })
    }
  })
}

// create user
exports.new = (req, res) => {
  const { avatar = '' } = req.files || {}
  const name = avatar !== '' ? `${uuidv4()}.${avatar.name.split('.').pop()}` : ''
  const avatarName = avatar !== '' ? `${process.env.DOMAIN}/${name}` : ''
  const user = new User({ ...req.body, avatar: avatarName })
  return user.save(async (err) => {
    if (err) {
      return res.status(500).send(err)
    } else {
      if (avatar !== '') {
        avatar.mv(`./uploads/${name}`)
      }
      return res.json({
        status: 201,
        message: 'user created successfully',
        data: user,
      })
    }
  })
}

// get user by id
exports.view = (req, res) => {
  User.getById(req.params.id, (err, user) => {
    if (err) {
      res.send(err)
    } else {
      res.json({
        status: 200,
        message: 'user retrieved successfully',
        data: user,
      })
    }
  })
}

// update user
exports.update = (req, res) => {
  const { avatar = '' } = req.files || {}
  User.findById(req.params.id, (err, user) => {
    if (err) {
      res.send(err)
    } else {
      if (typeof avatar !== 'string' && avatar !== '') {
        const name = avatar !== '' ? `${uuidv4()}.${avatar.name.split('.').pop()}` : ''
        const avatarName = avatar !== '' ? `${process.env.DOMAIN}/${name}` : ''
        avatar.mv(`./uploads/${name}`)
        user.avatar = avatarName
      }
      Object.entries(req.body).forEach(([key, value]) => user[key] = value)

      user.save((err) => {
        if (err) {
          res.json(err)
        } else {
          res.json({
            status: 200,
            message: 'user updated successfully',
            data: user,
          })
        }
      })
    }
  })
}

// delete user
exports.delete = (req, res) => {
  User.remove({
    _id: req.params.id,
  }, (err, user) => {
    if (err) {
      res.send(err)
    } else {
      res.json({
        status: 204,
        message: 'user deleted successfully',
      })
    }
  })
}
