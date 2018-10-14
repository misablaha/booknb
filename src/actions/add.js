export const ADD_BOOK = 'ADD_BOOK';
export const OFFER = 'OFFER';
export const REQUIRE = 'REQUIRE';
export const SUGGEST = 'SUGGEST';

export const addBook = (variant, book) => ({
  type: ADD_BOOK,
  variant,
  book,
});
