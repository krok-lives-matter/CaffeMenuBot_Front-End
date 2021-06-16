import axios from "axios";

export default {
  namespaced: true,
  state: {
    user: null,
  },
  mutations: {
    SET_USER(state, data) {
      state.user = data;
    },
  },
  actions: {
    async fetchUsers({ commit }) {
      const { data, status } = await axios.get("/userManagement/users");
      if (status === 200) {
        commit("SET_USER", data);
      }
    },
  },
};
