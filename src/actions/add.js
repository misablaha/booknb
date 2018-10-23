import { ADD_BOOK } from './books';
import { meSelector } from '../selectors/user';

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

export const addBook = (variant, book) => (dispatch, getState) => {
  const me = meSelector(getState());
  dispatch({
    type: ADD_BOOK,
    variant,
    userId: me._id,
    book,
  });
};
