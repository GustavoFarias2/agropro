
export const token = {
  LOGIN: {
    action: (token) => ({
      type: 'LOGIN',
      payload: {
        token
      }
    }),
    fun: (payload) => payload.token,
  },
  LOGOUT: {
    action: () => ({
      type: 'LOGOUT'
    }),
    fun: () => null
  }
}

export function tokenReducer(state = null, action) {

  if (token[action.type])
    return token[action.type].fun(action.payload)

  return state

}
