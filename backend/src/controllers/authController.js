const authService = require('../services/authService');

exports.register = async (req, res, next) => {
  try {
    const { user, token } = await authService.registerUser(req.body);
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user,
        token
      }
    });
  } catch (error) {
    next(error); // Passes to global errorHandler
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.loginUser(email, password);
    
    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      data: {
        user,
        token
      }
    });
  } catch (error) {
    next(error);
  }
};
