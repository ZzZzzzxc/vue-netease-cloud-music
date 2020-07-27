import { request } from "@/plugins/axios";

// 热搜列表(简略)
export const getSearchHot = () => request.get("/search/hot");
