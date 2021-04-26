<template>
  <div class="avatar-list-container">
    <ul class="list">
      <li
        class="item"
        v-for="item in 16"
        :key="item"
        @click="handleclick(item)"
      >
        <MyAvatar :src="`http://duyixpy.top/img/avatar${item}.jpg`" />
      </li>
    </ul>
  </div>
</template>
<script>
import MyAvatar from '@/components/MyAvatar'
export default {
  components: {
    MyAvatar
  },
  data () {
    return {

    }
  },
  methods: {
    handleclick (item) {
      this.$emit('chooseItem', item)
    }
  }
}
</script>
<style scoped lang="scss">
@import "~@/style/color.scss";
.avatar-list-container {
  .list {
    display: flex;
    flex-wrap: wrap;
    .item {
      width: 25%;
      height: 55px;
      text-align: center;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      &:hover {
        border-radius: 50%;
        border: 1px dashed $Border-focus;
      }
    }
  }
}
</style>
