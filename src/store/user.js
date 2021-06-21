import axios from "axios";

export default {
  namespaced: true,
  state: {
    users: {},
    roles: {},
  },
  mutations: {
    SET_USER(state, data) {
      state.users = data;
    },
    ADD_USER(state, data) {
      state.users.push(data);
    },
    SET_ROLES(state, data) {
      state.roles = data;
    },
  },
  actions: {
    async fetchUsers({ commit }) {
      const { data, status } = await axios.get("/userManagement/users");
      if (status === 200) {
        commit("SET_USER", data);
      }
    },
    async fetchRoles({ commit }) {
      const { data, status } = await axios.get("/userManagement/roles");
      if (status === 200) {
        commit("SET_ROLES", data);
      }
    },
    async deleteUser({ dispatch }, id) {
      const { status } = await axios.delete(`/userManagement/users/${id}`);
      if (status === 200) {
        await dispatch("fetchUsers");
        return true;
      }
    },
    async createUser({ commit }, user) {
      const { data, status } = await axios.post("/userManagement/create", user);
      if (status === 200) {
        commit("ADD_USER", data);
      }
    },
  },
};
