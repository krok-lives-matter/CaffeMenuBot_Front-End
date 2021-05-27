import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import menu from "./menu";
import dishes from "./dishes";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    menu,
    dishes,
  },
});
