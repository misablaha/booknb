export const BOOK_FILTER = 'BOOK_FILTER';

export const bookFilter = (key, value) => ({
  type: BOOK_FILTER,
  key,
  value,
});
