const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// setup schema
const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    minLength: 7,
  },
  name: {
    type: String,
    trim: true,
  },
  username: {
    type: String,
  },
  phone: {
    type: String,
  },
  website: {
    type: String,
  },
  avatar: {
    type: String,
  },
  token: {
    type: String,
  },
  create_date: {
    type: Date,
    default: Date.now(),
  },
})

userSchema.index({
  email: 'text',
  username: 'text',
  name: 'text',
})

userSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

userSchema.methods.generateAuthToken = async function () {
  // Generate an auth token for the user
  const user = this
  const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY)
  user.token = token
  await user.save()
  return token
}

userSchema.statics.findByCredentials = async (email, password) => {
  // Search for a user by email and password.
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error({ error: 'Invalid login credentials' })
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password)

  if (!isPasswordMatch) {
    throw new Error({ error: 'Invalid login credentials' })
  }
  return user
}

const User = module.exports = mongoose.model('User', userSchema)

module.exports.get = (search, filters, callback, limit) => {
  const sort = Object.entries(filters).map(([key, value]) => {
    return [key, value === 'asc' ? 'asc' : 'desc']
  })

  if (search !== '') {
    if (sort.length) {
      User.find({ $text: { $search: search } }, callback).sort(sort).limit(limit).lean()
    } else {
      User.find({ $text: { $search: search } }, callback).limit(limit).lean()
    }
  } else {
    if (sort.length) {
      User.find(callback).sort(sort).limit(limit).lean()
    } else {
      User.find(callback).limit(limit).lean()
    }
  }
}

module.exports.getById = (id, callback) => {
  User.findById(id, callback).lean()
}
