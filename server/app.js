const path = require('path');
const express = require('express');

const searchRouter = require('./routes/search');
const coverRouter = require('./routes/cover');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, '..', 'build')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/login', function (req, res) {
  res.json({ login: true });
});

app.use('/search', searchRouter);
app.use('/cover', coverRouter);

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
