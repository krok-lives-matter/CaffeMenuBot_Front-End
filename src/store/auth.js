import axios from "axios";

export default {
  namespaced: true,
  state: {
    jwt: localStorage.getItem("jwt"),
    admin: null,
  },
  getters: {
    getAdmin(state) {
      return state.admin;
    },
  },
  mutations: {
    SET_JWT(state, admin) {
      state.jwt = admin.token;
      axios.defaults.headers["Authorization"] = "Bearer " + state.jwt;
      localStorage.setItem("jwt", admin.token);
    },
    REMOVE_JWT(state) {
      state.jwt = "";
      localStorage.removeItem("jwt");
    },
    SET_ADMIN(state, data) {
      state.admin = data;
    },
  },
  actions: {
    async authAdmin({ commit }, admin) {
      try {
        const { data, status } = await axios.post("/auth/login", admin);
        if (status === 200) {
          commit("SET_JWT", data);
          return true;
        }
      } catch (e) {
        console.error("[Error]: Auth admin");
        throw new Error(e.message);
      }
    },
    async getMe({ commit }) {
      try {
        const { data, status } = await axios.get("/auth/me");
        if (status === 200) {
          commit("SET_ADMIN", data);
        }
      } catch (e) {
        console.error("[Error]: Get me");
        throw new Error(e.message);
      }
    },
  },
};
