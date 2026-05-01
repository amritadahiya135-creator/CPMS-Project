const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AppError = require('../utils/AppError');

// Helper to generate JWT
const signToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

exports.registerUser = async (userData) => {
  const { name, email, password, role } = userData;

  // 1. Check if email exists
  const existingUser = await User.findByEmail(email);
  if (existingUser) {
    throw new AppError('Email already in use', 400);
  }

  // 2. Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // 3. Create user document
  const newUser = {
    name,
    email,
    password: hashedPassword,
    role: role || 'professor' // Default role
  };

  const savedUser = await User.create(newUser);
  
  // 4. Generate token
  const token = signToken(savedUser._id, savedUser.role);

  // Remove password from output
  savedUser.password = undefined;

  return { user: savedUser, token };
};

exports.loginUser = async (email, password) => {
  // 1. Check if user exists
  const user = await User.findByEmail(email);
  if (!user) {
    throw new AppError('Incorrect email or password', 401);
  }

  // 2. Check if password is correct
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError('Incorrect email or password', 401);
  }

  // 3. Generate token
  const token = signToken(user._id, user.role);

  // Remove password from output
  user.password = undefined;

  return { user, token };
};
