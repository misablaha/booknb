import { combineReducers } from 'redux';

// Local reducers
import addAction from './addAction';
import books from './books';
import filter from './filter';
import me from './me';
import relations from './relations';
import search from './search';
import users from './users';

const rootReducer = combineReducers({
  addAction,
  books,
  filter,
  me,
  relations,
  search,
  users,
});

export default rootReducer;
