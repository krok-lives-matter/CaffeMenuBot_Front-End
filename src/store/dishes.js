import axios from "axios";

export default {
  namespaced: true,
  state: {
    dishes: [],
  },
  mutations: {
    SET_DISHES(state, dishes) {
      state.dishes = dishes;
    },
    ADD_DISH(state, dish) {
      state.dishes.push(dish);
    },
    DELETE_DISH(state, idx) {
      state.dishes = state.dishes.filter((item) => item.id !== idx);
    },
    UPDATE_DISH(state, dish) {
      const idx = state.dishes.findIndex((item) => item.id === dish.id);
      state.dishes[idx] = dish;
    },
  },
  actions: {
    async fetchDishes({ commit }, id) {
      try {
        const { data, status } = await axios.get(
          `/dashboard/menu/dishes?category_id=${id}`
        );
        if (status === 200) {
          commit("SET_DISHES", data);
        }
      } catch (e) {
        console.error("[Error]: fetchDishes");
        throw new Error(e.message);
      }
    },
    async addDish({ commit }, dish) {
      try {
        const { data, status } = await axios.post(
          `/dashboard/menu/dishes`,
          dish
        );
        if (status === 200) {
          commit("ADD_DISH", data);
        }
      } catch (e) {
        console.error("[Error]: fetchDishes");
        throw new Error(e.message);
      }
    },
    async deleteDish({ commit }, id) {
      try {
        const { status } = await axios.delete(`/dashboard/menu/dishes`, {
          params: {
            dish_id: id,
          },
        });
        if (status === 204) {
          commit("DELETE_DISH", id);
        }
      } catch (e) {
        console.error("[Error]: deleteDish");
        throw new Error(e.message);
      }
    },
    async updateDish({ commit }, item) {
      try {
        const { data, status } = await axios.put(
          `/dashboard/menu/dishes`,
          item
        );
        if (status === 200) {
          commit("UPDATE_DISH", data);
        }
      } catch (e) {
        console.error("[Error]: updateDish");
        throw new Error(e.message);
      }
    },
  },
};
