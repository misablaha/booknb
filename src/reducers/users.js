import { combineReducers } from 'redux';
import get from 'lodash/get';
import keyBy from 'lodash/keyBy';
import { USER_FAILURE, USER_REQUEST, USER_SUCCESS } from '../actions/user';
import createMetadataReducer from './metadata';

const initialState = {};

const userReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case USER_SUCCESS:
      const userList = get(action, 'response.data', []);
      return keyBy(userList, '_id');
    default:
      return state;
  }
};

export default combineReducers({
  data: userReducer,
  _metadata: createMetadataReducer(USER_REQUEST, USER_SUCCESS, USER_FAILURE),
});
