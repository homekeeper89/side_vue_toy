import Vue from "vue";
import Vuex from "vuex";
// import actions from "./actions.js"
import {GET_COUNTER, SET_COUNTER} from "./mutation-types"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    counter:0
  },
  mutations: {
    [SET_COUNTER]:state => state.counter++
  },
  actions:{
    [SET_COUNTER]:({commit}) => commit(SET_COUNTER)
  },
  getters:{
    [GET_COUNTER]:state => state.counter
  },
  modules: {}
});
