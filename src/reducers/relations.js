import { combineReducers } from 'redux';
import find from 'lodash/find';
import { ADD_BOOK } from '../actions/books';

const initialState = [];

const relationsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_BOOK:
      const { book, variant, userId } = action;
      const relation = { bookId: book.id, userId, variant };
      return find(state, relation)
        ? state
        : [...state, relation];
    default:
      return state;
  }
};

export default combineReducers({
  data: relationsReducer,
  // _metadata: createMetadataReducer(SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE),
});
