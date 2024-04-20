const bcryptjs = require('bcryptjs');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../secret');
const createError = require('http-errors');
const { successResponse } = require('./responseController');

const handleSignUp = async (req, res, next) => {
  try {
    const { name, username, email, password } = req.body;

    const alreadyExists = await User.findOne({ username });

    if (alreadyExists)
      throw createError(404, `User with this username already exists`);

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign(
      {
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
        profilePicture: newUser.profilePicture,
      },
      jwtSecret,
      { expiresIn: '1d' }
    );

    return res.status(200).json({
      success: true,
      message: `Sign up successful`,
      token,
    });
  } catch (error) {
    next(error);
  }
};

const handleSignIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const validUser = await User.findOne({ email });

    if (!validUser) throw createError(404, `User not found`);

    const validPassword = await bcryptjs.compare(password, validUser.password);

    if (!validPassword) throw createError(404, `Wrong password`);

    const expiryDate = new Date(Date.now() + 3600000); //1 hour

    const token = jwt.sign(
      {
        name: validUser.name,
        username: validUser.username,
        email: validUser.email,
        profilePicture: validUser.profilePicture,
      },
      jwtSecret,
      { expiresIn: '1d' }
    );

    // const { password: hashedPassword, ...rest } = validUser._doc;

    return res.status(200).json({
      success: true,
      message: `Login successful`,
      token,
    });
  } catch (error) {
    next(error);
  }
};

const handleUser = async (req, res, next) => {
  try {
    const user = req.user;

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = { handleSignUp, handleSignIn, handleUser };
