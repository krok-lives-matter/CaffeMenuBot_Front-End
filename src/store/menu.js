import axios from "axios";

export default {
  namespaced: true,
  state: {
    menus: [],
    menu: [],
  },
  mutations: {
    ADD_MENU(state, dish) {
      state.menus.push(dish);
    },
    SET_MENU(state, menu) {
      state.menus = menu.$values;
    },
    DELETE_MENU(state, id) {
      state.menus = state.menus.filter((i) => i.id !== id);
    },
    SET_ONE_MENU(state, menu) {
      state.menu = menu;
    },
  },
  actions: {
    async addMenu({ commit }, item) {
      try {
        const { status } = await axios.post("/dashboard/menu/categories", item);
        if (status === 200) {
          commit("ADD_MENU", item);
        }
      } catch (e) {
        console.error("[Error]: Add Menu");
        throw new Error(e.message);
      }
    },
    async fetchMenu({ commit }) {
      try {
        const { data, status } = await axios.get("/dashboard/menu/categories");
        if (status === 200) {
          commit("SET_MENU", data);
        }
      } catch (e) {
        console.error("[Error]: Fetch Menu");
        throw new Error(e.message);
      }
    },
    async deleteMenu({ commit }, id) {
      try {
        const { status } = await axios.delete(
          `/dashboard/menu/categories/${id}`
        );
        if (status === 204) {
          commit("DELETE_MENU", id);
        }
      } catch (e) {
        console.error("[Error]: Fetch Menu");
        throw new Error(e.message);
      }
    },
    async fetchOneMenu({ commit }, id) {
      try {
        const { data, status } = await axios.get(
          `/dashboard/menu/categories/${id}`
        );
        if (status === 200) {
          commit("SET_ONE_MENU", data);
        }
      } catch (e) {
        console.error("[Error]: Fetch One Menu");
        throw new Error(e.message);
      }
    },
  },
};
