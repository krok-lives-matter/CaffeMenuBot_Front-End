import axios from "axios";

export default {
  namespaced: true,
  state: {
    schedules: {},
  },
  mutations: {
    SET_SCHEDULES(state, data) {
      state.schedules = data;
    },
  },
  actions: {
    async fetchSchedule({ commit }) {
      const { data, status } = await axios("/dashboard/schedule");
      if (status === 200) {
        commit("SET_SCHEDULES", data);
      }
    },
    async deleteSchedule({ dispatch }, idx) {
      const { status } = await axios.delete(`/dashboard/schedule/${idx}`);
      if (status === 204) {
        await dispatch("fetchSchedule");
        return true;
      }
    },
    async createSchedule({ dispatch }, schedule) {
      const { status } = await axios.post("/dashboard/schedule/", schedule);
      if (status === 200) {
        await dispatch("fetchSchedule");
        return true;
      }
    },
    async editSchedule({ dispatch }, schedule) {
      const { status } = await axios.put("/dashboard/schedule/", schedule);
      if (status === 200) {
        await dispatch("fetchSchedule");
        return true;
      }
    },
  },
};
