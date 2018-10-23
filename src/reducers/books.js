import { combineReducers } from 'redux';
import { ADD_BOOK } from '../actions/books';
// import createMetadataReducer from './metadata';

const initialState = {};

const userReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_BOOK:
      const { book } = action;
      return {
        ...state,
        [book.id]: book,
      };
    default:
      return state;
  }
};

export default combineReducers({
  data: userReducer,
  // _metadata: createMetadataReducer(SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE),
});
