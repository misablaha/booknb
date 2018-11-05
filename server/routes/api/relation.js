const Relation = require('../../models/relation');

const express = require('express');

const router = express.Router({});

router.get('/', (req, res, next) => {
  Relation.find({})
    .then(data => res.json({ data }))
    .catch(next);
});

module.exports = router;
