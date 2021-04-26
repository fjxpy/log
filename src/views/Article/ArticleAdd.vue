<template>
  <div class="article-add-container">
    <div class="article-header">
      <h2 class="title">文章信息</h2>
      <div class="header-info">
        <div class="table-item">
          <label for="blog-title">标题</label>
          <input
            type="text"
            id="blog-title"
            placeholder=""
            v-model="title"
          >
          <div class="tip">{{titleErr}}</div>
        </div>
        <div class="table-item">
          <label for="blog-subtitle">副标题</label>
          <input
            type="text"
            id="blog-subtitle"
            placeholder=""
            v-model="subtitle"
          >
          <div class="tip">{{subtitleErr}}</div>
        </div>
        <div class="table-item">
          <label for="blog-classify">分类</label>
          <input
            type="text"
            id="blog-classify"
            placeholder=""
            v-model="classify"
          >
          <div class="tip">{{classifyErr}}</div>
        </div>
        <div class="table-item">
          <label for="blog-author">作者</label>
          <input
            type="text"
            id="blog-author"
            placeholder=""
            v-model="author"
          >
          <div class="tip">{{ authorErr}}</div>
        </div>
      </div>
    </div>

    <mavon-editor
      class="add-container"
      v-model="content"
      ref="md"
      @imgAdd="$imgAdd"
      @change="change"
    />
    <div class="submit">
      <a-button
        type="primary"
        @click="submit"
      >
        提交
      </a-button>

    </div>

  </div>
</template>
<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import axios from '@/axios/index.js'
import { mapState } from 'vuex'

export default {
  components: {
    mavonEditor
  },
  data () {
    return {
      content: '',
      html: '',
      configs: {},
      title: '',
      subtitle: '',
      classify: '',
      author: '',
      titleErr: '',
      subtitleErr: '',
      classifyErr: '',
      authorErr: ''

    }
  },
  computed: {
    ...mapState(['username'])
  },
  methods: {
    // 将图片上传到服务器，返回地址替换到md中
    $imgAdd (pos, $file) {
      const formdata = new FormData()
      formdata.append('imgFiles', $file)
      axios.post('/upload', formdata).then(res => {
        this.$refs.md.$img2Url(pos, res.data)
      })
    },
    // 所有操作都会被解析重新渲染
    change (value, render) {
      // render 为 markdown 解析后的结果[html]
      this.html = render
    },
    // 提交
    submit () {
      if (this.title === null || this.title === undefined) {
        this.titleErr = '标题不能为空'
      } else {
        this.titleErr = ''
      }

      if (this.subtitle === null || this.subtitle === undefined) {
        this.subtitleErr = '副标题不能为空'
      } else {
        this.subtitleErr = ''
      }

      if (this.classify === null || this.classify === undefined) {
        this.classifyErr = '分类不能为空'
      } else {
        this.classifyErr = ''
      }

      if (this.author === null || this.author === undefined) {
        this.authorErr = '作者不能为空'
      } else {
        this.authorErr = ''
      }
      // 错误情况下不让保存
      if (this.titleErr || this.subtitleErr || this.classifyErr || this.authorErr) {
        return
      }

      const sendDetail = {
        title: this.title,
        subtitle: this.subtitle,
        classify: this.classify,
        author: this.author,
        who_logged: this.username,
        content: this.html,
        content_info: this.content

      }
      axios.post('/article', sendDetail
      ).then(res => {
        if (res.data.code === 200) {
          this.$tip({ msg: '文章发布成功.!' })
          this.title = ''
          this.subtitle = ''
          this.classify = ''
          this.author = ''
          this.who_logged = ''
          this.content = ''
          this.html = ''
          this.content = ''
        }
      })
    }
  }

}
</script>
<style scoped lang="scss">
@import "~@/style/color.scss";
.article-add-container {
  width: 100%;
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
        width: 50%;
        height: 76px;
        padding: 10px 0;

        border: 1px solid black;
        box-sizing: border-box;
        position: relative;
        label {
          display: inline-block;
          width: 60px;
          text-align: right;
        }
        input {
          margin-left: 15px;
          // width: 200px;
          font-size: 14px;
          min-width: 300px;
          max-width: 80%;
          height: 36px;
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
  .v-note-wrapper {
    position: static;
    margin: 0 auto;
    width: 98%;
    min-height: 500px;
  }
  .submit {
    margin-top: 20px;
    width: 100%;
    text-align: center;
    margin-bottom: 20px;
  }
}
</style>
