<template>
  <div>
    <Card :title="`官方榜`" :shadow="`never`">
      <div class="rank-list-wrapper">
        <RankList
          :list="flattenDeep(soar.tracks)"
          :banner="soar.coverImgUrl"
          :len="8"
          :customStyle="listStyle"
        />
        <RankList
          :list="flattenDeep(news.tracks)"
          :banner="news.coverImgUrl"
          :len="8"
          :customStyle="listStyle"
        />
        <RankList
          :list="flattenDeep(original.tracks)"
          :banner="original.coverImgUrl"
          :len="8"
          :customStyle="listStyle"
        />
        <RankList
          :list="flattenDeep(hot.tracks)"
          :banner="hot.coverImgUrl"
          :len="8"
          :customStyle="listStyle"
        />
        <RankList
          :list="flattenDeep(singer.tracks)"
          :banner="singer.coverUrl"
          :len="8"
          :customStyle="listStyle"
        />
      </div>
    </Card>
    <Card :title="`全球榜`" :shadow="`never`">
      <div class="song-sheet-list-wrapper">
        <div v-for="sheet in global" :key="sheet.id" class="song-sheet-wrapper">
          <SongSheetCard
            :count="formatNumber(sheet.playCount).toString()"
            :imgUrl="sheet.coverImgUrl"
            :footer="sheet.name"
          />
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import { getTopList, getPlayListDetail, getTopArtists } from "@/api";
import { SongSheetCard } from "@/components";
import { Card } from "@/base";
import RankList from "./list";
import { flattenDeep, formatNumber } from "@/utils";
export default {
  name: "Rank",
  components: { Card, RankList, SongSheetCard },
  data() {
    return {
      totalList: [], // 榜单集合
      soar: {}, // 飙升榜
      news: {}, // 新歌榜
      original: {}, // 原创榜
      hot: {}, // 热歌榜,
      singer: {}, // 歌手榜
      listStyle: {
        margin: "32px 32px 32px 0"
      }
    };
  },
  computed: {
    // 飙升榜 id
    soarId() {
      return this.totalList[0] && this.totalList[0].id;
    },
    // 新歌榜 id
    newsId() {
      return this.totalList[1] && this.totalList[1].id;
    },
    // 原创榜 id
    originalId() {
      return this.totalList[2] && this.totalList[2].id;
    },
    // 热歌榜 id
    hotId() {
      return this.totalList[3] && this.totalList[3].id;
    },
    // 全球榜
    global() {
      const { totalList } = this;
      return totalList.slice(4, totalList.length);
    }
  },
  watch: {
    async soarId(id) {
      const { playlist } = await getPlayListDetail({ id });
      this.soar = playlist;
    },
    async newsId(id) {
      const { playlist } = await getPlayListDetail({ id });
      this.news = playlist;
    },
    async originalId(id) {
      const { playlist } = await getPlayListDetail({ id });
      this.original = playlist;
    },
    async hotId(id) {
      const { playlist } = await getPlayListDetail({ id });
      this.hot = playlist;
    }
  },
  methods: {
    formatNumber,
    flattenDeep,
    async initTopList() {
      const { list, artistToplist } = await getTopList();
      this.totalList = list;
      this.singer = { ...this.singer, ...artistToplist };
    },
    async initSingerList() {
      const { artists } = await getTopArtists();
      this.$set(this.singer, "tracks", artists);
    }
  },
  created() {
    this.initTopList();
    this.initSingerList();
  }
};
</script>

<style lang="scss" scoped>
.song-sheet-list-wrapper {
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-wrap: wrap;
  .song-sheet-wrapper {
    margin: 12px 10px;
  }
}
.rank-list-wrapper {
  display: flex;
  justify-content: flex-start;
  width: 100%;
  flex-wrap: wrap;
}
</style>
