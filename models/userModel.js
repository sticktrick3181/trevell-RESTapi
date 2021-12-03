const mongoose = require('mongoose');

const { isAlpha, isEmail } = require('validator');

const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    validate: [isAlpha, 'Only alphabets'],
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'guide', 'lead-guide'],
    default: 'user'
  },
  lastName: {
    type: String,
    validate: [isAlpha, 'Only aphabets']
  },
  middleName: {
    type: String,
    validate: [isAlpha, 'Only aphabets']
  },
  phoneNumber: String,
  email: {
    type: String,
    unique: [true, 'Already exists'],
    validate: [isEmail, 'Not a valid email']
  },
  password: {
    type: String,
    required: true
  },
  passwordConfirm: {
    type: String,
    required: true,
    validate: {
      validator: function (pass) {
        return pass === this.password;
      },
      message: 'Not matching'
    }
  },
  address: String,
  accountCreated: {
    type: Date,
    default: Date.now()
  }
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  ///delete password confirm field
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
