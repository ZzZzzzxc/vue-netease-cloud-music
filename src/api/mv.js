import { request } from "@/plugins/axios";

/**
 * 获取全部 mv 数据
 * @param {String} area: 地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部
 * @param {String} type: 类型,可选值为全部,官方版,原生,现场版,网易出品,不填则为全部
 * @param {String} order: 排序,可选值为上升最快,最热,最新,不填则为上升最快
 * @param {Number} limit
 * @param {Number} offset
 */
export const getAllMv = params => request.get("/mv/all", { params });

/**
 * 获取最新 mv 数据
 * @param {String} area: 地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部
 * @param {Number} limit
 */
export const getNewMv = params => request.get("/mv/first", { params });

/**
 * 获取网易出品 mv 数据
 * @param {Number} limit
 * @param {Number} offset
 */
export const getExclusiveMv = params =>
  request.get("/mv/exclusive/rcmd", { params });

/**
 * 获取 mv 数据
 * @param {Number} mvid
 */
export const getMvDetail = params => request.get("/mv/detail", { params });

/**
 * 获取 mv 点赞转发评论数数据
 * @param {Number} mvid
 */
export const getMvDetailInfo = params =>
  request.get("/mv/detail/info", { params });

/**
 * 获取 mv 地址
 * @param {Number} id
 */
export const getMvUrl = params => request.get("/mv/url", { params });
