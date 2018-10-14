import { get } from '../api';

export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_FAILURE = 'SEARCH_FAILURE';

const searchRequest = (config) => ({
  type: SEARCH_REQUEST,
  config,
});

const searchSuccess = (config, result) => ({
  type: SEARCH_SUCCESS,
  config,
  response: result.data,
});

const searchFailure = (config, error) => ({
  type: SEARCH_FAILURE,
  config,
  error,
});

export const searchBook = query => dispatch => {
  const config = { params: { q: query } };
  dispatch(searchRequest(config));

  return get('/search', config)
    .then(result => dispatch(searchSuccess(config, result)))
    .catch(error => dispatch(searchFailure(config, error)));
};
