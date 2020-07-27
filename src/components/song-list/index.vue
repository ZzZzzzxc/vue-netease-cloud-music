<template>
  <div class="song-list">
    <div class="item" v-for="(item, index) in songList" :key="item.id">
      <div class="content">
        <div class="order">{{ index + 1 }}</div>
        <img class="img" :src="item.picUrl" />
        <div class="detail">
          <div class="song">{{ item.song.name }}</div>
          <div class="singer">
            <span v-for="artist in item.song.artists" :key="artist.id">
              {{ artist.name }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SongList",
  props: {
    songList: {
      default: () => [],
      type: Array,
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.song-list {
  width: 100%;
  border: 1px $grey solid;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  height: 322px;
  .item {
    width: 50%;
    height: 64px;
    &:nth-child(n) {
      border-right: 0.5px $grey solid;
    }
    &:nth-child(2) {
      background-color: $grey-light;
    }
    &:nth-child(4) {
      background-color: $grey-light;
    }
    &:nth-child(7) {
      background-color: $grey-light;
    }
    &:nth-child(9) {
      background-color: $grey-light;
    }
    &:hover {
      background-color: $grey;
    }
    .content {
      display: flex;
      padding: 10px 16px;
      font-weight: 100;
      justify-content: flex-start;
      align-items: center;
      height: 64px;
      font-size: $font-size-sm;
      .order {
        margin-right: 16px;
        width: 24px;
        color: $grey-dark;
      }
      .img {
        margin-right: 16px;
        height: 100%;
      }
      .detail {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        .song {
          height: 24px;
          line-height: 24px;
          width: 200px;
          @include text-ellipsis();
        }
        .singer {
          height: 24px;
          line-height: 24px;
          width: 200px;
          @include text-ellipsis();
        }
      }
    }
  }
}
</style>
