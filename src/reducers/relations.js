import { combineReducers } from 'redux';
import find from 'lodash/find';
import get from 'lodash/get';
// import keyBy from 'lodash/keyBy';
import { ADD_REQUEST } from '../actions/add';
import { RELATION_FAILURE, RELATION_REQUEST, RELATION_SUCCESS } from '../actions/relation';
import createMetadataReducer from './metadata';
import { BOOK_SUCCESS } from '../actions/book';

const initialState = [];

const relationsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case BOOK_SUCCESS:
      return get(action, 'response.data', []);
      // return keyBy(relationList, '_id');
    case ADD_REQUEST:
      const { book, variant, userId } = action.payload;
      const relation = { bookId: book._id, userId, variant };
      return find(state, relation)
        ? state
        : [...state, relation];
    default:
      return state;
  }
};

export default combineReducers({
  data: relationsReducer,
  _metadata: createMetadataReducer(RELATION_REQUEST, RELATION_SUCCESS, RELATION_FAILURE),
});
