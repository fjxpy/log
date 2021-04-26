<template>
  <div
    class="carousel-container"
    ref="wrapper"
    @mousemove="handleMvoe"
  >
    <!-- 图片信息 -->
    <img
      class="img"
      :src="url"
      alt=""
      :style="transformData"
    >
    <div class="img-info">
      <h2
        class="keywords"
        ref="keywords"
        @transitionend="handledes"
      >{{ keywords}}</h2>
      <p
        class="des"
        ref="des"
      >{{des}}</p>

    </div>
  </div>
</template>
<script>
export default {
  props: ['url', 'keywords', 'des'],
  data () {
    return {
      keywordsWidth: 0,
      desWidth: 0,
      wrapperWidth: 0,
      wrapperHeight: 0,
      moveLeft: 0,
      moveTop: 0
    }
  },
  computed: {
    maxX () {
      return Math.floor(this.wrapperWidth * 0.1)
    },
    maxY () {
      return Math.floor(this.wrapperHeight * 0.1)
    },
    transformData () {
      const result = `transform: translate(${this.moveLeft}px,${this.moveTop}px)`
      return result
    }

  },
  mounted () {
    // 获取外层容器的宽高
    this.keywordsWidth = this.$refs.keywords.clientWidth
    this.desWidth = this.$refs.des.clientWidth
    this.$refs.keywords.style.width = 0
    this.$refs.des.style.width = 0
    // 页面强制刷新
    console.log(this.$refs.keywords.clientWidth)
    this.wrapperWidth = this.$refs.wrapper.clientWidth
    setTimeout(() => {
      this.wrapperHeight = this.$refs.wrapper.clientHeight
    }, 0)

    this.$refs.keywords.style.width = this.keywordsWidth + 'px'
  },
  methods: {
    handledes () {
      this.$refs.des.style.width = this.desWidth + 'px'
    },
    handleMvoe (e) {
      const style = this.$refs.wrapper.getBoundingClientRect()
      const mouseX = e.clientX - style.x
      const mouseY = e.clientY - style.y
      this.moveLeft = -(mouseX / this.wrapperWidth) * this.maxX
      this.moveTop = -(mouseY / this.wrapperHeight) * this.maxY
    }

  }
}
</script>
<style scoped lang="scss">
.carousel-container {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: white;
  overflow: hidden;
  .img {
    width: 110%;
    height: 110%;
    object-fit: cover;
  }
  .img-info {
    position: absolute;
    top: 50%;
    left: 20px;
    color: white;
    transform: translateY(-50%);
    white-space: nowrap;
    .keywords {
      font-size: 2rem;
      display: inline-block;
      color: white;
      letter-spacing: 2rem;
      transition: all 2s;
      text-shadow: 0 -1px 2px #000, 0 1px 2px #000, 1px 0 2px #000,
        -1px 0 2px #000;
      margin-bottom: 20px;
      overflow: hidden;
      cursor: pointer;
    }
    .des {
      font-size: 1rem;
      color: white;
      transition: all 2s;
      text-shadow: 0 -1px 2px #000, 0 1px 2px #000, 1px 0 2px #000,
        -1px 0 2px #000;
      margin-bottom: 20px;
      overflow: hidden;
      cursor: pointer;
    }
  }
}
</style>
