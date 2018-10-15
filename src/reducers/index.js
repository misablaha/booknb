import { combineReducers } from 'redux';

// Local reducers
import addAction from './addAction';
import me from './me';
import search from './search';

const rootReducer = combineReducers({
  addAction,
  me,
  search,
});

export default rootReducer;
