<template>
  <div class="article-table-container">
    <div class="search-header">
      <div class="article-header">
        <h2 class="title">文章列表</h2>
        <div class="header-info">
          <div class="table-item">
            <label for="blog-title">标题</label>
            <input
              type="text"
              id="blog-title"
              placeholder=""
              v-model="title"
            >
          </div>
          <div class="table-item">
            <label for="blog-classify">分类</label>
            <input
              type="text"
              id="blog-classify"
              placeholder=""
              v-model="classify"
            >
          </div>
          <div class="table-item">
            <label for="blog-author">作者</label>
            <input
              type="text"
              id="blog-author"
              placeholder=""
              v-model="author"
            >
          </div>
          <div class="table-item">
            <label for="blog-begin">开始时间</label>
            <input
              type="date"
              id="blog-begin"
              v-model="beginDate"
            >
          </div>

          <div class="table-item">
            <label for="blog-end">结束时间</label>
            <input
              type="date"
              id="blog-end"
              v-model="endDate"
            >
          </div>
          <div class="table-item btns">
            <a-button
              class="btn"
              type="primary"
              @click="handleSearch"
            >
              查询
            </a-button>
            <a-button
              class="btn"
              type="primary"
            >
              重置
            </a-button>
          </div>
        </div>
      </div>
    </div>
    <div class="table">
      <TableList
        :dataTitle="dataTitle"
        :dataList="dataList"
        @edit="edit"
      />
    </div>
    <div class="footer">
      <Pager
        v-bind="pager"
        @pageChange="pageChange"
      />
    </div>
  </div>
</template>
<script>
import Pager from '@/components/Pager'
import TableList from '@/components/TableList'
import axios from '@/axios/index'
export default {
  components: {
    Pager,
    TableList
  },
  data () {
    return {
      title: '',
      classify: '',
      author: '',
      beginDate: '',
      endDate: '',
      total: 0,
      nowPage: 1,
      limit: 10,
      dataTitle: ['编号', '标题', '副标题', '分类', '阅读数', '评论数', '作者', '发布人', '发布时间', '操作列'],
      dataList: []
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
  created () {
    //   进行网络请求
    this.getArticle()
  },
  methods: {
    edit (item) {
      console.log(item)
    },
    getArticle () {
      // 根据条件获取全部文章数量
      /* http://localhost:12345/api/
      article/search?limit=10&page=1
      &classify=技术文档&author=许平源
      &beginDate=2021-01-05&endDate=2021-04-22 */
      axios.get('/article/search', {
        params: {
          limit: this.limit,
          page: this.nowPage,
          title: this.title,
          classify: this.classify,
          author: this.author,
          beginDate: this.beginDate,
          endDate: this.endDate
        }
      }).then(res => {
        this.total = res.data.data.total
        this.dataList = res.data.data.data
      })
    },
    handleSearch () {
      // 条件查询的时候要重置一下当前页码 回到第一页
      this.nowPage = 1
      this.getArticle()
    },
    pageChange (index) {
      this.nowPage = index
      this.getArticle()
    }

  }
}
</script>
<style scoped lang="scss">
@import "~@/style/color.scss";
.article-table-container {
  height: calc(100vh - 110px);
  overflow-x: hidden;
  overflow-y: auto;
  .article-header {
    width: 95%;
    min-width: 850px;
    border-radius: 10px;
    margin: 15px auto;
    background-color: white;
    // border: 1px solid black;
    .title {
      width: 100%;
      height: 36px;
      background-color: $Info;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      color: white;
      text-align: center;
      line-height: 36px;
      font-size: 18px;
      font-weight: 700;
      letter-spacing: 35px;
    }
    .header-info {
      display: flex;
      flex-wrap: wrap;
      .table-item {
        width: 33.33%;
        height: 40px;
        padding: 5px 0;
        box-sizing: border-box;
        position: relative;

        &.btns {
          text-align: center;
        }
        .btn {
          margin-left: 20px;
        }

        label {
          display: inline-block;
          width: 60px;
          text-align: right;
          font-size: 14px;
        }
        input {
          margin-left: 15px;
          // width: 200px;
          font-size: 14px;
          min-width: 200px;
          max-width: 80%;
          height: 30px;
          line-height: 34px;
          box-sizing: border-box;
          padding: 0 10px;
          border: 1px solid $Info;
          border-radius: 10px;
          outline: none;
          &:focus {
            border-color: $Border-focus;
          }
        }
        .tip {
          font-size: 12px;
          color: $Warning;
          margin-top: 5px;
          margin-left: 80px;
        }
      }
    }
  }

  .footer {
    margin-top: 20px;
    text-align: center;
    width: 100%;
  }
}
</style>
