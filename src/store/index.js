import Vue from 'vue';
import Vuex from 'vuex';
import { counter as COUNTER } from './modules/counter';
import { counter2 as COUNTER2 } from './modules/counter2';
import { exampleStore as EXAMPLE } from './modules/example';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    COUNTER,
    COUNTER2,
    EXAMPLE, // namespaced : EXAMPLE
  },
});
