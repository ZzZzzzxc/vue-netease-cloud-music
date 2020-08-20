import { request } from "@/plugins/axios";

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
