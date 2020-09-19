import { GET_COUNTER, SET_COUNTER } from './types';

export const customCounter = {
  namespaced: true,
  state: {
    counter: 0,
  },
  mutations: {
    [SET_COUNTER]: (state) => state.counter++,
  },
  getters: {
    [GET_COUNTER]: (state) => state.counter,
  },
  actions: {
    [SET_COUNTER]: ({ commit }) => {
      commit(SET_COUNTER);
    },
  },
};
