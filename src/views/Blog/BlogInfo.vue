<template>
  <div
    class="blog-info-contaier"
    ref="scollwrapper"
  >
    <div class="info">
      <div class="title">
        <h2>{{articleInfo.title}}
          <p class="subtitle">{{articleInfo.subtitle}}</p>
        </h2>
        <MyIcon
          class="loves"
          type="xihuan"
          :class="{active:active}"
          @click.native="active=!active"
        />
      </div>
      <div class="blog-des">
        日期: <span>{{articleInfo.when_logged}}</span>
        浏览:<span> {{articleInfo.read_zs}}</span>
        评论: <span>{{articleInfo.comment_zs}}</span>
        分类: <span>{{ articleInfo.classify}}</span>
      </div>
      <div
        class="blog-detail markdown-body"
        v-html="articleInfo.content"
      >
      </div>
    </div>
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
import MyIcon from '@/components/MyIcon'
import Message from '@/components/Message'
import MyTop from '@/components/MyTop'
import CommentList from '@/components/CommentList'
import mixins from '@/mixins/scroll'
import { getNowTime } from '@/utlis/utils'

export default {
  mixins: [mixins],
  components: {
    MyIcon, Message, CommentList, MyTop
  },
  data () {
    return {
      articleInfo: {},
      active: false,
      artID: 0,
      comments: {
        title: '评论列表',
        subtitle: 25,
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
      axios.get('/comment/' + this.artID, {
        params: {
          limit: this.limit,
          page: this.nowPage
        }
      }).then(res => {
        this.comments.data = this.comments.data.concat(res.data.data)
        this.isLoading = false
      })
    },
    getBlogById (articleId) {
      axios.get('/article/query/' + articleId).then(res => {
        this.articleInfo = res.data.data
      })
    },
    addReadById (articleId) {
      axios.get('/article/read/' + articleId).then(res => {
        this.getBlogById(articleId)
      })
    },
    handlesubmit (config, callback) {
      const info = {
        article_id: this.artID,
        content: config.content,
        who_logged: config.name,
        url: config.avatar
      }
      axios.post('/comment', info).then(res => {
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
      axios.get('/comment/getCnt/' + this.artID).then(res => {
        this.comments.subtitle = res.data.data.zs
      })

      axios.get('/comment/' + this.artID, {
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
        const articleId = this.$route.params.id
        this.artID = articleId
        // 记录路由访问记录
        this.addReadById(articleId)
        this.getCommentsById()
        // this.getBlogById(articleId)
      },
      immediate: true
    }

  }
}
</script>
<style scoped lang="scss">
@import "~@/style/markdown.scss";
.blog-info-contaier {
  height: calc(100vh - 110px);
  padding: 20px;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  scroll-behavior: smooth;

  .title {
    position: relative;
    cursor: pointer;
    h2 {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 15px;
    }
    .subtitle {
      display: inline-block;
      font-size: 18px;
      font-weight: 600;
      margin: 10px 20px;
      text-indent: 2em;
    }
  }
  .blog-des {
    color: #b4b8bc;
    font-size: 12px;
    span {
      padding-right: 15px;
      padding-left: 5px;
    }
  }

  .loves {
    position: absolute;
    // color: #f40;
    font-size: 35px;
    left: 400px;
    top: 40px;
    cursor: pointer;
    &.active {
      color: #f40;
    }
  }
  .blog-detail {
    margin-top: 40px;
  }
  .last-data {
    width: 100%;
    text-align: center;
  }
  .comment{
    margin-top: 25px;
  }
}
</style>
