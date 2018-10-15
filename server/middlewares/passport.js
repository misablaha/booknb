const passport = require('passport');

passport.serializeUser(function (user, done) {
  done(null, JSON.stringify(user));
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log(id);
  done(null, JSON.parse(id));
  // User.findById(id, function(err, user) {
  //   done(err, user);
  // });
});

exports.initialize = () => passport.initialize();
exports.session = () => passport.session();
