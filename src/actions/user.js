import { get } from '../api';

export const ME_REQUEST = 'ME_REQUEST';
export const ME_SUCCESS = 'ME_SUCCESS';
export const ME_FAILURE = 'ME_FAILURE';
export const USER_REQUEST = 'USER_REQUEST';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAILURE = 'USER_FAILURE';

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

const userRequest = () => ({
  type: USER_REQUEST,
});

const userSuccess = (result) => ({
  type: USER_SUCCESS,
  response: result.data,
});

const userFailure = (error) => ({
  type: USER_FAILURE,
  error,
});

export const fetchUserList = () => dispatch => {
  dispatch(userRequest());

  return get('/api/user')
    .then(result => dispatch(userSuccess(result)))
    .catch(error => dispatch(userFailure(error)));
};
