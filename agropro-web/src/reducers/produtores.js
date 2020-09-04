
const produtoresFunctions = {

  LOAD_PRODUTORES: (_, payload) =>
    payload.produtores,

  ADD_PRODUTOR: (state, payload) =>
    [...state, payload.produtor],

  UPDATE_PRODUTOR: (state, payload) =>
    state.map((produtor) => produtor.id !== payload.produtor.id ? produtor : { ...produtor, ...payload.produtor }),

  REMOVE_PRODUTOR: (state, payload) =>
    state.filter((produtor) => produtor.id !== payload.produtor.id),

  REMOVE_FAZENDA: (state, payload) => {
    const produtorFiltered = state.filter((produtor) => produtor.id === payload.fazenda.produtor_id)[0];

    const fazendasWithoutRemoved = produtorFiltered.fazendas.filter((fazenda) => fazenda.id !== payload.fazenda.id);

    return state.map((produtor) => produtor.id !== produtorFiltered.id ? produtor : { ...produtor, ...{ fazendas: fazendasWithoutRemoved } });
  },

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
  }),

  REMOVE_FAZENDA: (fazenda) => ({
    type: 'REMOVE_FAZENDA',
    payload: {
      fazenda
    }
  })

}

export const produtoresReducer = (state = [], action) => produtoresFunctions[action.type] ? produtoresFunctions[action.type](state, action.payload) : state;
