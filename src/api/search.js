import { request } from "@/plugins/axios";

// 热搜列表(详细)
export const getSearchHot = () => request.get("/search/hot/detail");

/**
 * 分类搜索
 * @param {String} keywords 关键词
 * @param {String} [type] 搜索类型 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
 * @param {Number} [limit] 默认为 30
 * @param {Number} [offset] 默认为 0
 */
export const getSearchData = params => request.get("/cloudsearch", { params });

// 默认搜索关键词
export const getDefaultSearchWord = () => request.get("/search/default");

/**
 * 搜索建议
 * @param {String} keywords 关键词
 * @param {String} [type] 如果传 'mobile' 则返回移动端数据
 */
export const getSearchSuggest = params =>
  request.get("/search/suggest", { params });

/**
 * 多重搜索
 * @param {String} keywords 关键词
 */
export const getMultimatchSearchData = params =>
  request.get("/search/multimatch", { params });
