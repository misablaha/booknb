import { BOOK_FILTER } from '../actions/filter';
import { OFFER, REQUIRE, SUGGEST } from '../actions/add';

const initialState = {
  [OFFER]: true,
  [REQUIRE]: true,
  [SUGGEST]: true,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case BOOK_FILTER:
      return {
        ...state,
        [action.key]: action.value,
      };
    default:
      return state;
  }
};
