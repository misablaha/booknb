const express = require('express');
const cors = require('cors');

const book = require('./book');
const meRouter = require('./me');
const relation = require('./relation');
const searchRouter = require('./search');

const router = express.Router({});

router.use(cors());
router.use('/book', book);
router.use('/me', meRouter);
router.use('/relation', relation);
router.use('/search', searchRouter);

module.exports = router;
