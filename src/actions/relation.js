import { get } from '../api';

export const RELATION_REQUEST = 'RELATION_REQUEST';
export const RELATION_SUCCESS = 'RELATION_SUCCESS';
export const RELATION_FAILURE = 'RELATION_FAILURE';

const relationRequest = () => ({
  type: RELATION_REQUEST,
});

const relationSuccess = (result) => ({
  type: RELATION_SUCCESS,
  response: result.data,
});

const relationFailure = (error) => ({
  type: RELATION_FAILURE,
  error,
});

export const fetchRelationList = () => dispatch => {
  dispatch(relationRequest());

  return get('/api/relation')
    .then(result => dispatch(relationSuccess(result)))
    .catch(error => dispatch(relationFailure(error)));
};
