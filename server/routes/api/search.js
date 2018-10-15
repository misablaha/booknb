const express = require('express');
const cors = require('cors');
const qs = require('querystring');
const axios = require('axios');
const xpath = require('xpath');
const deburr = require('lodash/deburr');
const leven = require('leven');
const debug = require('debug')('booknb:search');
const { parseDom } = require('../../lib/htmlUtils');
const { getBooks, href, queryTemplate } = require('../../lib/alephUtils');

const router = express.Router();
const select = xpath.useNamespaces({ x: 'http://www.w3.org/1999/xhtml' });

const getBook = (rows) => {
  console.log(rows.length);
};

router.use(cors());

/* GET users listing. */
router.get('/', function (req, res, next) {
  const query = {
    ...queryTemplate,
    request: req.query.q,
  };
  debug('query', `${href}?${qs.stringify(query)}`);

  const normalizeString = (...args) => (
    // remove diacritical marks
    deburr(args.join(' '))
    // keep only alphanumeric chars
      .replace(/\W+/g, ' ')
      .toLowerCase()
      // sort words
      .split(' ').sort().join(' ')
  );

  const search = normalizeString(req.query.q);
  const fillScore = (book) => {
    const found = normalizeString(book.title, book.subtitle, book.author);
    const difference = leven(search, found);
    const matched = Math.max(search.length, found.length) - difference;
    let similarity = matched / search.length;
    // cut by 1% for each character of difference
    similarity *= 0.99 ** difference;
    return {
      ...book,
      difference,
      matched,
      similarity,
    };
  };

  axios
    .get(href, { params: query })
    .then(result => parseDom(result.data))
    .then(dom => {
      let rows;

      rows = select('//x:table[@id="short_table"]//x:tr', dom);
      if (rows.length > 0) {
        const next = select('//x:a[@title="Next"]', dom, true);
        const nextHref = next && next.getAttribute('href');
        debug('next', nextHref);

        return getBooks(rows)
          .map(fillScore)
          .sort((a, b) => b.similarity - a.similarity);
      }

      rows = select('//x:table[@id="record"]//x:tr', dom);
      if (rows.length > 0) {
        return [getBook(rows)];
      }

      return [];
    })
    .then(result => res.json({ items: result }))
    .catch(next);
});

module.exports = router;
