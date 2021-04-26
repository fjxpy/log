<template>
  <div class="pager-container">
    <div
      class="btn-pre"
      v-if="nowPage!=1"
      @click="handleClick(nowPage-1)"
    >
      上一页
    </div>
    <ul class="page-list">
      <li
        class="page-item"
        v-for="item in (getMaxpage-getMinpage+1)"
        :key="item"
        :class="{active:getMinpage+item-1==nowPage}"
        @click="handleClick(getMinpage+item-1)"
      >
        <span>{{getMinpage+item-1}}</span>
      </li>
    </ul>
    <div
      class="btn-next"
      v-if="nowPage!=pageSize"
      @click="handleClick(nowPage+1)"
    >
      下一页
    </div>
  </div>
</template>
<script>
export default {
  props: {
    total: {
      type: Number,
      default: 0
    },
    limit: {
      type: Number,
      default: 10
    },
    nowPage: {
      type: Number,
      default: 1
    },
    visibleNumber: {
      type: Number,
      default: 10
    }
  },
  computed: {
    pageSize () {
      return Math.ceil(this.total / this.limit)
    },
    getMinpage () {
      const minPage = Math.floor(this.nowPage - this.visibleNumber / 2)
      return minPage > 0 ? minPage : 1
    },
    getMaxpage () {
      const maxPage = Math.ceil(this.getMinpage + this.visibleNumber)
      return maxPage > this.pageSize ? this.pageSize : maxPage
    }
  },
  methods: {
    handleClick (pageNum) {
      this.$emit('pageChange', pageNum)
    }
  }
}
</script>
<style scoped lang="scss">
@import "~@/style/color.scss";
.pager-container {
  display: inline-block;
  flex-wrap: nowrap;
  text-align: center;
  color: $Primary;
  .btn-pre,
  .btn-next {
    width: 100px;
    height: 36px;
    line-height: 36px;
    border-radius: 5px;
    background-color: white;
    cursor: pointer;
    display: inline-block;
    margin-left: 8px;
    user-select: none;
  }
  .page-list {
    display: inline-block;
  }
  .page-item {
    display: inline-block;
    line-height: 36px;
    height: 36px;
    width: 36px;
    background-color: white;
    border-radius: 8px;
    margin-left: 8px;
    cursor: pointer;
    user-select: none;
    &.active {
      background-color: $Primary;
      color: white;
    }
  }
}
</style>
