export const ADD_BOOK = 'ADD_BOOK';
export const OPEN_ADD = 'OPEN_ADD';
export const CLOSE_ADD = 'CLOSE_ADD';
export const OFFER = 'OFFER';
export const REQUIRE = 'REQUIRE';
export const SUGGEST = 'SUGGEST';

export const openAdd = (variant) => ({
  type: OPEN_ADD,
  variant,
})

export const closeAdd = () => ({
  type: CLOSE_ADD,
})

export const addBook = (variant, book) => ({
  type: ADD_BOOK,
  variant,
  book,
});
