<template>
  <ul class="rank-list" :style="customStyle">
    <li class="banner" :style="{ backgroundImage: `url(${banner})` }"></li>
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
    <li class="bottom">查看全部</li>
  </ul>
</template>

<script>
export default {
  name: "RankList",
  props: {
    list: Array,
    banner: String, // 图片 url
    len: Number, // 长度
    customStyle: Object
  },
  data() {
    return {};
  },
  computed: {
    _list() {
      return this.list.slice(0, this.len);
    }
  }
};
</script>

<style lang="scss" scoped>
.rank-list {
  width: 250px;
  border: solid $grey 1px;
  .banner {
    width: 100%;
    height: 96px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
  }
  .item-wrapper {
    height: 30px;
    line-height: 30px;
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
  }
}
</style>
