export default {
  mounted () {
    // scollwrapper
    this.$bus.$on('scrolling', this.handlescroll)
    this.$refs.scollwrapper.addEventListener('scroll', this.scrollHandle)
  },
  beforeDestroy () {
    this.$refs.scollwrapper.removeEventListener('scroll', this.scrollHandle)
  },
  methods: {
    scrollHandle () {
      if (this.$refs.scollwrapper.scrollTop > 500) {
        this.show = true
      } else {
        this.show = false
      }
      if (
        this.$refs.scollwrapper.scrollHeight - 100 <
        this.$refs.scollwrapper.scrollTop + this.$refs.scollwrapper.clientHeight
      ) {
        this.$bus.$emit('getMore', this.$refs.scollwrapper)
      }
      //   this.$bus.$emit('scolling')
    },
    handlescroll (value) {
      // 通过触发该函数改变了元素的scrollTop值

      const ref = this.$refs.scollwrapper
      if (ref) {
        ref.scrollTop = value
      }
    }
  },
  data () {
    return {
      show: false
    }
  }
}
