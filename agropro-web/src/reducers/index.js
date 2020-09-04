import { createStore, combineReducers } from 'redux';

import { tokenReducer } from './token';

const store = createStore(combineReducers({
  token: tokenReducer
}));

export default store;
