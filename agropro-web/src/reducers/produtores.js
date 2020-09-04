
const produtoresFunction = {

  LOAD_PRODUTORES: (_, payload) =>
    payload.produtores,

  ADD_PRODUTOR: (state, payload) =>
    [...state, payload.produtor],

  UPDATE_PRODUTOR: (state, payload) =>
    state.map((produtor) => produtor.id !== payload.produtor.id ? produtor : { ...produtor, ...payload.produtor }),

  REMOVE_PRODUTOR: (state, payload) =>
    state.filter((produtor) => produtor.id !== payload.produtor.id),

}

export const produtoresActions = {

  LOAD_PRODUTORES: (produtores) => ({
    type: 'LOAD_PRODUTORES',
    payload: {
      produtores
    }
  }),

  ADD_PRODUTOR: (produtor) => ({
    type: 'ADD_PRODUTOR',
    payload: {
      produtor
    }
  }),

  UPDATE_PRODUTOR: (produtor) => ({
    type: 'UPDATE_PRODUTOR',
    payload: {
      produtor
    }
  }),

  REMOVE_PRODUTOR: (produtor) => ({
    type: 'REMOVE_PRODUTOR',
    payload: {
      produtor
    }
  })

}

export const produtoresReducer = (state = [], action) => produtoresFunction[action.type] ? produtoresFunction[action.type](state, action.payload) : state;
