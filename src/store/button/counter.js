import { GET_COUNTER } from './types';

export const customCounter = {
  state: {
    counter: 0,
  },
  getters: {
    [GET_COUNTER]: (state) => state.counter,
  },
};
