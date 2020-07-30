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
