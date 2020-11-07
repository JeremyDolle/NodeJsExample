const { validationResult, check } = require('express-validator')

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  return res.status(422).send({
    success: false,
    message: 'Unprocessable entity',
    errors: errors.array().reduce((acc, err) => ({
      ...acc,
      [err.param]: [
        ...acc[err.param] || [],
        err.msg,
      ],
    }), {}),
  })
}

module.exports = {
  create: [
    check('email').exists().notEmpty().isEmail(),
    check('name').optional().isString(),
    check('username').optional().isString(),
    check('phone').optional(),
    check('website').optional().isString(),
    check('avatar').optional(),
    validate,
  ],
  update: [
    check('name').optional().notEmpty().isString(),
    check('username').optional().notEmpty().isString(),
    check('phone').optional().notEmpty(),
    check('website').optional().isString(),
    check('avatar').optional(),
    validate,
  ],
}
