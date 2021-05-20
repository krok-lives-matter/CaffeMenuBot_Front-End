import axios from "axios";

export default {
  namespaced: true,
  state: {
    admin: JSON.parse(localStorage.getItem("admin")),
  },
  mutations: {
    SET_ADMIN(state, admin) {
      state.admin = { jwt: admin.token, user: admin.user };
      localStorage.setItem(
        "admin",
        JSON.stringify({ jwt: admin.token, user: admin.user })
      );
    },
    REMOVE_ADMIN(state) {
      state.admin = null;
      localStorage.setItem("admin", null);
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
