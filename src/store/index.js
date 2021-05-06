import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    menu: [
      {
        id: Date.now(),
        name: "Тестовая запись",
        image:
          "https://images.unsplash.com/photo-1568031813264-d394c5d474b9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1349&q=80",
      },
    ],
  },
  mutations: {
    ADD_MENU(state, item) {
      state.menu.push(item);
    },
  },
  actions: {
    addMenu() {
      // Logic for axios post menu item
    },
    fetchMenu() {
      // Logic for axios get all menu items
    },
    deleteMenu() {
      // Logic for axios delete menu item
    },
    updateMenu() {
      // Logic for axios update menu item
    },
  },
});
