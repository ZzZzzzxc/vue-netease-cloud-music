<template>
  <div>
    <Popover trigger="click" placement="bottom">
      <template slot="content">
        <div class="tag-selection">
          <div
            class="tag-all"
            :class="[currentTag.name === all.name ? `active` : ``]"
            @click="selectTag(all)"
          >
            {{ all.name }}
          </div>
          <div class="wrapper" v-for="cat in catSelectionList" :key="cat.title">
            <div class="header">{{ cat.title }}</div>
            <div class="content">
              <div
                class="item"
                :class="[currentTag.name === item.name ? `active` : ``]"
                v-for="item in cat.list"
                :key="item.name"
                @click="selectTag(item)"
              >
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>
      </template>
      <div class="current-tag">{{ currentTag.name }}</div>
    </Popover>
    <div class="hot-tags">
      <div class="title">热门标签：</div>
      <ul class="list">
        <li
          class="item"
          v-for="tag in tags"
          :key="tag.name"
          @click="selectTag(tag)"
        >
          {{ tag.name }}
        </li>
      </ul>
    </div>
    <div class="card-list">
      <div class="item" v-for="card in playlists" :key="card.id">
        <SongSheetCard
          :count="formatNumber(card.playCount).toString()"
          :imgUrl="card.coverImgUrl"
          :author="card.creator.nickname"
          :footer="card.name"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getCatList, getHotCatList, getTopPlayList } from "@/api";
import { SongSheetCard } from "@/components";
import { formatNumber } from "@/utils";
import { Popover } from "@/base";
export default {
  name: "sheet",
  components: { SongSheetCard, Popover },
  data() {
    return {
      currentTag: {},
      all: {},
      /**
       * 0: "语种"
       * 1: "风格"
       * 2: "场景"
       * 3: "情感"
       * 4: "主题"
       */
      categories: {},
      sub: [],
      tags: [],
      playlists: [],
      pages: {
        limit: 50,
        offset: 0,
      },
      total: 0,
    };
  },
  computed: {
    catSelectionList() {
      const categories = Object.values(this.categories);
      const catSelectionList = [];
      for (let i = 0; i < categories.length; i++) {
        catSelectionList.push({
          title: categories[i],
          list: this.filterCatList(i),
        });
      }
      return catSelectionList;
    },
  },
  watch: {
    currentTag(tag) {
      const params = { order: "hot", cat: tag.name, ...this.pages };
      this.initPlayList(params);
    },
  },
  methods: {
    formatNumber,
    filterCatList(type = 0) {
      return this.sub.filter(item => item.category === type);
    },
    selectTag(tag) {
      this.currentTag = tag;
    },
    async initCatList() {
      const { sub, categories, all } = await getCatList();
      this.sub = sub;
      this.categories = categories;
      this.all = all;
      this.currentTag = all;
    },
    async initHotCatList() {
      const { tags } = await getHotCatList();
      this.tags = tags;
    },
    async initPlayList(params) {
      const { playlists } = await getTopPlayList(params);
      this.playlists = playlists;
    },
  },
  created() {
    this.initCatList();
    this.initHotCatList();
  },
};
</script>

<style lang="scss" scoped>
.tag-selection {
  height: 300px;
  overflow-y: scroll;

  .tag-all {
    width: 100%;
    border: solid 1px $grey;
    height: 36px;
    line-height: 36px;
    text-align: center;
    margin-bottom: 18px;
    cursor: pointer;
  }
  .active {
    border: solid 1px $theme-color;
  }
  .wrapper {
    margin-bottom: 18px;
    .header {
      height: 36px;
      line-height: 36px;
      font-weight: bold;
    }
    .content {
      display: flex;
      width: 300px;
      flex-wrap: wrap;
      font-size: $font-size-sm;
      .item {
        cursor: pointer;
        border: solid 1px $grey;
        width: 84px;
        height: 32px;
        line-height: 32px;
        text-align: center;
      }
      .active {
        border: solid 1px $theme-color;
      }
    }
  }
}
.current-tag {
  border: $grey 1px solid;
  padding: 12px 16px;
  font-size: $font-size-sm;
}
.hot-tags {
  display: flex;
  font-size: $font-size-sm;
  margin: 18px 0;
  .list {
    display: flex;
    .item {
      padding: 0 12px;
      cursor: pointer;
      &:not(:first-child) {
        border-left: 1px $grey solid;
      }
    }
  }
}
.card-list {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  .item {
    flex-grow: 1;
    margin: 0 20px 20px 0;
  }
}
</style>
