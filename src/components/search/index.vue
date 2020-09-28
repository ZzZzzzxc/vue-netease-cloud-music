<template>
  <div class="search-wrap">
    <Popover trigger="click" :placement="`bottom`">
      <Zinput
        :size="`sm`"
        :borderRadius="`16px`"
        :placeholder="`搜索音乐、视频、歌词`"
      >
        <template slot="suffix">
          <div class="handle">
            <img :src="require(`@/assets/icon/search.png`)" />
          </div>
        </template>
      </Zinput>
      <template slot="content">
        <div class="data-list">
          <div class="history-list-wrap">
            <div class="title">搜索历史</div>
          </div>
          <div class="hot-list-wrap">
            <div class="title">热搜榜</div>
            <ul class="list"></ul>
          </div>
        </div>
      </template>
    </Popover>
  </div>
</template>

<script>
import { Zinput, Popover } from "@/base";
export default {
  name: "Search",
  components: { Zinput, Popover },
};
</script>

<style lang="scss" scoped>
.search-wrap {
  width: 240px;
  .handle {
    display: flex;
    align-items: center;
    height: 100%;
    width: 40px;
    transition: 0.3s;
    opacity: 0.7;
    img {
      width: 16px;
      height: 16px;
    }
  }
  &:hover {
    .handle {
      opacity: 1;
    }
  }
}
.data-list {
  width: 320px;
  max-height: 460px;
  background-color: $white;
  overflow-y: auto;
  padding: 0 16px;
  .history-list-wrap {
  }
  .hot-list-wrap {
  }
}
</style>
