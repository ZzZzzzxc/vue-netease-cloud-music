import { request } from "@/plugins/axios";

/**
 * 获取歌曲详情
 * @param {String} ids ids=347230,1231231
 */
export const getSongDetail = params => request.get("/song/detail", { params });

/**
 * 获取歌曲播放 URL
 * @param {Number} id
 */
export const getSongSrc = params => request.get("/song/url", { params });
