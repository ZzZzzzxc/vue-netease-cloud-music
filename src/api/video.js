import { request } from "@/plugins/axios";

/**
 * 获取视频标签列表
 */
export const getVideoTagList = params =>
  request.get(`/video/group/list`, { params });

/**
 * 获取视频分类列表
 */
export const getVideoCategoryList = params =>
  request.get(`/video/category/list`, { params });

/**
 * 获取视频标签列表
 * @param {Number} id videoGroup 的 id
 * @param {offset}
 */
export const getVideo = params => request.get(`/video/group`, { params });

/**
 * 获取全部视频列表
 * @param {offset}
 */
export const getAllVideo = params =>
  request.get(`/video/timeline/all`, { params });

/**
 * 获取视频 url
 * @param {Number} id
 * @param {offset}
 */
export const getVideoUrl = params => request.get(`/video/url`, { params });

/**
 * 获取视频详情
 * @param {Number} id
 */
export const getVideoDetail = params =>
  request.get(`/video/detail`, { params });
