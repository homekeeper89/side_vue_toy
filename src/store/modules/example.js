// store/modules/example
import { GET_COUNTER } from './example-types';
export const exampleStore = {
  state: {
    counter: 0,
  },
  getters: {
    [GET_COUNTER]: (state) => state.counter,
  },
};
