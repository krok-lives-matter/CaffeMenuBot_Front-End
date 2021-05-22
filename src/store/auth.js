import axios from "axios";

export default {
  namespaced: true,
  state: {
    jwt: localStorage.getItem("jwt"),
  },
  mutations: {
    SET_ADMIN(state, admin) {
      state.jwt = admin.token;
      localStorage.setItem("jwt", admin.token);
    },
    REMOVE_ADMIN(state) {
      state.jwt = "";
      localStorage.removeItem("jwt");
    },
  },
  actions: {
    async authAdmin({ commit }, admin) {
      try {
        const { data, status } = await axios.post("/auth/login", admin);
        if (status === 200) {
          commit("SET_ADMIN", data);
          return true;
        }
      } catch (e) {
        console.error("[Error]: Auth Admin");
        throw new Error(e.message);
      }
    },
  },
};
