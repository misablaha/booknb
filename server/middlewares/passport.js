const passport = require('passport');
const get = require('lodash/get');
const pick = require('lodash/pick');

const { createId } = require('../lib/bookUtills');
const UserModel = require('../models/user');

/**
 * @param {Object} user
 * @return {Object}
 */
const profileToDB = user => {
  const email = get(user.emails.find(email => email.type === 'account'), 'value');
  return {
    _id: createId(email || `${user.provider}:${user.id}`),
    email,
    ...pick(user, ['displayName', 'name', 'emails', 'photos']),
  };
};

passport.serializeUser((user, done) => {
  const userDoc = profileToDB(user);
  const query = { _id: userDoc._id };
  const update = { $set: userDoc };
  const option = { upsert: true };

  UserModel
    .findOneAndUpdate(query, update, option)
    .then(() => done(null, userDoc._id))
    .catch(err => done(err));
});

passport.deserializeUser((id, done) => {
  const query = { _id: id };

  UserModel
    .findOne(query)
    .then(doc => done(null, doc))
    .catch(err => done(err));
});

exports.initialize = () => passport.initialize();
exports.session = () => passport.session();
