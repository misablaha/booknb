import { OPEN_ADD, CLOSE_ADD } from '../actions/add';
import { ADD_BOOK } from '../actions/books';

const initialState = null;

const addReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case OPEN_ADD:
      return action.variant;
    case CLOSE_ADD:
    case ADD_BOOK:
      return null;
    default:
      return state;
  }
};

export default addReducer;
