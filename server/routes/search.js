const express = require('express');
const qs = require('querystring');
const axios = require('axios');
const xpath = require('xpath');
const debug = require('debug')('booknb:search');
const { parseDom } = require('../lib/htmlUtils');
const { getBooks, href, queryTemplate } = require('../lib/alephUtils');

const router = express.Router();
const select = xpath.useNamespaces({ x: 'http://www.w3.org/1999/xhtml' });

const getBook = (rows) => {
  console.log(rows.length);
};

/* GET users listing. */
router.get('/', function (req, res, next) {
  const query = {
    ...queryTemplate,
    request: req.query.q,
  };
  debug('query', `${href}?${qs.stringify(query)}`);

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

        return getBooks(rows);
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
