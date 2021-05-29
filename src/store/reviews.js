import axios from "axios";

export default {
  namespaced: true,
  state: {
    reviews: [],
  },
  mutations: {
    SET_REVIEWS(state, reviews) {
      state.reviews = reviews;
    },
  },
  actions: {
    async fetchReviews({ commit }) {
      try {
        const { data, status } = await axios.get("/dashboard/reviews");
        if (status === 200) {
          commit("SET_REVIEWS", data);
        }
      } catch (e) {
        console.error("[Error]: fetchReviews");
        throw new Error(e.message);
      }
    },
  },
};
