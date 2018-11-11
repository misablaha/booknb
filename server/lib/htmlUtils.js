const fs = require('fs');
const path = require('path');
const parse5 = require('parse5');
const { serializeToString } = require('xmlserializer');
const { DOMParser } = require('xmldom');

exports.parseDom = html => {
  const filename = process.env.NODE_ENV !== 'development'
    // It must be out of watched folders because of babel hot reload
    ? path.resolve(__dirname, '../../searched.html')
    // Otherwise, save to the 'public' folder due to availability through the http
    : path.resolve(__dirname, '../../public/searched.html');

  fs.writeFileSync(filename, html);

  const document = parse5.parse(html);
  const xhtml = serializeToString(document);
  return new DOMParser().parseFromString(xhtml);
};
