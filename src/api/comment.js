import { request } from "@/plugins/axios";

/**
 * 歌曲评论
 * @param {Number} id
 * @param {Number} limit 取出评论数量 , 默认为 20
 * @param {Number} offset 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
 * @param {Number} before 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过5000条评论的时候需要用到)
 */
export const getMusicComment = params =>
  request.get(`/comment/music`, { params });

/**
 * 歌单评论
 * @param {Number} id
 * @param {Number} limit 取出评论数量 , 默认为 20
 * @param {Number} offset 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
 * @param {Number} before 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过5000条评论的时候需要用到)
 */
export const getPlayListComment = params =>
  request.get(`/comment/playlist`, { params });

/**
 * 专辑评论
 * @param {Number} id
 * @param {Number} limit 取出评论数量 , 默认为 20
 * @param {Number} offset 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
 * @param {Number} before 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过5000条评论的时候需要用到)
 */
export const getAlbumComment = params =>
  request.get(`/comment/album`, { params });

/**
 * MV评论
 * @param {Number} id
 * @param {Number} limit 取出评论数量 , 默认为 20
 * @param {Number} offset 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
 * @param {Number} before 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过5000条评论的时候需要用到)
 */
export const getMvComment = params => request.get(`/comment/mv`, { params });
