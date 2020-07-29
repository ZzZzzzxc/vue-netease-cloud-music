import { request } from "@/plugins/axios";

// 所有排行榜
export const getTopList = () => request.get("/toplist");

// 所有排行榜内容摘要
export const getTopListDetail = () => request.get("/toplist/detail");

/**
 * 歌手榜
 * @param {Number} type 1:华语 || 2:欧美 || 3:韩国 || 4:日本
 */
export const getArtistTopList = params =>
  request.get(`/toplist/artist`, { params });
