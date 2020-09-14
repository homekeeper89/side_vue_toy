import Vue from "vue";
import Vuex from "vuex";
// import actions from "./actions.js"
import * as counter from "./modules/counter"

Vue.use(Vuex);

export default new Vuex.Store({

  modules: {
    counter
  }
});
