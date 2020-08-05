import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// fix 跳转 url 与当前 url 相同导致的 error
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};

const layout = () =>
  import(/* webpackChunkName: "layout" */ "../layout/index.vue");
const discovery = () =>
  import(/* webpackChunkName: "discovery" */ "../views/discovery/index.vue");
const fm = () => import(/* webpackChunkName: "fm" */ "../views/fm/index.vue");
const singer = () =>
  import(/* webpackChunkName: "fm" */ "../views/detail/singer/index.vue");
const dj = () =>
  import(/* webpackChunkName: "fm" */ "../views/detail/dj/index.vue");
const songList = () =>
  import(/* webpackChunkName: "fm" */ "../views/detail/song-list/index.vue");
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
      },
      {
        name: "Fm",
        path: "/fm",
        component: fm
      },
      {
        name: "Singer",
        path: "/singer/:id",
        component: singer,
        props: true
      },
      {
        name: "Dj",
        path: "/dj/:id",
        component: dj,
        props: true
      },
      {
        name: "SongList",
        path: "/song-list/:id",
        component: songList,
        props: true
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
