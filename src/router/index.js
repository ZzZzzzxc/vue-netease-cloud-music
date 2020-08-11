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

// 基础布局
const layout = () => import("../layout/index.vue");

// 发现模块布局
const discovery = () => import("../views/discovery/index.vue");
// 发现模块子模块
const recommendation = () => import("../views/discovery/recommendation");
const songList = () => import("../views/discovery/song-list");
const singer = () => import("../views/discovery/singer");
const rank = () => import("../views/discovery/rank");
const newMusic = () => import("../views/discovery/new-music");

// 详情模块
const fm = () => import("../views/fm/index.vue");
const singerDetail = () => import("../views/detail/singer/index.vue");
const djDetail = () => import("../views/detail/dj/index.vue");
const songListDetail = () => import("../views/detail/song-list/index.vue");

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
        redirect: "/discovery/recommendation",
        component: discovery,
        children: [
          {
            name: "Recommendation",
            path: "recommendation",
            component: recommendation
          },
          {
            name: "SongList",
            path: "song-list",
            component: songList
          },
          {
            name: "Singer",
            path: "singer",
            component: singer
          },
          {
            name: "Rank",
            path: "rank",
            component: rank
          },
          {
            name: "NewMusic",
            path: "new-music",
            component: newMusic
          }
        ]
      },
      {
        name: "Fm",
        path: "/fm",
        component: fm
      },
      {
        name: "SingerDetail",
        path: "/singer/:id",
        component: singerDetail,
        props: true
      },
      {
        name: "DjDetail",
        path: "/dj/:id",
        component: djDetail,
        props: true
      },
      {
        name: "SongListDetail",
        path: "/song-list/:id",
        component: songListDetail,
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
