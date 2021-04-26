<template>
  <div class="article-item-wrapper">
    <div class="title">
      <h2>{{title}}</h2>
      <p class="subtitle">{{subtitle}}</p>
    </div>
    <div class="blog-des">
      日期: <span>{{when_logged}}</span>
      浏览:<span> {{read_zs}}</span>
      评论: <span>{{comment_zs}}</span>
      分类: <span>{{ classify}}</span>
    </div>
    <div
      class="blog-detail"
      :title="content_info"
      v-html="content_info"
    >

    </div>
  </div>

</template>
<script>
export default {
  props: ['author', 'classify', 'comment_zs', 'content', 'content_info', 'read_zs', 'subtitle', 'title', 'when_logged', 'who_logged', 'id']
}
</script>
<style scoped lang="scss">
.article-item-wrapper {
  padding: 20px 0 20px;
  width: 100%;
  border-bottom: 1px solid #b4b8bc;
  cursor: pointer;
  &:hover h2 {
    color: #6b9eee;
  }
  .blog-detail {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3; //行数
    -webkit-box-orient: vertical;
  }
  .title {
    h2 {
      font-size: 25px;
      margin-bottom: 15px;
    }
    .subtitle {
      font-size: 18px;
      font-weight: 600;
      margin: 10px 0px;
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
  .blog-detail {
    margin-top: 20px;
    text-indent: 1em;
    font-size: 14px;
  }
}
</style>
