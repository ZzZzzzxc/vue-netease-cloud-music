import { request } from "@/plugins/axios";

/**
 * 获得电台节目详情
 * @param {Number} id
 */
export const getDjProgramDetail = params =>
  request.get(`/dj/program/detail`, { params });
