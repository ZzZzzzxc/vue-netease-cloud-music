<template>
  <div class="btn">
    <img class="icon" :src="require(`@/assets/icon/user.png`)" alt="" />
  </div>
</template>

<script>
export default {
  name: "User"
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
</style>
