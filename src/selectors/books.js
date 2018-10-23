import { createSelector } from 'reselect';
import values from 'lodash/values';

export const bookMapSelector = state => state.books.data;
export const booksAreLoading = state => state.books._metadata.fetching;

export const bookListSelector = createSelector(
  bookMapSelector,
  (data) => values(data)
);

