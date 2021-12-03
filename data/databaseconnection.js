const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({
  path: './config.env'
});

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD);

exports.connectToDB = function () {
  mongoose
    .connect(DB)
    .then(() => console.log('DB connection successfully created'));
};

//mongodb+srv://ishaan:fB6kI9IPCw9CVebl@cluster0.whkb9.mongodb.net/test-1?retryWrites=true&w=majority
