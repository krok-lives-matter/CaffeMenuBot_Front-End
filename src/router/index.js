import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/status",
    name: "Status",
    component: () => import("../views/Home.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/edit",
    name: "EditMenu",
    component: () => import("../views/EditMenu.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/",
    name: "User",
    component: () => import("../views/User.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/admin",
    name: "AdminAuth",
    component: () => import("../views/AdminAuth.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
