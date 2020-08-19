<template>
  <div class="albums-wrapper">
    <Card :shadow="`never`">
      <Loading :loading="loading">
        <ul class="list-wrap">
          <li class="list-item" v-for="alb in albums" :key="alb.id">
            <AlbumCard
              :imgUrl="alb.picUrl"
              :name="alb.name"
              :artistName="formatDate(alb.publishTime)"
              @click="handleGetSong(alb.id)"
            />
          </li>
        </ul>
      </Loading>
    </Card>
  </div>
</template>

<script>
import { Card, Loading } from "@/base";
import { AlbumCard } from "@/components";
import { formatDate, formatSong, musicMixin } from "@/utils";
import { getAlbumDetail } from "@/api";
export default {
  name: "SingerAlbums",
  mixins: [musicMixin],
  components: { AlbumCard, Card, Loading },
  props: ["albums", "loading"],
  methods: {
    formatDate,
    async handleGetSong(id) {
      this.setPlaylistLoading(true);
      const { songs } = await getAlbumDetail({ id });
      const playlist = [];
      songs.map(song => {
        playlist.push(
          formatSong({
            id: song.id,
            name: song.name,
            artists: song.ar,
            duration: song.dt,
            mvId: song.mv,
            img: song.al.picUrl,
            albumId: song.al.id,
            albumName: song.al.name
          })
        );
      });
      this.setPlaylist(playlist);
      this.setCurrentSong(playlist[0]);
      this.setPlaylistLoading(false);
    }
  }
};
</script>

<style lang="scss" scoped>
.albums-wrapper {
  @include list(14.2%);
}
</style>
