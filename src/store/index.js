import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import menu from "./menu";
import dishes from "./dishes";
import reviews from "./reviews";
import status from "./status";
import user from "./user";
import schedule from "./schedule";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    menu,
    dishes,
    reviews,
    status,
    user,
    schedule,
  },
});
