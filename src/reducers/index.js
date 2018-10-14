import { combineReducers } from 'redux';

// Local reducers
import search from './search';

const rootReducer = combineReducers({
  search,
});

export default rootReducer;
