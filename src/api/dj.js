import { request } from "@/plugins/axios";

/**
 * 获得电台节目详情
 * @param {Number} rid
 */
export const getDjProgramDetail = params =>
  request.get(`/dj/program/detail`, { params });

export const getDjProgram = params => request.get(`/dj/program`, { params });
