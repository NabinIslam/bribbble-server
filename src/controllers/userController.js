const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const { successResponse } = require('./responseController');
const createError = require('http-errors');

const handleGetAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});

    if (!users) throw createError(404, `Users not found`);

    return successResponse(res, {
      statusCode: 200,
      message: `Fetched all users successfully`,
      payload: users,
    });
  } catch (error) {
    next(error);
  }
};

const handleGetUserByEmail = async (req, res, next) => {
  try {
    const { email } = req.params;

    const user = await User.findOne({ email });

    if (!user) throw createError(404, `User not found`);

    return successResponse(res, {
      statusCode: 200,
      message: `Fetched user successfully`,
      payload: user,
    });
  } catch (error) {
    next(error);
  }
};

const handleUpdateUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const {
      name,
      username,
      email,
      profilePicture,
      location,
      share_work,
      hire_designer,
      design_inspiration,
    } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          name,
          username,
          email,
          profilePicture,
          location,
          share_work,
          hire_designer,
          design_inspiration,
        },
      },
      { new: true }
    );

    return successResponse(res, {
      statusCode: 200,
      message: `User updated successfully`,
      payload: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleGetAllUsers,
  handleGetUserByEmail,
  handleUpdateUserById,
};
