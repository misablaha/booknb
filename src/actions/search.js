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

export const fetchSearch = search => dispatch => {
  const config = { params: { q: search } };
  dispatch(searchRequest(config));

  return get('/api/search', config)
    .then(result => dispatch(searchSuccess(config, result)))
    .catch(error => dispatch(searchFailure(config, error)));
};
