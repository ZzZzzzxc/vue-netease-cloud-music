<template>
  <div>
    <Popover trigger="click" placement="bottom">
      <template slot="content">
        <ul class="list">
          <li class="item" v-for="item in themeConfig" :key="item.title">
            <div class="item-footer">{{ item.title }}</div>
          </li>
        </ul>
      </template>
      <div class="btn">
        <img class="icon" :src="require(`@/assets/icon/skin.png`)" alt="" />
      </div>
    </Popover>
  </div>
</template>

<script>
import { Popover } from "@/base";
import themeConfig from "./themeConfig";
export default {
  name: "User",
  data() {
    return {
      themeConfig
    };
  },
  components: { Popover }
};
</script>

<style lang="scss" scoped>
.btn {
  height: $header-height;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: $theme-color-dark;
  }
  .icon {
    width: 24px;
    height: 24px;
  }
}
.list {
  width: 200px;
  .item {
    .item-footer {
    }
  }
}
</style>
