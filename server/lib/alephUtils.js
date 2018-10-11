const toString = require('lodash/toString');

exports.href = 'https://aleph.nkp.cz/F';
exports.queryTemplate = {
  func: 'find-b',
  find_code: 'WRD',
  local_base: 'SKC',
  // request: 'dokonalý kód', // direct result
  // request: 'bible svatá', // without authors
  // request: 'dobrá znamení',

  // request_op: 'AND',
  // adjacent: 'Y',
  filter_code_1: 'WTP',
  filter_request_1: 'BK',
  filter_code_2: 'WLN',
  filter_request_2: 'cze',
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

exports.getBooks = rows => (
  rows
    .map(row => row.getElementsByTagName('td'))
    .filter(cells => cells.length === 9)
    .map(cells => {
      // for (let i = 0; i < cells.length; i++) {
      //   let cell = cells[i];
      //   console.log(i, cell.textContent.trim());
      // }

      const { title, subtitle, authors } = parseNameAndAuthors(textContent(cells[2]));

      return {
        code: textContent(cells[8]),
        title: title,
        subtitle: subtitle,
        author: textContent(cells[4]) ? authors.shift() : '',
        participants: authors,
        publisher: textContent(cells[5]),
        publishedDate: textContent(cells[6])
      };
    })
    .filter(book => book.code)
);
