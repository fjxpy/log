export default {
  methods: {
    pageChange (index) {
      this.$emit('pageChange', index)
    }
  },
  computed: {
    pager () {
      return {
        limit: this.limit,
        nowPage: this.nowPage,
        total: this.total
      }
    }
  },
  data () {
    return {
      total: 0,
      nowPage: 1,
      limit: 10
    }
  }
}
