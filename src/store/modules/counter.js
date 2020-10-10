import {
  SET_COUNTER,
  GET_COUNTER,
  COUNTER2_M,
} from '@/store/modules/counter-types';

export const counter = {
  namespaced: true,
  state: {
    counter: 0,
  },

  actions: {
    [SET_COUNTER]: ({ commit, dispatch }) => {
      commit(SET_COUNTER);
      dispatch(`${COUNTER2_M}${SET_COUNTER}`, null, { root: true });
    },
  },
  mutations: {
    [SET_COUNTER]: (state) => state.counter++,
  },
  getters: {
    [GET_COUNTER]: (state) => state.counter,
  },
};
