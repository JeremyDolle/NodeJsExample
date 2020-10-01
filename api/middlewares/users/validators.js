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
    // check('password').isLength({ min: 5 }),
    check('name').optional(),
    check('username').optional(),
    check('phone').optional(),
    check('website').optional(),
    check('avatar').optional(),
    validate,
  ],
  update: [
    check('name').optional().notEmpty().isString(),
    check('username').optional().notEmpty().isString(),
    check('phone').optional().notEmpty().isString(),
    check('website').optional().notEmpty().isString(),
    check('avatar').optional().notEmpty().isString(),
    validate,
  ],
}
