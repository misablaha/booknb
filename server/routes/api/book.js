const Book = require('../../models/book');
const Relation = require('../../models/relation');
const { createId } = require('../../lib/bookUtills');

const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router({});

router.put('/',
  bodyParser.json(),
  (req, res, next) => {
    console.log(req.body);
    const { book, userId, variant } = req.body;
    const relation = {
      _id: createId(book._id, userId, variant),
      bookId: book._id,
      userId,
      variant,
    };

    Promise
      .all([
        Book.findOneAndUpdate({ _id: book._id }, book, { upsert: true }),
        Relation.findOneAndUpdate({ _id: relation._id }, relation, { upsert: true }),
      ])
      .then(() => res.json({ data: relation }))
      .catch(next);
  }
);

router.get('/', (req, res, next) => {
  Book.find({})
    .then(data => res.json({ data }))
    .catch(next);
});

module.exports = router;
