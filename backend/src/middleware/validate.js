const { validationResult, check } = require('express-validator');
const AppError = require('../utils/AppError');

// Middleware to format and throw validation errors
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Extract first error message for simplicity
    const message = errors.array().map(err => err.msg).join(', ');
    return next(new AppError(message, 400));
  }
  next();
};

// Rules for registration
const validateRegister = [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  validateRequest
];

// Rules for login
const validateLogin = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
  validateRequest
];

module.exports = {
  validateRegister,
  validateLogin
};
