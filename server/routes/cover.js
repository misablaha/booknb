const express = require('express');
const qs = require('querystring');
const axios = require('axios');
const debug = require('debug')('booknb:cover');
const { href: alephHref } = require('../lib/alephUtils');

const router = express.Router();

// https://cache.obalkyknih.cz/api/cover?multi={"nbn":"cnb000421310"}
// https://cache.obalkyknih.cz/api/cover?multi={"isbn":"8071970999"}&type=thumbnail&keywords=Dobrá znamení
// type=icon|thumbnail|medium

/* GET users listing. */
router.get('/:code', function (req, res, next) {
  const { code } = req.params;
  const multi = {};

  // NBN:cnb000024255
  // convert to {"nbn": "cnb000024255"}
  if (code.search(/^NBN:/i) === 0) {
    multi.nbn = code.substring(4);
  }

  // ISBN:80-7197-099-9
  // convert to {"isbn": "8071970999"}
  if (code.search(/^ISBN:/i) === 0) {
    multi.isbn = code.substring(5).replace('-', '');
  }

  const query = {
    multi: JSON.stringify(multi),
    type: 'medium',
  };
  debug('query', `https://cache.obalkyknih.cz/api/cover?${qs.stringify(query)}`);

  axios({
    method: 'get',
    url: 'https://cache.obalkyknih.cz/api/cover',
    headers: { Referer: alephHref },
    params: query,
    responseType: 'stream'
  })
    .then(response => {
      res.setHeader('Content-Type', response.headers['content-type']);
      response.data.pipe(res);
    })
    .catch(next);
});

module.exports = router;
