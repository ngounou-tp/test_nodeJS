const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  age: Number,
},{
  collection: 'userInfo'
});

const User = mongoose.model('User', userSchema);

module.exports.User = User;
