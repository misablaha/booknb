import { OPEN_ADD, CLOSE_ADD, ADD_REQUEST } from '../actions/add';

const initialState = null;

const addReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case OPEN_ADD:
      return action.variant;
    case CLOSE_ADD:
    case ADD_REQUEST:
      return null;
    default:
      return state;
  }
};

export default addReducer;
