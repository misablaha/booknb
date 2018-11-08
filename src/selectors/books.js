import { createSelector } from 'reselect';
import values from 'lodash/values';
import { filterSelector } from './filter';
import { relationsByBookSelector } from './relations';

export const bookMapSelector = state => state.books.data;
export const booksAreLoading = state => state.books._metadata.fetching;

const compare = (a, b) => (a || '').localeCompare(b);

export const bookListSelector = createSelector(
  bookMapSelector,
  (data) => values(data).sort((a, b) => compare(a.title, b.title))
);

export const filteredBookListSelector = createSelector(
  bookListSelector,
  relationsByBookSelector,
  filterSelector,
  (books, relations, filter) => {
    const filtered = Object.keys(filter).filter(key => filter[key]);
    return books.filter(book => {
      const bookRelations = relations[book._id] || [];
      return bookRelations.find(relation => filtered.includes(relation.variant));
    });
  }
);

