<template>
  <transition name="fade">
    <Loading :loading="!list.length">
      <ul class="rank-list">
        <li class="img-wrap" @click="toDetail">
          <img v-lazy="getImgUrl(banner, 300, 100)" alt="" />
          <div class="play" @click.stop="handlePlay(list)" v-if="id">
            <img :src="require(`@/assets/icon/play-dark.png`)" />
          </div>
        </li>
        <li class="item-wrapper" v-for="(item, index) in _list" :key="index">
          <div class="item">
            <div class="left">
              <span class="index" :class="[index < 3 ? `active` : ``]">{{
                index + 1
              }}</span>
              <span class="name">{{ item.name }}</span>
            </div>
            <template v-if="item.ar">
              <div class="right">
                <span v-for="artist in item.ar" :key="artist.id">
                  {{ artist.name }}
                </span>
              </div>
            </template>
          </div>
        </li>
        <li class="bottom">
          <span @click="toDetail">查看全部</span>
        </li>
      </ul>
    </Loading>
  </transition>
</template>

<script>
import { Loading } from "@/base";
import { getImgUrl, musicMixin, formatSong } from "@/utils";
export default {
  name: "RankList",
  mixins: [musicMixin],
  components: { Loading },
  // 有 id 的为歌单榜，否则为歌手榜
  props: [`id`, `list`, `banner`, `len`],
  data() {
    return {};
  },
  computed: {
    _list() {
      return this.list.slice(0, this.len);
    },
  },
  methods: {
    getImgUrl,
    handlePlay(songs) {
      this.setPlaylistLoading(true);
      const playlist = [];
      songs.map(song => {
        playlist.push(
          formatSong({
            id: song.id,
            name: song.name,
            artists: song.ar,
            duration: song.dt,
            mvId: song.mv,
            img: song.al.picUrl,
            albumId: song.al.id,
            albumName: song.al.name,
          })
        );
      });
      this.setPlaylist(playlist);
      this.setCurrentSong(playlist[0]);
      this.setPlaylistLoading(false);
    },
    toDetail() {
      const { id } = this;
      id
        ? this.$router.push({ name: "SongListDetail", params: { id } })
        : this.$router.push({ name: "singerListDetail" });
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped>
.rank-list {
  width: 300px;
  min-height: 400px;
  border: solid $grey 1px;
  .img-wrap {
    width: 100%;
    height: 100px;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    img {
      @include abs-stretch;
      width: 100%;
      height: 100%;
    }
    .play {
      position: absolute;
      width: 48px;
      height: 48px;
      bottom: 6%;
      right: 6%;
      transition: cubic-bezier(0.165, 0.84, 0.44, 1) 0.4s;
      opacity: 0.8;
      cursor: pointer;
      &:hover {
        opacity: 1;
      }
    }
  }
  .item-wrapper {
    height: 34px;
    line-height: 34px;
    font-size: $font-size;
    &:hover {
      background-color: $grey;
    }
    &:nth-child(even) {
      .item {
        background-color: $grey-light;
      }
    }
    .active {
      color: $theme-color;
    }
    .item {
      display: flex;
      width: 100%;
      padding: 0 12px;
      .left {
        width: 66%;
        @include text-ellipsis();
        .index {
          margin-right: 12px;
          font-weight: bold;
        }
        .name {
        }
      }
      .right {
        text-align: right;
        width: 34%;
        @include text-ellipsis();
        color: $grey-dark;
      }
    }
  }
  .bottom {
    padding: 0 12px;
    text-align: right;
    height: 42px;
    line-height: 42px;
    color: $grey-dark;
    font-size: $font-size-lg;
    background-color: $grey-light;
    &:hover {
      background-color: $grey;
    }
    span {
      cursor: pointer;
    }
  }
}
</style>
