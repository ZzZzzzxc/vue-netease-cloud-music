import { request } from "@/plugins/axios";

/**
 * 获取歌曲详情
 * @param {String} ids ids=347230,1231231
 */
export const getSongDetail = params => request.get("/song/detail", { params });
