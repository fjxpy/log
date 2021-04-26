<template>
  <div
    class="blog-info-contaier"
    ref="scollwrapper"
  >
    <div class="comment">
      <Message @handlesubmit="handlesubmit" />
      <CommentList v-bind="comments" />
      <div
        v-if="nowPage===maxPage"
        class="last-data"
      >没有更多了~~O(∩_∩)O</div>
    </div>
    <MyTop v-if="show" />
  </div>
</template>
<script>
import axios from '@/axios/index'
import Message from '@/components/Message'
import MyTop from '@/components/MyTop'
import CommentList from '@/components/CommentList'
import mixins from '@/mixins/scroll'
import { getNowTime } from '@/utlis/utils'

export default {
  mixins: [mixins],
  components: {
    Message, CommentList, MyTop
  },
  data () {
    return {
      articleInfo: {},
      active: false,
      artID: 0,
      comments: {
        title: '留言列表',
        subtitle: 0,
        data: []
      },
      nowPage: 1,
      limit: 10,
      scrollHeight: 0,
      isLoading: false
    }
  },
  computed: {
    maxPage () {
      return Math.ceil(this.comments.subtitle / this.limit)
    }
  },
  created () {

  },
  mounted () {
    this.$bus.$on('getMore', this.getMoreDaTa)
  },
  methods: {
    getMoreDaTa () {
      // 页面正在加载或者页码大于等于最大页码的时候停止
      if (this.isLoading || this.nowPage >= this.maxPage) {
        return
      }
      this.isLoading = true
      this.nowPage = this.nowPage + 1
      axios.get('/message', {
        params: {
          limit: this.limit,
          page: this.nowPage
        }
      }).then(res => {
        this.comments.data = this.comments.data.concat(res.data.data)
        this.isLoading = false
      })
    },
    // getBlogById (articleId) {
    //   axios.get('/article/query/' + articleId).then(res => {
    //     this.articleInfo = res.data.data
    //   })
    // },
    handlesubmit (config, callback) {
      const info = {
        content: config.content,
        who_logged: config.name,
        url: config.avatar
      }
      axios.post('/message', info).then(res => {
        if (res.data.code === 200) {
          this.comments.subtitle += 1
          this.articleInfo.comment_zs += 1
          this.comments.data.unshift({
            ...info,
            when_logged: getNowTime()
          })
          callback && callback()
        }
      })
    },
    getCommentsById () {
      axios.get('/message/getCnt').then(res => {
        this.comments.subtitle = res.data.data.zs
      })

      axios.get('/message', {
        params: {
          limit: this.limit,
          page: this.nowPage
        }
      }).then(res => {
        this.comments.data = res.data.data
      })
    },
    scrollHandle () {
      if (this.$refs.scollwrapper.scrollTop > 500) {
        this.show = true
      } else {
        this.show = false
      }
      if (this.$refs.scollwrapper.scrollHeight - 100 < this.$refs.scollwrapper.scrollTop + this.$refs.scollwrapper.clientHeight) {
        this.$bus.$emit('getMore', this.$refs.scollwrapper)
      }
    }

  },
  // 监听一下路由的变化
  watch: {
    $route: {
      handler () {
        // 记录路由访问记录
        this.getCommentsById()
      },
      immediate: true
    }

  }
}
</script>
<style scoped lang="scss">
@import "~@/style/markdown.scss";
.blog-info-contaier {
  height: calc(100vh - 60px);
  padding: 20px 10%;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  scroll-behavior: smooth;

  .comment {
    margin-top: 25px;
  }
  .last-data{
    text-align: center;
  }
}
</style>
