import { combineReducers } from 'redux';
import get from 'lodash/get';
import keyBy from 'lodash/keyBy';
import { ADD_REQUEST } from '../actions/add';
import { BOOK_FAILURE, BOOK_REQUEST, BOOK_SUCCESS } from '../actions/book';
import createMetadataReducer from './metadata';

const initialState = {};

const userReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case BOOK_SUCCESS:
      const bookList = get(action, 'response.data', []);
      return keyBy(bookList, '_id');
    case ADD_REQUEST:
      const { book } = action.payload;
      return {
        ...state,
        [book._id]: book,
      };
    default:
      return state;
  }
};

export default combineReducers({
  data: userReducer,
  _metadata: createMetadataReducer(BOOK_REQUEST, BOOK_SUCCESS, BOOK_FAILURE),
});
