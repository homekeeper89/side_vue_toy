import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
// import JwtService from '@/common/jwt.service';
import { API_URL } from '@/common/config';
import { USER_NAMESPACE } from '@/store/modules/users-type';

export const ApiService = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = API_URL;
  },

  // setHeader() {
  //   Vue.axios.defaults.headers.common[
  //     'Authorization'
  //   ] = `Token ${JwtService.getToken()}`;
  // },

  query(resource, params) {
    return Vue.axios.get(resource, params).catch((error) => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },

  get(resource, slug = '') {
    return Vue.axios.get(`api/${resource}/${slug}`).catch((error) => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },

  post(resource, params) {
    return Vue.axios.post(`api/${resource}`, params);
  },

  update(resource, slug, params) {
    return Vue.axios.put(`api/${resource}/${slug}`, params);
  },

  put(resource, params) {
    return Vue.axios.put(`api/${resource}`, params);
  },

  delete(resource) {
    return Vue.axios.delete(resource).catch((error) => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },
};

export const UserApiService = {
  get() {
    return ApiService.get(USER_NAMESPACE);
  },
  post(resource, payload) {
    return ApiService.post(`${USER_NAMESPACE}/${resource}`, {
      data: { body: payload },
    });
  },
};
