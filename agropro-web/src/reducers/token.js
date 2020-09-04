
const tokenFunction = {
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

export const tokenReducer = (state = null, action) => tokenFunction[action.type] ? tokenFunction[action.type](action.payload) : state;
