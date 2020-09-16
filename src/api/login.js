import { request } from "@/plugins/axios";

/**
 * 手机号登录
 * @param {String} phone
 * @param {String} password
 */
export const loginByPhone = body => request.post(`/login/cellphone`, body);

/**
 * 邮箱登录
 * @param {String} email
 * @param {String} password
 */
export const loginByEmail = body => request.post(`/login`, body);

// 登录状态
export const getLoginStatus = () => request.get(`/login/status`);
