import { request } from "@/plugins/axios";

/**
 * 获取 banner( 轮播图 ) 数据
 * @param {Number} type pc:0 android:1 iphone:2 ipad:3
 */
export const getBanner = (type = 0) => request.get(`/banner?type=${type}`);
