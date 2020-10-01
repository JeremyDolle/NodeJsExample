const User = require('./../models/userModel')
// const fs = require('fs')

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
  const user = new User(req.body)
  return user.save(async (err) => {
    if (err) {
      return res.status(500).send(err)
    } else {
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
  User.findById(req.params.id, (err, user) => {
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
  console.log('HERE I AM')
  User.findById(req.params.id, (err, user) => {
    if (err) {
      res.send(err)
    } else {
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
