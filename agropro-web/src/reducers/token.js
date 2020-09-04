
const tokenFunctions = {
  LOGIN: (payload) => payload.token,
}

export const tokenActions = {
  LOGIN: (token) => ({
    type: 'LOGIN',
    payload: {
      token
    }
  }),
  LOGOUT: () => ({
    type: 'LOGOUT'
  })
}

export const tokenReducer = (state = null, action) => tokenFunctions[action.type] ? tokenFunctions[action.type](action.payload) : state;
