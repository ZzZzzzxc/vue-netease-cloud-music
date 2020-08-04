<template>
  <div class="singer-page-wrap">
    <div>
      <TagList
        :active="true"
        :defaultActive="LANGUAGES[0]"
        :title="`语种：`"
        :tags="LANGUAGES"
        @tagChange="onLanguageTagChange"
      />
      <TagList
        :active="true"
        :defaultActive="SINGERTYPE[0]"
        :title="`分类：`"
        :tags="SINGERTYPE"
        @tagChange="onTypeTagChange"
      />
      <TagList
        :active="true"
        :defaultActive="INITIALS[1]"
        :title="`筛选：`"
        :tags="INITIALS"
        @tagChange="onInitialsTagChange"
      />
    </div>
    <ul class="list-wrap">
      <li class="list-item" v-for="(singer, index) in singerList" :key="index">
        <SingerCard
          :id="singer.id"
          :imgUrl="singer.picUrl"
          :name="singer.name"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { getArtistList } from "@/api";
import { INITIALS, SINGERTYPE, LANGUAGES } from "@/config";
import { TagList, SingerCard } from "@/components";
const OFFSET_VAL = 0;
export default {
  name: "Singer",
  components: { TagList, SingerCard },
  data() {
    return {
      INITIALS,
      SINGERTYPE,
      LANGUAGES,
      params: {
        limit: 50,
        offset: OFFSET_VAL,
        area: -1,
        type: -1,
        initial: "A"
      },
      singerList: [],
      scrollToBottom: 0,
      more: true,
      loading: false,
      contentRef: null
    };
  },
  computed: {},
  watch: {
    params: {
      handler(params) {
        this.initArtistList(params);
      },
      deep: true
    },
    scrollToBottom(val) {
      if (val < 500 && !this.loading) {
        this.params.offset++;
      }
    }
  },
  methods: {
    onLanguageTagChange(tag) {
      this.resetStatus();
      this.params.area = tag.value;
    },
    onTypeTagChange(tag) {
      this.resetStatus();
      this.params.type = tag.value;
    },
    onInitialsTagChange(tag) {
      this.resetStatus();
      this.params.initial = tag.value || tag.name;
    },
    async initArtistList(params) {
      if (this.more && !this.loading) {
        this.loading = true;
        const { artists, more } = await getArtistList(params);
        this.more = more;
        this.loading = false;
        this.singerList.push(...artists);
      }
    },
    resetStatus() {
      this.singerList = [];
      this.params.offset = OFFSET_VAL;
      this.more = true;
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
    this.initArtistList(this.params);
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
.singer-page-wrap {
  @include list(20%);
}
</style>
