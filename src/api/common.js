import { request } from "@/plugins/axios";

/**
 * 国家编码列表
 */
export const getCountriesCodeList = () => request.post(`/countries/code/list`);
