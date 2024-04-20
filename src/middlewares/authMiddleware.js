const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../secret');
const User = require('../models/userModel');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) throw createError(401, `Unauthorized HTTP, Token not provided`);

  const jwtToken = token.replace('Bearer ', '');

  try {
    const isVerified = jwt.verify(jwtToken, jwtSecret);

    const user = await User.findOne({ email: isVerified.email }).select({
      password: 0,
    });

    req.user = user;
    req.token = token;
    req.userId = user._id;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddleware;
