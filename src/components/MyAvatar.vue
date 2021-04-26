<template>
  <div class="my-avatar-container">
    <div
      class="wrapper"
      :style="{width,height}"
    >
      <img
        :src="src"
        alt=""
      >
    </div>
  </div>
</template>
<script>
export default {
  props: {
    src: {
      type: String,
      require: true
    },
    size: {
      type: Number,
      default: 44
    }
  },
  data () {
    return {
      width: this.size + 'px',
      height: this.size + 'px'
    }
  }
}
</script>
<style scoped lang="scss">
.my-avatar-container {
  display: inline-block;
  .wrapper {
    text-align: center;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }
  }
}
</style>
