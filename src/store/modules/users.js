import axios from 'axios';
import { REGISTER_USER, SET_USER_API_STATUS } from './users-type.js';
import { inspectResponse } from '@/utils/apiHelper';

const api_register_user = '/api/users/v1';

const reqresApi = axios.create({
  baseURL: 'https://reqres.in', // Url
  timeout: 5000, // timeout 5초
});

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
        let res = await axios.post(api_register_user, {
          data: data,
        });
        inspectResponse(res);
        commit(SET_USER_API_STATUS, res);
      } catch (err) {
        console.error(err);
        throw Error('API Error occurred');
      }
    },
    testActions: async ({ commit }, data) => {
      try {
        let res = await axios.post(api_register_user, { data });
        inspectResponse(res.data);
        commit(SET_USER_API_STATUS, res.data);
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
