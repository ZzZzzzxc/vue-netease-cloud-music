<template>
  <transition name="song-detail-page">
    <div class="song-page-wrap" v-if="isDetailShow">
      <div class="song-wrap">
        <div class="left"></div>
        <div class="right"></div>
      </div>
      <div class="bottom">
        <div class="comment-list-wrap">
          <div class="header-title">听友评论({{ total }})</div>
          <Loading :loading="commentLoading">
            <div class="title" v-show="current === 1">精彩评论</div>
            <ul class="comment-list" v-show="current === 1">
              <li
                class="comment-item"
                v-for="comment in comments"
                :key="comment.commentId"
              >
                <Comment v-bind="formatCommentData(comment)" />
              </li>
            </ul>
            <div class="title">最新评论({{ total }})</div>
            <ul class="comment-list">
              <li
                class="comment-item"
                v-for="comment in comments"
                :key="comment.commentId"
              >
                <Comment v-bind="formatCommentData(comment)" />
              </li>
            </ul>
            <Pagination v-model="current" :limit="limit" :total="total" />
          </Loading>
        </div>
        <div class="similar-list-wrap">
          <div class="title">相似歌单</div>
          <ul class="similar-list">
            <li
              v-for="playlist in simiPlaylist"
              :key="playlist.id"
              class="item"
              @click="toPlaylistDetail(playlist.id)"
            >
              <div class="img-wrap">
                <img v-lazy="getImgUrl(playlist.coverImgUrl, 50)" />
              </div>
              <div class="info-wrap">
                <p>{{ playlist.name }}</p>
                <p>播放：{{ formatNumber(playlist.playCount) }}</p>
              </div>
            </li>
          </ul>
          <div class="title">相似歌曲</div>
          <ul class="similar-list">
            <li
              v-for="song in simiSongs"
              :key="song.id"
              class="item"
              @click="handleAddToPlaylist(song)"
            >
              <div class="img-wrap">
                <img v-lazy="getImgUrl(song.album.picUrl, 50)" />
              </div>
              <div class="info-wrap">
                <p>
                  {{ song.name }}
                  <span v-if="song.alias[0]">（{{ song.alias[0] }}）</span>
                </p>
                <p>{{ getArtistisText(song.artists) }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import {
  musicMixin,
  formatDate,
  formatNumber,
  getImgUrl,
  getArtistisText,
  formatSong,
} from "@/utils";
import { Pagination, Loading } from "@/base";
import { Comment } from "@/components";
import { getMusicComment, getLyric, getSimiSong, getSimiPlaylist } from "@/api";
export default {
  name: "",
  mixins: [musicMixin],
  components: { Pagination, Comment, Loading },
  data() {
    return {
      limit: 20,
      current: 1,
      total: 0,
      hotComments: [],
      comments: [],
      commentLoading: false,
      simiSongs: [],
      simiPlaylist: [],
    };
  },
  computed: {
    offset() {
      return this.limit * (this.current - 1);
    },
    commentParams() {
      const { currentSong, limit, offset } = this;
      const { id } = currentSong;
      return {
        id,
        limit,
        offset,
      };
    },
  },
  watch: {
    currentSong(newSong) {
      this.current = 1;
      if (newSong.id) {
        this.updateComment();
        this.updateLyric();
        this.updateSimiSong();
        this.updateSimiPlaylist();
      } else {
        this.setDetailShow(false);
      }
    },
    $route() {
      this.setDetailShow(false);
    },
    current() {
      this.updateComment();
    },
  },
  methods: {
    formatNumber,
    getImgUrl,
    getArtistisText,
    toPlaylistDetail(id) {
      this.$router.push({ name: "SongListDetail", params: { id } });
    },
    handleAddToPlaylist(song) {
      this.addToPlaylist(
        formatSong({
          id: song.id,
          name: song.name,
          artists: song.artists,
          duration: song.duration,
          mvId: song.mvid,
          img: song.album.picUrl,
        })
      );
    },
    formatCommentData(comment) {
      const res = {
        avatar: comment.user.avatarUrl,
        name: comment.user.nickname,
        date: formatDate(comment.time),
        content: comment.content,
        count: comment.likedCount,
      };
      if (comment.beReplied.length) {
        res.replyName = comment.beReplied[0].user.nickname;
        res.replyContent = comment.beReplied[0].content;
      }
      return res;
    },
    async updateComment() {
      this.commentLoading = true;
      const { commentParams } = this;
      const { total, hotComments, comments } = await getMusicComment(
        commentParams
      );
      this.total = total;
      this.hotComments = hotComments;
      this.comments = comments;
      this.commentLoading = false;
    },
    async updateLyric() {
      const { id } = this.currentSong;
      await getLyric({ id });
    },
    async updateSimiSong() {
      const { id } = this.currentSong;
      const { songs } = await getSimiSong({ id });
      this.simiSongs = songs;
    },
    async updateSimiPlaylist() {
      const { id } = this.currentSong;
      const { playlists } = await getSimiPlaylist({ id });
      this.simiPlaylist = playlists;
    },
  },
};
</script>

<style lang="scss" scoped>
.song-page-wrap {
  position: fixed;
  top: 64px;
  bottom: 64px;
  left: 0;
  height: calc(100vh - 128px);
  width: 100%;
  z-index: $current-song-index;
  background-color: white;
  overflow-y: auto;
  .bottom {
    padding: 0 10%;
    display: flex;
    .comment-list-wrap {
      width: 70%;
      margin: 0 2%;
      font-size: $font-size-sm;
      color: $grey-dark;
      .header-title {
        color: $grey-dark;
        border-bottom: solid 1px $grey-dark;
        line-height: 1.6;
        font-size: 18px;
        margin-bottom: 6px;
      }
      .title {
        padding: 6px 0;
      }
      .comment-list {
        margin-bottom: 24px;
        .comment-item {
          padding: 16px 0;
          border-bottom: solid $grey 1px;
        }
      }
    }
    .similar-list-wrap {
      width: 30%;
      padding-left: 10%;
      .title {
        color: $grey-dark;
        border-bottom: solid 1px $grey-dark;
        line-height: 1.6;
        font-size: 18px;
        margin-bottom: 6px;
      }
      .similar-list {
        margin-bottom: 60px;
        .item {
          height: 64px;
          width: 100%;
          display: flex;
          align-items: center;
          cursor: pointer;
          transition: 0.3s;
          .img-wrap {
            margin-right: 12px;
            width: 50px;
            height: 50px;
            flex-shrink: 0;
            flex-grow: 0;
            border: $white solid 1px;
            img {
              height: 100%;
              width: 100%;
            }
          }
          .info-wrap {
            overflow: hidden;
            p {
              @include text-ellipsis;
              font-size: $font-size-sm;
              line-height: 1.4;
              &:nth-child(2) {
                color: $grey-dark;
              }
            }
          }
          &:hover {
            background-color: $grey;
          }
        }
      }
    }
  }
}
</style>
