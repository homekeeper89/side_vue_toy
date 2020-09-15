import { GET_COUNTER } from './types';

export const customCounter = {
  namespaced: true,
  state: {
    counter: 7,
  },
  getters: {
    [GET_COUNTER]: (state) => state.counter,
  },
};
