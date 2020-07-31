import { request } from "@/plugins/axios";

export const getTopArtists = () => request.get(`/top/artists`);

/**
 * 歌单 ( 网友精选碟 )
 * @param {String} order "new" 或者 "hot"，默认为 "hot"
 * @param {Number} cat tag, 比如 " 华语 "、" 流行 ", 默认为 "全部"
 * @param {Number} limit 返回数量 , 默认为 50
 * @param {Number} offset 偏移数量，用于分页 , 如 :(页数 -1) * 50, 其中 50 为 limit 的值 , 默认为 0
 */
export const getTopPlayList = params =>
  request.get(`/top/playlist`, { params });

/**
 * 新歌速递
 * @param {Number} type 0:全部 7:华语 96: 欧美 8:日本 16:韩国
 */
export const getTopSong = params => request.get(`/top/song`, { params });
