<template>
  <div class="article-type-container">
    <h2
      class="title"
      @click="handleActive()"
    >文章分类
      <span> {{total}}</span>
    </h2>
    <ul>

      <li
        class="item"
        v-for="(item,index) in arrType"
        :key="index"
        :class="{active:item.active}"
        @click="handleActive(item.name)"
      >
        <span class="item-name"> {{item.name}}</span>
        <span class="item-num">{{item.zs}}篇</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ['arrType', 'total'],
  methods: {
    handleActive (id) {
      this.$emit('getActiveItem', id)
    }
  }

}
</script>
<style scoped lang="scss">
@import "~@/style/color.scss";
.article-type-container {
  background-color: white;
  height: 100%;
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 15px;
  .title {
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    span {
      font-size: .5rem;
      font-weight: 700;
      margin-left: 5px;
    }
  }
  .item {
    margin-top: 1rem;
    padding: .2rem;
    cursor: pointer;
    &.active {
      color: $Danger;
    }
    .item-name {
      display: inline-block;
      min-width: 15vw;
      font-weight: 600;
      font-size: .8rem;
    }
    .item-num {
      margin-left: 5px;
      font-size: 0.8rem;
      color: #ccc;
    }
  }
}
</style>
