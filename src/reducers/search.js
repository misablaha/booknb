import { combineReducers } from 'redux';
import get from 'lodash/get';
import { SEARCH_FAILURE, SEARCH_REQUEST, SEARCH_SUCCESS } from '../actions/search';
import createMetadataReducer from './metadata';

const initialState = [];

const userReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SEARCH_SUCCESS:
      return get(action, 'response.items', []);
    default:
      return state;
  }
};

export default combineReducers({
  data: userReducer,
  _metadata: createMetadataReducer(SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE),
});
