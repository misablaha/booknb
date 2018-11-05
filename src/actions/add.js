import omit from 'lodash/omit';
import { put } from '../api';
import { meSelector } from '../selectors/user';

export const OPEN_ADD = 'OPEN_ADD';
export const CLOSE_ADD = 'CLOSE_ADD';
export const OFFER = 'OFFER';
export const REQUIRE = 'REQUIRE';
export const SUGGEST = 'SUGGEST';
export const ADD_REQUEST = 'ADD_REQUEST';
export const ADD_SUCCESS = 'ADD_SUCCESS';
export const ADD_FAILURE = 'ADD_FAILURE';

export const openAdd = (variant) => ({
  type: OPEN_ADD,
  variant,
})

export const closeAdd = () => ({
  type: CLOSE_ADD,
})

const addRequest = (payload) => ({
  type: ADD_REQUEST,
  payload,
});

const addSuccess = (payload, result) => ({
  type: ADD_SUCCESS,
  payload,
  response: result.data,
});

const addFailure = (payload, error) => ({
  type: ADD_FAILURE,
  payload,
  error,
});


export const addBook = (variant, book) => (dispatch, getState) => {
  const me = meSelector(getState());
  const data = {
    book: omit(book, ['_metadata']),
    userId: me._id,
    variant,
  };
  dispatch(addRequest(data));

  return put('/api/book', data)
    .then(result => dispatch(addSuccess(data, result)))
    .catch(error => dispatch(addFailure(data, error)));
};
