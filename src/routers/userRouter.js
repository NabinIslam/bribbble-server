const express = require('express');
const {
  handleGetAllUsers,
  handleGetUserByEmail,
  handleUpdateUserById,
} = require('../controllers/userController');

const userRouter = express.Router();

userRouter.get('/', handleGetAllUsers);
userRouter.get('/email/:email', handleGetUserByEmail);
userRouter.put('/:id', handleUpdateUserById);

module.exports = userRouter;
