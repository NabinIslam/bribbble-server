const express = require('express');
const {
  handleSignUp,
  handleSignIn,
  handleUser,
} = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const authRouter = express.Router();

authRouter.post('/signup', handleSignUp);
authRouter.post('/signin', handleSignIn);
authRouter.get('/user', authMiddleware, handleUser);

module.exports = authRouter;
