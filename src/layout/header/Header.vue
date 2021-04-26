<template>
  <div class="my-header">
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="返回"
      @back="() => $router.go(-1)"
    >
      <div class="my-header-title">
        <h1>个人博客管理系统</h1>

      </div>
      <div class="my-header-avatar">
        <!-- 头像信息 -->
        <my-icon type="yonghuguanli" />
      </div>
      <div class="my-header-info">
        <span>
          登录信息: {{ username }}
        </span>
        <span>
          岗位信息: {{ station_no }}
        </span>
        <span>
          最近登录时间: {{ loggindate }}
        </span>
      </div>
      <template slot="extra">
        <a-button key="2">
          个人中心
        </a-button>
        <a-button
          key="1"
          type="primary"
          @click="handleLoginout"
        >
          退出
        </a-button>
      </template>

    </a-page-header>
  </div>
</template>
<script>
import MyIcon from '@/components/MyIcon'
import { mapState } from 'vuex'
export default {
  components: {
    MyIcon
  },
  computed: {
    ...mapState(['username', 'station_no', 'loggindate'])
  },
  created () {

  },
  methods: {
    handleLoginout () {
      sessionStorage.removeItem('userInfo')
      this.$store.dispatch('clearUserInfo')
      //
      this.$router.push({ name: 'Login' })
    }
  }

}

</script>
<style scoped lang="scss">
.my-header {
  width: 100%;
  height: 100%;
  position: relative;
  .ant-page-header {
    padding: 10px;
    height: 100%;
    box-sizing: border-box;
  }
  .my-header-title {
    text-align: center;
    font-size: 32px;
    font-weight: 700;
    line-height: 1.5;
    position: absolute;
    left: 50%;
    top: 20px;
    transform: translateX(-50%);
  }
  .my-header-info {
    margin-top: 20px;
    span {
      padding: 0 10px;
    }
  }
  .my-header-avatar {
    position: absolute;
    right: 180px;
    top: 10px;
    .iconfont {
      font-size: 25px;
      vertical-align: middle;
    }
  }
}
</style>
