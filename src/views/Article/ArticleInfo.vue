<template>
  <div class="article-info-container">
    <Layout>
      <template #default>
        <ArticleList
          @pageChange="handleChange"
          :pager="pager"
          :arrList="ArtList"
        />
      </template>
      <template #right>
        <div class="right">
          <ArticleType
            :arrType="typeList"
            :total="total"
            @getActiveItem="getActiveItem"
          />
        </div>
      </template>
    </Layout>
  </div>
</template>
<script>
import Layout from '@/components/Layout'
import ArticleType from '@/views/Article/ArticleType'
import ArticleList from '@/views/Article/ArticleList'
import axios from '@/axios/index.js'

export default {
  components: {
    Layout,
    ArticleType,
    ArticleList

  },
  data () {
    //
    return {
      ArtList: [],
      typeList: [],
      limit: 10,
      nowPage: 1,
      total: 0,
      activeDate: ''
    }
  },
  computed: {
    // total () {
    //   return this.ArtList.length
    // },
    pager () {
      return {
        limit: this.limit,
        nowPage: this.nowPage,
        total: this.total
      }
    }

  },
  created () {
    // 获取文章类型
    axios.get('/article/getType').then(res => {
      this.typeList = res.data.data
    })
    // 获取文章总数

    this.getTotal()
    this.getRemoteData()
  },
  methods: {
    getTotal () {
      axios.get('/article/getCnt').then(res => {
        this.total = res.data.data
      })
    },
    handleChange (index) {
      this.nowPage = index
      this.getRemoteData()
      // 切换页面之后并且执行获取
    },
    getRemoteData () {
      axios.get('/article', {
        params: {
          limit: this.limit,
          page: this.nowPage,
          date: this.activeDate
        }

      }).then(res => {
        this.ArtList = res.data.data
      })
    },
    getActiveItem (id) {
      this.activeDate = ''
      this.typeList.map(ele => {
        if (ele.name === id) {
          // 切换的时候更改时间 和总数
          this.activeDate = id
          this.total = ele.zs
          this.$set(ele, 'active', 'active')
        } else {
          this.$set(ele, 'active', '')
        }
      })
      if (!this.activeDate) {
        this.getTotal()
      }

      this.getRemoteData()
    }

  }

}
</script>
<style scoped lang="scss">
.article-info-container {
  width: 100%;
  height: calc(100vh - 110px);
}
.right {
  width: 280px;
}
</style>
