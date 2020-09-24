// store/modules/example
import { GET_COUNTER, SET_COUNTER } from './example-types';
export const exampleStore = {
  state: {
    counter: 0,
  },
  getters: {
    [GET_COUNTER]: (state) => state.counter,
  },
  mutations: {
    [SET_COUNTER]: (state) => state.counter++,
  },
  actions: {
    [SET_COUNTER]: ({ commit }) => {
      commit(SET_COUNTER);
    },
  },
};
