import { createStore, combineReducers } from 'redux';

import { tokenReducer } from './token';

const appReducer = combineReducers({
  token: tokenReducer
})

const rootReducer = (state, action) => {

  if (action.type === 'LOGOUT') 
    state = undefined

  return appReducer(state, action)

}

const store = createStore(rootReducer);

export default store;
