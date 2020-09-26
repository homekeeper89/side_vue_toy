import Vue from 'vue';
import Vuex from 'vuex';
// import { GET_COUNTER, SET_COUNTER } from "./mutation-types";
// import * as counter from "./modules/counter";
import { counter as COUNTER } from './modules/counter';
import { counter2 as COUNTER2 } from './modules/counter2';
import { customCounter as CUSTOM } from './button/counter';
import { exampleStore as EXAMPLE } from './modules/example';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    COUNTER,
    COUNTER2,
    CUSTOM, // 이것 이름으로 결정됨, 실제 파일 이름이 matthew.js여도 CUSTOM으로 불리게 됨
    EXAMPLE,
  },
});
