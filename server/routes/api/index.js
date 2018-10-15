const express = require('express');
const cors = require('cors');

const searchRouter = require('./search');
const meRouter = require('./me');

const router = express.Router({});

router.use(cors());
router.use('/search', searchRouter);
router.use('/me', meRouter);

module.exports = router;
