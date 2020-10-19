<template>
  <div class="search-wrap">
    <Popover
      :show="dataShow"
      trigger="manual"
      :placement="`bottom`"
      :popperStyle="popperStyle"
    >
      <Zinput
        :size="`sm`"
        :borderRadius="`16px`"
        :placeholder="showKeyword"
        v-model="keywords"
        @blur="handleBlur"
        @focus="handleFocus"
      >
        <template slot="suffix">
          <div class="handle" @click="handleSearch()">
            <img :src="require(`@/assets/icon/search.png`)" />
          </div>
        </template>
      </Zinput>
      <template slot="content">
        <div class="data-list">
          <div class="suggest-list" v-if="showSuggest">
            <div class="title">
              <span
                v-html="
                  brightenKeyword(`搜索“${keywords}”的相关结果>`, keywords)
                "
              ></span>
            </div>
            <ul class="detail-list" v-if="suggest.artists">
              <li class="title">歌手</li>
              <li
                class="list-item"
                v-for="art in suggest.artists"
                :key="art.id"
                @click="toDetail(`SingerDetail`, art.id)"
              >
                <span v-html="brightenKeyword(art.name, keywords)"></span>
              </li>
            </ul>
            <ul class="detail-list" v-if="suggest.albums">
              <li class="title">专辑</li>
              <li
                class="list-item"
                v-for="alb in suggest.albums"
                :key="alb.id"
                @click="toDetail(`AlbumDetail`, alb.id)"
              >
                <span
                  v-html="
                    brightenKeyword(`${alb.name}-${alb.artist.name}`, keywords)
                  "
                ></span>
              </li>
            </ul>
            <ul class="detail-list" v-if="suggest.playlists">
              <li class="title">歌单</li>
              <li
                class="list-item"
                v-for="list in suggest.playlists"
                :key="list.id"
                @click="toDetail(`SongListDetail`, list.id)"
              >
                <span v-html="brightenKeyword(list.name, keywords)"></span>
              </li>
            </ul>
            <ul class="detail-list" v-if="suggest.songs">
              <li class="title">单曲</li>
              <li
                class="list-item"
                v-for="song in suggest.songs"
                :key="song.id"
                @click="handleSetCurrentSong(song)"
              >
                <span v-html="brightenKeyword(song.name, keywords)"></span>
              </li>
            </ul>
          </div>
          <div class="local" v-else>
            <div class="history-list-wrap">
              <div class="title">搜索历史</div>
            </div>
            <div class="hot-list-wrap">
              <div class="title">热搜榜</div>
              <ul class="list">
                <li
                  class="list-item"
                  v-for="(item, idx) in hots"
                  :key="item.searchWord"
                  @click.stop="handleSearch(item.searchWord)"
                >
                  <div class="idx">{{ idx + 1 }}</div>
                  <div class="detail">
                    <div class="title">
                      {{ item.searchWord }}
                      <span class="score">({{ item.score }})</span>
                    </div>
                    <div class="content">
                      {{ item.content }}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </template>
    </Popover>
  </div>
</template>

<script>
const DEFAULT_KEY_WORD = "搜索音乐、视频、歌词";
import { getDefaultSearchWord, getSearchHot, getSearchSuggest } from "@/api";
import {
  getArtistisText,
  brightenKeyword,
  musicMixin,
  formatSong
} from "@/utils";
import { Zinput, Popover } from "@/base";
export default {
  name: "Search",
  mixins: [musicMixin],
  components: { Zinput, Popover },
  data() {
    return {
      realkeyword: "",
      keywords: "",
      showKeyword: DEFAULT_KEY_WORD,
      hots: [],
      popperStyle: {
        padding: 0
      },
      suggest: {},
      showSuggest: false,
      dataShow: false
    };
  },
  watch: {
    keywords(word) {
      if (word) {
        this.showSuggest = true;
        this.handleGetSuggest(word);
      } else {
        this.showSuggest = false;
        this.suggest = {};
      }
    }
  },
  methods: {
    getArtistisText,
    brightenKeyword,
    handleBlur() {
      this.dataShow = false;
    },
    handleFocus() {
      this.dataShow = true;
    },
    handleSetCurrentSong(song) {
      this.setCurrentSong(
        formatSong({
          id: song.id,
          name: song.name,
          artists: song.artists,
          duration: song.duration,
          mvId: song.mvid,
          img: song.album.picUrl,
          albumId: song.album.id
        })
      );
    },
    toDetail(name, id) {
      if (name) {
        this.$router.push({ name, params: { id } });
      }
    },
    async getHot() {
      const { data } = await getSearchHot();
      this.hots = data;
    },
    async getDefaultWord() {
      const {
        data: { showKeyword, realkeyword }
      } = await getDefaultSearchWord();
      this.showKeyword = showKeyword ? showKeyword : DEFAULT_KEY_WORD;
      this.realkeyword = realkeyword;
    },
    async handleGetSuggest(keywords) {
      const { result } = await getSearchSuggest({ keywords });
      this.suggest = result;
    },
    async handleSearch(words) {
      const { keywords, realkeyword } = this;
      let word = words || keywords || realkeyword;
      if (word !== "") {
        this.$router.push({
          name: "Search",
          params: { keywords: word }
        });
      }
      this.keywords = "";
    }
  },
  created() {
    this.getDefaultWord();
    this.getHot();
  }
};
</script>

<style lang="scss" scoped>
.search-wrap {
  .handle {
    display: flex;
    align-items: center;
    height: 100%;
    width: 30px;
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
  padding-top: 12px;
  .suggest-list {
    font-size: $font-size-sm;
    .title {
      font-size: $font-size;
      padding: 6px 3px;
    }
    .detail-list {
      .title {
        background-color: $grey-light;
        font-size: $font-size;
        padding: 6px 4px;
      }
      .list-item {
        padding: 6px 4px;
        cursor: pointer;
        transition: 0.3s;
        &:hover {
          background-color: $grey;
        }
      }
    }
  }
  .local {
    .history-list-wrap {
      margin-bottom: 16px;
      .title {
        padding-left: 6px;
      }
    }
    .hot-list-wrap {
      .title {
        padding-left: 6px;
      }
      .list {
        .list-item {
          padding: 3px 12px;
          display: flex;
          transition: 0.3s;
          cursor: pointer;
          align-items: center;
          &:hover {
            background-color: $grey;
          }
          .idx {
            width: 12%;
            font-size: 21px;
          }
          .detail {
            font-size: $font-size-sm;
            .title {
              padding: 4px 0;
              .score {
                color: $grey-dark;
              }
            }
            .content {
              color: $grey-dark;
              padding: 4px 0;
            }
          }
        }
      }
    }
  }
}
</style>
