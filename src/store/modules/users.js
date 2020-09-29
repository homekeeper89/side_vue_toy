import axios from 'axios';
import { REGISTER_USER } from './types';
export const userStore = {
  namespaced: true,
  state: {},
  getters: {},
  actions: {
    [REGISTER_USER]: async ({ commit, data }) => {
      let res = await axios.post('/api/v1/user', { data });
    },
  },
  mutations: {},
};
