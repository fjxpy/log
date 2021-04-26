<template>
  <span
    class="top-container"
    @click="handleClick"
  >Top</span>
</template>
<script>
export default {
  created () {

  },
  methods: {
    handleClick () {
      this.$bus.$emit('scrolling', 0)
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/style/color.scss";
.top-container {
  position: absolute;
  bottom: 50px;
  right: 50px;
  height: 50px;
  width: 50px;
  line-height: 50px;
  border-radius: 50%;
  text-align: center;
  background-color: $Primary;
  color: white;
  cursor: pointer;
  &:hover {
    color: $Warning;
  }
}
</style>
