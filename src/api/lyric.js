import { request } from "@/plugins/axios";

/**
 * 获取歌词
 * @param {Number} id
 */
export const getLyric = params => request.get(`/lyric`, { params });
