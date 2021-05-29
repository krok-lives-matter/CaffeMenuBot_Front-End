import axios from "axios";

export default {
  namespaced: true,
  state: {
    isRunning: false,
  },
  mutations: {
    SET_RUNNING(state, data) {
      state.isRunning = data.isRunning;
    },
  },
  actions: {
    async getStatus({ commit }) {
      try {
        const { data, status } = await axios.get("/bot/status");
        if (status === 200) {
          commit("SET_RUNNING", data);
        }
      } catch (e) {
        console.error("[Error]: getStatus");
        throw Error(e.message);
      }
    },
    async stopTheBot({ dispatch }) {
      try {
        const { status } = await axios.post("/bot/stop");
        if (status === 200) {
          await dispatch("getStatus");
        }
      } catch (e) {
        console.error("[Error]: getStatus");
        throw Error(e.message);
      }
    },
    async startTheBot({ dispatch }) {
      try {
        const { status } = await axios.post("/bot/start");
        if (status === 200) {
          await dispatch("getStatus");
        }
      } catch (e) {
        console.error("[Error]: getStatus");
        throw Error(e.message);
      }
    },
    async restartTheBot({ dispatch }) {
      try {
        const { status } = await axios.post("/bot/restart");
        if (status === 200) {
          await dispatch("getStatus");
        }
      } catch (e) {
        console.error("[Error]: getStatus");
        throw Error(e.message);
      }
    },
  },
};
