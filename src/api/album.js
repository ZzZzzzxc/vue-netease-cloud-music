import { request } from "@/plugins/axios";

/**
 * 新碟上架
 * @param {Number} limit
 * @param {Number} offset
 * @param {Number} area ALL:全部,ZH:华语,EA:欧美,KR:韩国,JP:日本
 * @param {String} type new:全部 hot:热门,默认为 new
 * @param {Number} year 2020 默认本年
 * @param {Number} month  9 默认本月
 */
export const getAlbumList = params => request.get(`/top/album`, { params });
