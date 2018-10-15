const fs = require('fs');
const parse5 = require('parse5');
const { serializeToString } = require('xmlserializer');
const { DOMParser } = require('xmldom');

exports.parseDom = html => {
  fs.writeFileSync('searched.html', html);
  const document = parse5.parse(html);
  const xhtml = serializeToString(document);
  return new DOMParser().parseFromString(xhtml);
};
