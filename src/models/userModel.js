const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    username: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
    },
    location: {
      type: String,
    },
    share_work: {
      type: Boolean,
      default: false,
    },
    hire_designer: {
      type: Boolean,
      default: false,
    },
    design_inspiration: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = model('User', userSchema);

module.exports = User;
