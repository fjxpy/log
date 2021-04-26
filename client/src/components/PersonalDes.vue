<template>
  <div class="personal-des-container">
    <ul>
      <li
        class="item"
        v-for="item in contactArr"
        :key="item.type"
      >
        <MyIcon :type="item.type" />
        <span class="info">{{ item.info }}</span>
        <div
          class="img"
          v-if="item.img"
        >
          <img
            :src="item.img"
            alt=""
          >
          <span></span>
        </div>
      </li>
    </ul>
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
      contactArr: [
        {
          type: 'qq',
          info: '757230387',
          img: 'http://duyixpy.top/img/qqewm.jpg'
        },
        {
          type: 'weixin',
          info: '15659414657',
          img: 'http://duyixpy.top/img/wxewm.jpg'
        },
        {
          type: 'icon-email',
          info: '757230387@qq.com',
          img: ''
        }
      ]
    }
  }
}
</script>
<style scoped lang="scss">
@import "~@/style/color.scss";
.personal-des-container {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  // background-color: rgb(0, 21, 41);
  color: white;
  ul {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .item {
    display: flex;
    font-size: 14px;
    font-weight: 400;
    line-height: 36px;
    position: relative;
    cursor: pointer;
    margin-left: 2vw;
    .info {
      margin-left: 5px;
    }
    &:hover {
      color: $Primary;
      .img {
        transform: scaleY(1);
      }
    }
    .img {
      padding: 15px;
      width: 130px;
      position: absolute;
      top: -260px;
      left: -20px;
      background-color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
      transform: scaleY(0);
      transform-origin: bottom;
      transition: all 0.8s;
      z-index: 5;
      span {
        width: 12px;
        height: 12px;
        background-color: white;
        // border: 1px solid black;
        z-index: 2;
        position: absolute;
        bottom: -6px;
        transform: rotate(45deg);
      }

      img {
        width: 100%;
        height: 220px;
        object-fit: cover;
      }
    }
  }
}
</style>
