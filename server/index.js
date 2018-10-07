const path = require('path');
const express = require('express');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, '..', 'build')));

app.get('/login', function (req, res) {
  res.json({ login: true });
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
