import { request } from "@/plugins/axios";

/**
 * 获取相似歌手
 * @param {String} id
 */
export const getSimiArtist = params => request.get("/simi/artist", { params });
