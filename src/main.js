import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import "normalize.css/normalize.css";
import "./assets/scss/_fonts.scss";
import "./assets/scss/all.scss";

Vue.config.productionTip = false;

Vue.filter("truncate", function (text, stop, clamp) {
  return text.slice(0, stop) + (stop < text.length ? clamp || "..." : "");
});

axios.defaults.baseURL = "https://cmb-api.vova-lantsov.dev/api";

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.state.auth.admin) {
      router.push({
        path: "/admin",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
