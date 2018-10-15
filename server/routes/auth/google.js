const express = require('express');
const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');
const googleConfig = require('../../../config/google');

passport.use(new Strategy(
  googleConfig,
  (accessToken, refreshToken, profile, cb) => {
    return cb(null, profile);
  }
));

const router = express.Router({});

router.get('/',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

router.get('/callback',
  passport.authenticate('google', {
    failureRedirect: '/login'
  }),
  function (req, res) {
    req.logIn(req.user, () => {
      res.redirect('/');
    });
    // Successful authentication, redirect home.
  }
);

module.exports = router;
