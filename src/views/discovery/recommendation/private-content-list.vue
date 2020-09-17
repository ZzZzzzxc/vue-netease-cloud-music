<template>
  <loading :loading="loading">
    <ul class="list-wrap">
      <li
        @click="toDetail(content.id)"
        class="list-item"
        v-for="content in privatecontent"
        :key="content.id"
      >
        <private-content-card
          :imgUrl="content.picUrl"
          :footer="content.name"
        ></private-content-card>
      </li></ul
  ></loading>
</template>

<script>
import { getPersonalPrivatecontent } from "@/api";
import { PrivateContentCard } from "@/components";
import { Loading } from "@/base";
export default {
  name: "PrivateContentList",
  components: {
    PrivateContentCard,
    Loading
  },
  data() {
    return {
      privatecontent: [],
      loading: false
    };
  },
  methods: {
    async initPrivatecontent() {
      this.loading = true;
      const { result } = await getPersonalPrivatecontent();
      this.privatecontent = result;
      this.loading = false;
    },
    toDetail(id) {
      if (id) {
        this.$router.push({ name: "Mv", params: { id } });
      }
    }
  },
  created() {
    this.initPrivatecontent();
  }
};
</script>

<style lang="scss" scoped>
@include list(33.3%);
</style>
