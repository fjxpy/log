<template>
  <div class="comment-list-container">
    <div class="title">
      <h2>{{title}} ( {{subtitle}} )</h2>
    </div>
    <div class="data-info">
      <ul class="comment-list">
        <li
          v-for="item in data"
          :key="item.id"
          class="comment-item"
        >
          <div class="left">
            <Avatar :src="item.url" />
          </div>
          <div class="right">
            <div class="right-header clearfix">
              <span class="who">{{item.who_logged}}</span>
              <span class="timer">{{item.when_logged}}</span>
            </div>
            <div class="right-content">
              {{item.content}}
            </div>
          </div>

        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Avatar from '@/components/MyAvatar'
export default {
  components: {
    Avatar
  },
  props: {
    title: {
      type: String,
      default: '评论列表'
    },
    subtitle: {
      default: '0'
    },
    data: {
      type: Array,
      default: () => []
    }
  }
}
</script>
<style scoped lang="scss">
@import "~@/style/color.scss";
.comment-list-container {
  padding: 20px;
  width: 100%;
  // border: 1px solid black;
  .title {
    text-align: left;
    h2 {
      font-weight: 700;
      font-size: 1.7rem;
    }
  }
  .comment-list {
    margin-top: 20px;
  }
  .comment-item {
    display: flex;
    padding: 25px 0;
    border-bottom: 1px solid $Border-Base;
    .right {
      padding: 0 20px;
      color: $Success;
      width: 100%;
      .who {
        float: left;
        line-height: 25px;
      }
      .timer {
        float: right;
        color: $Dark;
        font-size: 12px;
      }
      .right-content {
        margin-top: 10px;
        color: black;
        font-size: 14px;
        text-align: left;
      }
    }
  }
}
</style>
