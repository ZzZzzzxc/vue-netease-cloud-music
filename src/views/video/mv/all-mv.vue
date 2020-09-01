<template>
  <div class="all-mv">
    <card>
      <template slot="header">
        <div>全部MV</div>
      </template>
      <tag-list
        :title="`地区：`"
        :tags="areaTags"
        :active="true"
        :defaultActive="areaActive"
        @tagChange="onAreaChange"
      ></tag-list>
      <tag-list
        :title="`类型：`"
        :tags="typeTags"
        :active="true"
        :defaultActive="typeActive"
        @tagChange="onTypeChange"
      ></tag-list>
      <tag-list
        :title="`排序：`"
        :tags="sortTags"
        :active="true"
        :defaultActive="sortActive"
        @tagChange="onSortChange"
      ></tag-list>
    </card>
    <loading :loading="loading">
      <ul class="list-wrap">
        <li
          class="list-item"
          @click="toDetail(mv.id)"
          v-for="mv in mvList"
          :key="mv.id"
        >
          <mv-card
            :imgUrl="mv.cover"
            :count="formatNumber(mv.playCount).toString()"
            :name="mv.name"
            :artistName="getArtistisText(mv.artists)"
          ></mv-card>
        </li>
        <div class="pagination-wrap">
          <pagination
            v-model="current"
            :limit="limit"
            :total="total"
          ></pagination>
        </div></ul
    ></loading>
  </div>
</template>

<script>
import { getAllMv } from "@/api";
import { areaTags, typeTags, sortTags } from "@/config";
import { Card, Pagination, Loading } from "@/base";
import { TagList, MvCard } from "@/components";
import { hasKey, formatNumber, getArtistisText } from "@/utils";
export default {
  name: "",
  components: { Card, TagList, Pagination, MvCard, Loading },
  data() {
    const areas = [{ name: "全部", value: "" }, ...areaTags];
    const types = [{ name: "全部", value: "" }, ...typeTags];
    return {
      areaTags: areas,
      typeTags: types,
      sortTags,
      areaActive: areaTags[0],
      typeActive: typeTags[0],
      sortActive: sortTags[0],
      current: 1,
      limit: 56,
      total: 0,
      mvList: [],
      loading: true,
      contentEl: null
    };
  },
  watch: {
    areaActive() {
      this.current = 1;
    },
    typeActive() {
      this.current = 1;
    },
    sortActive() {
      this.current = 1;
    },
    params() {
      this.mvList = [];
      this.getListData();
    }
  },
  computed: {
    params() {
      const { areaActive, typeActive, sortActive, limit, current } = this;
      return {
        area: this.getTagValue(areaActive),
        type: this.getTagValue(typeActive),
        order: this.getTagValue(sortActive),
        limit,
        offset: limit * (current - 1)
      };
    }
  },
  methods: {
    formatNumber,
    getArtistisText,
    onAreaChange(tag) {
      this.areaActive = tag;
    },
    onTypeChange(tag) {
      this.typeActive = tag;
    },
    onSortChange(tag) {
      this.sortActive = tag;
    },
    getTagValue(tag) {
      return hasKey(tag, "value") ? tag.value : tag.name;
    },
    async getListData() {
      this.contentEl &&
        this.contentEl.scrollTo({
          left: 0,
          top: 0,
          behavior: "smooth"
        });
      this.loading = true;
      const { params } = this;
      const { data, count } = await getAllMv(params);
      this.mvList = data;
      if (count) {
        this.total = count;
      }
      this.loading = false;
    },
    toDetail(id) {
      if (id) this.$router.push({ name: "Mv", params: { id } });
    }
  },
  created() {
    this.getListData();
  },
  mounted() {
    this.contentEl = document.getElementById("content__ref");
  }
};
</script>

<style lang="scss" scoped>
.all-mv {
  padding: 16px 0;
  @include list(25%);
  .list-wrap {
    margin: 32px 0;
    padding: 0 64px;
    .pagination-wrap {
      margin: 0 auto;
    }
  }
}
</style>
