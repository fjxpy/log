<template>
  <div class="layout-container">
    <div class="left">
      <slot name="left" />
    </div>
    <div class="container">
      <slot />
    </div>
    <div class="right">
      <slot name="right" />
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style scoped lang="scss">
.layout-container {
  display: flex;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  .left {
    flex: 0 1 auto;
    height: 100%;
  }
  .container {
    flex: 1;
    height: 100%;
  }
  .right {
    flex: 0 1 auto;
    height: 100%;
  }
}
</style>
