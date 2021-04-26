<template>
  <div class="index-container">
    <div class="wrapper-info">
      <div class="title-des">
        <div class="des">
          <span> Xu</span>
          <span>Ping</span>
          <span>Yuan</span>
        </div>
      </div>
      <div class="circle">
        <div class="circle-item"></div>
        <div class="circle-item"></div>
        <div class="circle-item"></div>
        <div class="circle-item"></div>
      </div>
      <div class="nav">
        <router-link
          :to="{name:'HomePage'}"
          class="nav-item"
        >
          <MyIcon type="shouye">
            主页
          </MyIcon>
        </router-link>
        <router-link
          :to="{name:'ArticleInfo'}"
          class="nav-item"
        >
          <MyIcon type="ic_batch_default24px">
            列表
          </MyIcon>
        </router-link>
        <router-link
          to="/page"
          class="nav-item"
        >
          <MyIcon type="shenghuo">
            生活
          </MyIcon>
        </router-link>
        <router-link
          to="/page"
          class="nav-item"
        >
          <MyIcon type="xiangpian">
            相册
          </MyIcon>
        </router-link>
        <router-link
          :to="{name:'Message'}"
          class="nav-item"
        >
          <MyIcon type="liuyan">
            留言
          </MyIcon>
        </router-link>
        <router-link
          to="/page"
          class="nav-item"
        >
          <MyIcon type="guanyu">
            关于
          </MyIcon>
        </router-link>
        <router-link
          to="/page"
          class="nav-item"
        >
          <MyIcon type="denglu">
            登录
          </MyIcon>
        </router-link>
        <a
          class="nav-item"
          @click="goSystem"
        >
          <MyIcon type="xitongguanli">
            管理
          </MyIcon>
        </a>
      </div>
      <div class="contact">
        <PersonalDes />
      </div>
      <footer class="footer">
        闽ICP备2021000749号-1
      </footer>
    </div>
  </div>
</template>
<script>
import MyIcon from '@/components/MyIcon'
import PersonalDes from '@/components/PersonalDes'
export default {
  components: {
    MyIcon,
    PersonalDes
  },
  methods: {
    goSystem () {
      window.location.href = 'http://localhost:8081/'
    }
  }
}
</script>
<style scoped lang="scss">
@keyframes runName {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(0);
  }
  70% {
    transform: translateX(-50%);
  }
  90% {
    transform: translateX(-105%);
  }
  100% {
    transform: translateX(-105%);
  }
}

@keyframes borderrun {
  0% {
    border: 3px solid white;
  }
  12% {
    border-top-color: transparent;
  }
  25% {
    border-top-color: transparent;
    border-right-color: transparent;
  }
  37% {
    border-top-color: transparent;
    border-right-color: transparent;
    border-bottom-color: transparent;
  }
  50% {
    border-color: transparent;
  }
  100% {
    border-color: transparent;
  }
}

@keyframes runcircle {
  0% {
    transform: scale(0.5);
    opacity: 1;
  }

  45% {
    transform: scale(0.8);
    opacity: 0.7;
  }
  90% {
    transform: scale(1.2);
    opacity: 0;
  }
  100% {
    transform: scale(1.2);
    opacity: 0;
  }
}

.index-container {
  height: 100vh;
  width: 100vw;
  background: url("../assets/bg.jpg") center/cover;
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    color: #fff;
    margin: 2vh 1vw;
    display: inline-block;
    font-size: 16px;
    text-decoration: none;
    cursor: pointer;
  }
  .wrapper-info {
    width: 60%;
    height: 50%;
    min-height: 250px;
    // border: 1px solid black;
    text-align: center;
    .title-des {
      display: inline-block;
      margin-top: 20px;
      padding: 0.2rem;
      font-size: 2.3rem;
      line-height: 3rem;
      color: white;
      overflow: hidden;
      .des {
        padding: 0.2rem 1rem;
        box-sizing: border-box;
        border: 3px solid transparent;
        border-radius: 5px;
        animation: runName 4s linear infinite alternate,
          borderrun 4s linear infinite alternate;
      }
      span {
        margin-left: 5px;
      }
    }
    .circle {
      margin-top: 0.5rem;
      .circle-item {
        display: inline-block;
        width: 1rem;
        height: 1rem;
        margin: 0 0.3rem;
        border-radius: 50%;
        animation: runcircle 2s linear infinite;

        &:nth-of-type(1) {
          background-color: #ff4242;
          animation-delay: 0.1;
        }

        &:nth-of-type(2) {
          background-color: #72ff7d;
          animation-delay: 0.2;
        }
        &:nth-of-type(3) {
          background-color: #42e5ff;
          animation-delay: 0.3s;
        }

        &:nth-of-type(4) {
          background-color: #ffda72;
          animation-delay: 0.4s;
        }
      }
    }
  }
  .nav {
    margin: 20px auto 0;
    max-width: 50vw;
  }
  .footer {
    position: absolute;
    bottom: 4vh;
    left: 50%;
    color: white;
    letter-spacing: 3px;
    font-weight: 700;
    white-space: nowrap;
    transform: translateX(-50%);
  }
}
</style>
