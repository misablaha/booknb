import { get } from '../api';

export const BOOK_REQUEST = 'BOOK_REQUEST';
export const BOOK_SUCCESS = 'BOOK_SUCCESS';
export const BOOK_FAILURE = 'BOOK_FAILURE';

const bookRequest = () => ({
  type: BOOK_REQUEST,
});

const bookSuccess = (result) => ({
  type: BOOK_SUCCESS,
  response: result.data,
});

const bookFailure = (error) => ({
  type: BOOK_FAILURE,
  error,
});

export const fetchBookList = () => dispatch => {
  dispatch(bookRequest());

  return get('/api/book')
    .then(result => dispatch(bookSuccess(result)))
    .catch(error => dispatch(bookFailure(error)));
};
