import { request } from "@/plugins/axios";

/**
 * 根据分类获取歌手列表
 * @param {Number} limit
 * @param {Number} offset
 * @param {Number} area -1:全部 7:华语 96: 欧美 8:日本 16:韩国 0:其他
 * @param {Number} type -1:全部 1:男歌手 2:女歌手 3:乐队
 * @param {String} initial a b c ... z
 */
export const getArtistList = params => request.get(`/artist/list`, { params });

/**
 * 获取歌手描述
 * @param {String} id
 */
export const getArtistDesc = params =>
  request.get("/artist/desc", { params });

/**
 * 获取歌手专辑
 * @param {String} id
 * @param {Number} offset
 * @param {Number} limit
 */
export const getArtistAlbum = params =>
  request.get("/artist/album", { params });

/**
 * 获取歌手MV
 * @param {String} id
 */
export const getArtistMv = params => request.get("/artist/mv", { params });
