const mongoose = require('../mongodb');

const userSchema = new mongoose.Schema({
  _id: String,
  displayName: String,
  name: Object,
  email: String,
  emails: Array,
  photo: Array,
});

const User = mongoose.model('user', userSchema);

module.exports = User;
