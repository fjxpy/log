<template>
  <div class="home">
    <Layout>
      <template #left>
        <div class="left">
          左边内容
        </div>
      </template>
      <template>
        文章内容
        <!-- 分页组件 -->
        <div class="pager">
          <Pager
            v-bind="pager"
            @pageChange="handleChane"

          />
          <MyIcon v-if="false" type="qq" />
          <Avatar v-if="false" src="http://duyixpy.top/img/avatar4.jpg" />
          <Message style="margin-top:50px" />
          <CommentList :data="data" title="评论列表" subtitle="20" style="margin-top:50px" />
        </div>
      </template>
      <template #right>
        <div class="right">右边内容</div>
      </template>
    </Layout>
  </div>
</template>
<script>
import Layout from '@/components/Layout'
import Pager from '@/components/Pager'
import MyIcon from '@/components/MyIcon'
import Avatar from '@/components/MyAvatar'
import CommentList from '@/components/CommentList'
import Message from '@/components/Message'
import axios from '@/axios'
export default {
  components: {
    Layout, Pager, MyIcon, Avatar, CommentList, Message
  },
  data () {
    return {
      pager: {
        nowPage: 1,
        limit: 10,
        total: 200
      },
      data: []
    }
  },
  methods: {
    handleChane (item) {
      this.pager.nowPage = item
    }
  },
  created () {
    axios.get('http://duyixpy.top:12345/api/comment/1').then((res) => {
      this.data = res.data.data
    })
  }
}
</script>
<style scoped lang="scss">
.home {
  height: 100vh;
}
.left {
  width: 200px;
}
.right {
  width: 250px;
}

</style>
