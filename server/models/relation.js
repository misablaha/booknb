const mongoose = require('../mongodb');

const relationSchema = new mongoose.Schema({
  _id: String,
  bookId: String,
  userId: String,
  variant: String,
});

const Relation = mongoose.model('relation', relationSchema);

module.exports = Relation;
