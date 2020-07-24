import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const layout = () =>
  import(/* webpackChunkName: "layout" */ "../layout/index.vue");
const discovery = () =>
  import(/* webpackChunkName: "discovery" */ "../views/discovery/index.vue");

const routes = [
  {
    name: "Layout",
    path: "/",
    redirect: "/discovery",
    component: layout,
    children: [
      {
        name: "Discovery",
        path: "/discovery",
        component: discovery
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
