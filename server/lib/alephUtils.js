const last = require('lodash/last');
const toString = require('lodash/toString');

exports.href = 'https://aleph.nkp.cz/F';
exports.queryTemplate = {
  func: 'find-b',
  local_base: 'SKC',
  // request: 'dokonalý kód', // direct result
  // request: 'bible svatá', // without authors
  // request: 'dobrá znamení',

  // request_op: 'AND',
  // adjacent: 'Y',
  filter_code_1: 'WTP',
  filter_request_1: 'BK', // only books
  filter_code_2: 'WLN',
  filter_request_2: 'cze', // in czech
};

exports.queryTitle = {
  find_code: 'WKW', // Search in titles
};

exports.queryAll = {
  find_code: 'WRD', // Search in all fields
};

exports.queryAuthor = {
  find_code: 'WAU', // Search in authors
};

const trim = value => toString(value).replace(/[[\]]/g, '').trim();

const textContent = element => trim(element.textContent);

/**
 * clean first part of 'z amerického originálu ... přeložil Jan Kantůrek'
 *
 * @param {String} value
 * @return {String}
 */
const stripParticipantPreface = value => value.replace(/^.* \.{3} /, '');

const parseNameAndAuthors = value => {
  const [name, authors = ''] = value.split('/');
  const [title, subtitle] = name.split(/[:;]/);

  return {
    title: trim(title),
    subtitle: trim(subtitle),
    authors: authors
      .split(/[;,]/)
      .map(stripParticipantPreface)
      .map(trim)
      .filter(author => author !== '')
  };
};

const isDate = (value) => /^\d{4}/.test(value);

const parseAuthor = value => {
  const authorParts = value.split(/[,;]\s*/);
  if (isDate(last(authorParts))) {
    authorParts.pop();
  }
  const [familyName, ...otherNames] = authorParts;
  return [...otherNames, familyName].join(' ');
}

exports.getBooks = rows => (
  rows
    .map(row => row.getElementsByTagName('td'))
    .filter(cells => cells.length === 9)
    .map(cells => {
      // for (let i = 0; i < cells.length; i++) {
      //   let cell = cells[i];
      //   console.log(i, cell.textContent.trim());
      // }

      const author = parseAuthor(textContent(cells[4]));
      const { title, subtitle, authors } = parseNameAndAuthors(textContent(cells[2]));
      if (author) {
        authors.shift();
      }

      return {
        code: textContent(cells[8]),
        title: title,
        subtitle: subtitle,
        author,
        participants: authors,
        publisher: textContent(cells[5]),
        publishedDate: textContent(cells[6])
      };
    })
    .filter(book => book.code)
);
