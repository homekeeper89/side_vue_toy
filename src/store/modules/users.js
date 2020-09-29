import axios from 'axios';
import { REGISTER_USER, SET_USER_API_STATUS } from './types';

const api_register_user = '/api/v1/user';

export const userStore = {
  namespaced: true,
  state: {
    apiStatus: {
      code: 0,
      msg: '',
    },
    counter: 0,
  },
  getters: {},
  actions: {
    [REGISTER_USER]: async ({ commit, data }) => {
      await axios.post(api_register_user, { data });
      let status = {
        code: 200,
        msg: 'success',
      };
      commit(SET_USER_API_STATUS, status);
    },
  },
  mutations: {
    [SET_USER_API_STATUS]: (state, payload) => {
      state.apiStatus.code = payload.code;
      state.apiStatus.msg = payload.msg;
    },
  },
};
