import { createStore, combineReducers } from 'redux';

import { tokenReducer } from './token';

const appReducer = combineReducers({
  token: tokenReducer
})

const rootReducer = (state, action) => {

  console.log(state)

  if (action.type === 'LOGOUT') 
    state = undefined

  return appReducer(state, action)

}

const store = createStore(rootReducer);

export default store;
