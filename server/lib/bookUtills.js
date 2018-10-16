const crypto = require('crypto');
const deburr = require('lodash/deburr');
const pick = require('lodash/pick');
const leven = require('leven');

const normalizeString = (string) => (
  deburr(string) // remove diacritical marks
    .replace(/\W+/g, ' ') // keep only alphanumeric chars
    .toLowerCase()
  // .split(' ').sort().join(' ') // sort words
);

const normalizeStrings = (...args) => (
  args
    .map(normalizeString)
    .filter(val => val !== '')
    .join(' ')
);

exports.similarityBuilder = (searchQuery) => {
  const normalizedQuery = normalizeStrings(searchQuery);

  return (...args) => {
    const found = normalizeStrings(...args);
    const difference = leven(normalizedQuery, found);
    const matched = Math.max(normalizedQuery.length, found.length) - difference;
    let similarity = matched / normalizedQuery.length;
    // cut by 1% for each character of difference
    similarity *= 0.99 ** difference;

    return similarity;
  };
};

exports.createId = (...args) => {
  const string = normalizeStrings(...args);
  return crypto.createHash('md5').update(string).digest('hex');
};

exports.mergeBooks = (books) => ({
  ...pick(books[0], ['id','title','subtitle','author','_metadata']),
  publications: books.map(book => pick(book, ['code','publisher','publishedDate'])),
});

/*
  {
    id: '8f32011fe615ba00fa28bfc6346a68fd',
    code: 'ISBN:978-80-7061-958-2',
    title: 'Pán prstenů. Návrat krále',
    subtitle: '',
    author: 'J.R.R. Tolkien',
    participants: [],
    publisher: 'Praha : KTN,',
    publishedDate: '2015',
    _metadata: {
      similarity: 0.7623427143471034
    }
  }
 */
