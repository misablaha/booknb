import { createSelector } from 'reselect';
import values from 'lodash/values';

export const bookMapSelector = state => state.books.data;
export const booksAreLoading = state => state.books._metadata.fetching;

const compare = (a, b) => (a || '').localeCompare(b);

export const bookListSelector = createSelector(
  bookMapSelector,
  (data) => values(data).sort((a, b) => compare(a.title, b.title))
);

