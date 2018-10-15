import { combineReducers } from 'redux';
import get from 'lodash/get';
import { ME_FAILURE, ME_REQUEST, ME_SUCCESS } from '../actions/user';
import createMetadataReducer from './metadata';

const initialState = null;

const meReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ME_SUCCESS:
      return get(action, 'response', null);
    default:
      return state;
  }
};

export default combineReducers({
  data: meReducer,
  _metadata: createMetadataReducer(ME_REQUEST, ME_SUCCESS, ME_FAILURE),
});
