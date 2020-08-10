<template>
  <Loading :loading="loading">
    <ul class="list-wrap">
      <li class="list-item" v-for="content in privatecontent" :key="content.id">
        <PrivateContentCard :imgUrl="content.picUrl" :footer="content.name" />
      </li></ul
  ></Loading>
</template>

<script>
import { getPersonalPrivatecontent } from "@/api";
import { PrivateContentCard } from "@/components";
import { Loading } from "@/base";
export default {
  name: "PrivateContentList",
  components: {
    PrivateContentCard,
    Loading,
  },
  data() {
    return {
      privatecontent: [],
      loading: false,
    };
  },
  methods: {
    async initPrivatecontent() {
      this.loading = true;
      const { result } = await getPersonalPrivatecontent();
      this.privatecontent = result;
      this.loading = false;
    },
  },
  created() {
    this.initPrivatecontent();
  },
};
</script>

<style lang="scss" scoped>
@include list(33.3%);
</style>
