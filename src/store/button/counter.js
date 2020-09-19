import { GET_COUNTER } from './types';

export const customCounter = {
  namespaced: true,
  state: {
    counter: 0,
  },
  getters: {
    [GET_COUNTER]: (state) => state.counter,
  },
};
