<template>
  <div class="header clearfix">
    <router-link to="/">
      <h2 class="title">个人博客</h2>
    </router-link>

    <MyIcon
      type="xihuan"
      class="love"
      :class="enjoy"
      @click.native="loves"
      v-if="$route.meta.loves"
    />

    <div class="right">
      <router-link to="/about">
        <img
          src="../../assets/myphoto.jpg"
          alt=""
        >
      </router-link>
    </div>
  </div>
</template>
<script>
import MyIcon from '@/components/MyIcon'
export default {
  components: {
    MyIcon
  },
  data () {
    return {
      enjoy: ''
    }
  },
  methods: {

    loves () {
      if (this.enjoy) {
        this.$message('您已经喜欢过这篇文章啦~~')
        return
      }
      this.enjoy = 'loves'
      // 网络请求 新增loves 数
    }

  }

}
</script>
<style scoped lang="scss">
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
.right {
  float: right;
}
a {
  color: inherit;
}
.header {
  widows: 100%;
  height: 60px;
  border-bottom: 1px solid #ccc;
  box-shadow: 2px 2px 2px black;
  .title {
    font-size: 1.2rem;
    line-height: 60px;
    display: inline-block;
    box-sizing: border-box;
    margin: 0 0.5rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 2s linear;

    &:hover {
      font-size: 1.5rem;
      font-weight: normal;
      text-shadow: 5px 5px 5px black;
    }
  }
  .right {
    width: 40px;
    height: 40px;
    margin: 10px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .love {
    font-size: 1.5rem;
    margin-left: 0.2rem;
    line-height: 60px;
    cursor: pointer;

    &.loves {
      color: #f40;
    }
  }
}
</style>
