import { get } from '../api';

export const ME_REQUEST = 'ME_REQUEST';
export const ME_SUCCESS = 'ME_SUCCESS';
export const ME_FAILURE = 'ME_FAILURE';

const meRequest = () => ({
  type: ME_REQUEST,
});

const meSuccess = (result) => ({
  type: ME_SUCCESS,
  response: result.data,
});

const meFailure = (error) => ({
  type: ME_FAILURE,
  error,
});

export const fetchMe = () => dispatch => {
  dispatch(meRequest());

  return get('/api/me')
    .then(result => dispatch(meSuccess(result)))
    .catch(error => dispatch(meFailure(error)));
};
