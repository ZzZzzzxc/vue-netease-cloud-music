<template>
  <div class="album-list-wrap">
    <ul class="list-wrap">
      <li class="list-item" v-for="(item, index) in list" :key="index">
        <AlbumCard v-bind="formatData(item)" />
      </li>
    </ul>
  </div>
</template>

<script>
const OFFSETINITIAL = 0;
const TOTALINITIAL = -1;
import { getAlbumList } from "@/api";
import { AlbumCard } from "@/components";
export default {
  name: "album",
  components: { AlbumCard },
  props: {
    type: String,
    area: String
  },
  data() {
    return {
      list: [],
      pagation: {
        limit: 50,
        offset: OFFSETINITIAL
      },
      contentRef: null,
      total: TOTALINITIAL,
      loading: false,
      scrollToBottom: 0
    };
  },
  computed: {
    params() {
      return { ...this.pagation, type: this.type, area: this.area };
    }
  },
  watch: {
    type() {
      this.resetStatus();
    },
    params: {
      handler(params) {
        this.getList(params);
      },
      deep: true
    },
    scrollToBottom(val) {
      if (val < 500 && !this.loading) {
        this.pagation.offset++;
      }
    }
  },
  methods: {
    formatData(item) {
      return {
        alias: item.alias,
        imgUrl: item.picUrl,
        name: item.name,
        artistName: item.artists[0].name
      };
    },
    async getList(params) {
      if (this.total != this.list.length && !this.loading) {
        this.loading = true;
        const { albums, total } = await getAlbumList(params);
        this.total = total;
        this.list.push(...albums);
        this.loading = false;
      }
    },
    resetStatus() {
      this.list = [];
      this.pagation.offset = OFFSETINITIAL;
      this.total = TOTALINITIAL;
    },
    scrollAction() {
      let scrollTop = this.contentRef.scrollTop;
      let scrollHeight = this.contentRef.scrollHeight;
      let clientHeight = this.contentRef.clientHeight;
      // 滚动条距离底部的距离
      this.scrollToBottom = scrollHeight - scrollTop - clientHeight;
    }
  },
  created() {
    this.getList(this.params);
  },
  mounted() {
    this.contentRef = document.getElementById(`content_ref`);
    this.contentRef.addEventListener("scroll", this.scrollAction);
  },
  destroyed() {
    this.contentRef.removeEventListener("scroll", this.scrollAction);
  }
};
</script>

<style lang="scss" scoped>
.album-list-wrap {
  @include list(20%);
}
</style>
