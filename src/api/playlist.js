import { request } from "@/plugins/axios";

// 歌单分类
export const getCatList = () => request.get("/playlist/catlist");

// 热门歌单分类
export const getHotCatList = () => request.get("/playlist/hot");

/**
 * 获取歌单详情
 * @param {String} id
 */
export const getPlayListDetail = params =>
  request.get(`/playlist/detail`, { params });

/**
 * 获取歌单收藏者
 * @param {String} id
 * @param {Number} limit
 * @param {Number} offset
 */
export const getPlayListSubscribers = params =>
  request.get(`/playlist/subscribers`, { params });
