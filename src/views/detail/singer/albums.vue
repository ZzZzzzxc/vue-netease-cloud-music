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
import { formatDate } from "@/utils";
export default {
  name: "SingerAlbums",
  components: { AlbumCard, Card, Loading },
  props: ["albums", "loading"],
  methods: {
    formatDate
  }
};
</script>

<style lang="scss" scoped>
.albums-wrapper {
  @include list(14.2%);
}
</style>
