import axios from 'axios';
import {
  REGISTER_USER,
  SET_USER_API_STATUS,
  CHECK_EMAIL,
} from './users-type.js';
import { inspectResponse } from '@/utils/api-helper';

const api_register_user = '/api/users/v1';
const api_check_email = '/api/users/v1/email/duplicate';

const reqresApi = axios.create({
  baseURL: 'https://reqres.in', // Url
  timeout: 5000, // timeout 5초
});

export const users = {
  namespaced: true,
  state: {
    apiStatus: {
      code: 200,
      msg: '',
    },
  },
  getters: {
    apiStatus(state) {
      return state.apiStatus;
    },
  },
  actions: {
    [REGISTER_USER]: async ({ commit }, data) => {
      try {
        let res = await reqresApi.post(api_register_user, {
          data,
        });
        inspectResponse(res.data);
        commit(SET_USER_API_STATUS, res.data);
      } catch (err) {
        throw Error('API Error occurred');
      }
    },
    [CHECK_EMAIL]: async ({ commit }, data) => {
      try {
        let res = await reqresApi.post(api_check_email, {
          data,
        });
        inspectResponse(res.data);
        commit(SET_USER_API_STATUS, res.data);
      } catch (err) {
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
