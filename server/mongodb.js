const mongoose = require('mongoose');
const mongoConfig = require('../config/mongodb');

mongoose.connect(mongoConfig.uri, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
});

module.exports = mongoose;
