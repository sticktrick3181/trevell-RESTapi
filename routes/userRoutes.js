const express = require('express');
const User = require('../models/userModel');
const router = express.Router();
const bcrypt = require('bcryptjs');
let userAtPresent = undefined;
const correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({
      users
    });
  } catch (err) {
    res.json({
      error: err
    });
  }
};
const checkUserStatus = function (req, res, next) {
  if (!userAtPresent) res.json('sign in to access');
  next();
};
exports.userStatus = function (req, res, next) {
  if (userAtPresent) next();
  else {
    res.json('sign on to access');
  }
};
const signUp = async (req, res) => {
  try {
    console.log(req.body);
    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      passwordConfirm: req.body.passwordConfirm,
      role: req.body.role
    });
    newUser.save();
    userAtPresent = newUser;
    console.log(newUser);
    userAtPresent = newUser;

    res.status(200).json({
      status: 'success',
      data: {
        newUser
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid User Details',
      error: err
    });
  }
};
const login = async function (req, res) {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    if (!email || !password) {
      res.json({
        message: 'Enter UserName and password'
      });
    }
    const userToCheck = await User.findOne({ email });
    const passwordToCheck = userToCheck.password;
    console.log(userToCheck);
    if (await correctPassword(password, passwordToCheck)) {
      console.log(userToCheck);
      userAtPresent = userToCheck;
      res.json('logged in..');
    } else {
      res.json({
        message: 'Username or password incorrect'
      });
    }
  } catch (e) {
    console.log(e);
  }
};
const logOut = async function (req, res) {
  userAtPresent = '';
  res.json('user logged out');
};

router.route('/').get(checkUserStatus, getAllUsers).post(signUp);
router.route('/login').post(login);
router.route('/logout').get(logOut);

module.exports = router;
