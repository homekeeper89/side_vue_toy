import axios from 'axios';
import { REGISTER_USER, SET_USER_API_STATUS } from './types';
import { inspectResponse } from '@/utils/apiHelper';

const api_register_user = '/api/v1/user';
export const userStore = {
  namespaced: true,
  state: {
    apiStatus: {
      code: 0,
      msg: '',
    },
  },
  getters: {},
  actions: {
    [REGISTER_USER]: async ({ commit }, data) => {
      try {
        let res = await axios.post(api_register_user, { data });
        inspectResponse(res);
        commit(SET_USER_API_STATUS, res);
      } catch (err) {
        console.error(err);
        throw Error('API Error occurred');
      }
    },
  },
  mutations: {
    [SET_USER_API_STATUS]: (state, payload) => {
      state.apiStatus.code = payload.status_code;
      state.apiStatus.msg = payload.msg;
    },
  },
};
