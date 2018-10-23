import { combineReducers } from 'redux';

// Local reducers
import addAction from './addAction';
import books from './books';
import me from './me';
import relations from './relations';
import search from './search';

const rootReducer = combineReducers({
  addAction,
  books,
  me,
  relations,
  search,
});

export default rootReducer;
