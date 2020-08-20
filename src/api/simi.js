import { request } from "@/plugins/axios";

/**
 * 获取相似歌手
 * @param {String} id
 */
export const getSimiArtist = params => request.get("/simi/artist", { params });

/**
 * 获取相似歌曲
 * @param {String} id
 */
export const getSimiSong = params => request.get("/simi/song", { params });

/**
 * 获取相似歌单
 * @param {String} id
 */
export const getSimiPlaylist = params =>
  request.get("/simi/playlist", { params });

/**
 * 获取相似 mv
 * @param {String} mvid
 */
export const getSimiMv = params => request.get("/simi/mv", { params });
