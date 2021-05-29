import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "User",
    component: () => import("../views/User.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/status",
    name: "Status",
    component: () => import("../views/Home.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/menu",
    name: "Menu",
    component: () => import("../views/EditMenu.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/menu/dishes/:id",
    name: "Dishes",
    component: () => import("../views/Dishes.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/reviews",
    name: "Reviews",
    component: () => import("../views/Reviews.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/admin",
    name: "AdminAuth",
    component: () => import("../views/AdminAuth.vue"),
  },
  {
    path: "*",
    name: "404",
    component: () => import("../views/Page_404.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
