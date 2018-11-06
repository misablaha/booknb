const User = require('../../models/user');

const express = require('express');

const router = express.Router({});

router.get('/', (req, res, next) => {
  const projection = {
    displayName: true,
    name: true,
    photos: true,
  };
  User.find({}, projection)
    .then(data => res.json({ data }))
    .catch(next);
});

module.exports = router;
