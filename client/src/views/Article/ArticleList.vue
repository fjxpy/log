<template>
  <!-- 该组件只进行渲染操作 不进行数据操作 -->
  <div class="article-list-container">
    <ul
      class="article-list"
      ref="scollwrapper"
    >
      <li
        v-for="item in arrList"
        :key="item.id"
        class="article-item"
        @click="goArticle(item.id)"
      >
        <ArticleItem v-bind="item" />
      </li>
      <div class="pager">
        <Pager
          v-bind="pager"
          @pageChange="pageChange"
        />
      </div>
    </ul>
    <MyTop v-if="show" />

  </div>
</template>
<script>
import Pager from '@/components/Pager'
import ArticleItem from '@/views/Article/ArticleItem'
import MyTop from '@/components/MyTop'
import mixins from '@/mixins/scroll'
export default {
  mixins: [mixins],
  components: {
    Pager,
    ArticleItem,
    MyTop
  },
  props: ['pager', 'arrList'],
  methods: {
    pageChange (index) {
      this.$emit('pageChange', index)
    },
    goArticle (id) {
      this.$router.push({ name: 'Blog', params: { id } })
    }

  }
}
</script>
<style scoped lang="scss">
.article-list-container {
  height: calc(100vh - 60px);
  .article-list {
    height: 100%;
    padding: 0 5%;
    overflow-x: hidden;
    overflow-y: auto;
    scroll-behavior: smooth;
  }
  .pager {
    margin-top: 30px;
    margin-bottom: 20px;
    text-align: center;
  }
  .article-item {
    padding: 0 20px;
  }
}
</style>
