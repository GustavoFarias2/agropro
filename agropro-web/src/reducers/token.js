
const tokenFunction = {
  LOGIN: (payload) => payload.token,
  LOGOUT: () => null
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

export function tokenReducer(state = null, action) {

  return tokenFunction[action.type] ? tokenFunction[action.type](action.payload) : state;

}
