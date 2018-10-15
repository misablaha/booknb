require('dotenv').config();

const express = require('express');
const session = require('cookie-session');
const path = require('path');

const passport = require('./middlewares/passport');

const apiRouter = require('./routes/api');
const authRouter = require('./routes/auth');
const coverRouter = require('./routes/cover');

const app = express();

app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(session({ secret: 'cats' }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', apiRouter);
app.use('/auth', authRouter);
app.use('/cover', coverRouter);
app.use('/test', (req, res) => {
  res.json({ user: req.user });
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;
