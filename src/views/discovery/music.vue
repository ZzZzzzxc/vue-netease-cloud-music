<template>
  <div>
    <div class="header">
      <div
        class="item left"
        :class="[showTabLeft ? `active` : ``]"
        @click="onLeftClick"
      >
        新歌速递
      </div>
      <div
        class="item right"
        :class="[!showTabLeft ? `active` : ``]"
        @click="onRightClick"
      >
        新碟上架
      </div>
    </div>
    <div class="tabs-wrapper">
      <div class="tabs-extra" v-if="!showTabLeft">
        <div
          class="new"
          :class="[type === `new` ? `active` : ``]"
          @click="setNew"
        >
          推荐
        </div>
        <div
          class="hot"
          :class="[type === `hot` ? `active` : ``]"
          @click="setHot"
        >
          全部
        </div>
      </div>
      <Tabs v-model="activeName" :center="false" :activeColor="`#909399`">
        <TabsPane label="全部" name="1">
          <MusicList :type="0" v-if="showTabLeft" />
          <AlbumList v-else :type="type" :area="`ALL`" />
        </TabsPane>
        <TabsPane label="华语" name="2">
          <MusicList :type="7" v-if="showTabLeft" />
          <AlbumList v-else :type="type" :area="`ZH`" />
        </TabsPane>
        <TabsPane label="欧美" name="3">
          <MusicList :type="96" v-if="showTabLeft" />
          <AlbumList v-else :type="type" :area="`EA`" />
        </TabsPane>
        <TabsPane label="韩国" name="4">
          <MusicList :type="8" v-if="showTabLeft" />
          <AlbumList v-else :type="type" :area="`KR`" />
        </TabsPane>
        <TabsPane label="日本" name="5">
          <MusicList :type="16" v-if="showTabLeft" />
          <AlbumList v-else :type="type" :area="`JP`" />
        </TabsPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
import { Tabs, TabsPane } from "@/base/index";
import MusicList from "./music-list";
import AlbumList from "./album-list";
export default {
  name: "Music",
  components: { Tabs, TabsPane, MusicList, AlbumList },
  data() {
    return {
      activeName: "1",
      showTabLeft: true,
      type: "new"
    };
  },
  methods: {
    onLeftClick() {
      this.showTabLeft = true;
    },
    onRightClick() {
      this.showTabLeft = false;
    },
    setNew() {
      this.type = "new";
    },
    setHot() {
      this.type = "hot";
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: center;
  margin: 24px auto;
  font-size: $font-size-sm;
  .item {
    transition: 0.2s;
    cursor: pointer;
    height: 28px;
    line-height: 28px;
    max-width: 84px;
    text-align: center;
    width: 50%;
    color: $grey-dark;
    background-color: $white;
    border: 1px $grey-dark solid;
  }
  .left {
    border-radius: 6px 0 0 6px;
  }
  .right {
    border-radius: 0 6px 6px 0;
  }
  .active {
    color: $white;
    background-color: $grey-dark;
  }
}
.tabs-wrapper {
  .tabs-extra {
    display: flex;
    float: right;
    font-size: $font-size-sm;
    color: $grey-dark;
    width: 180px;
    height: 24px;
    line-height: 24px;
    text-align: right;
    cursor: pointer;
    .active {
      color: $black;
    }
    .new {
      margin: 0 12px;
    }
    .hot {
      margin: 0 12px;
    }
  }
}
</style>
