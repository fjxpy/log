<template>
  <div
    class="home-page-container"
    ref="wrapper"
    @wheel="handlewheel"
  >
    <ul
      class="img-list"
      @transitionend="runcallback"
      :style="{marginTop:scollTop}"
    >
      <li
        class="item"
        v-for="item in imgList"
        :key="item.id"
        :style="{height:clientHeight+'px'}"
      >
        <!-- {{item}} -->
        <Carousel v-bind="item" />
      </li>
    </ul>
    <div class="circle">
      <span
        v-for="(item,index) in imgList.length"
        :key="item.id"
        class="choose-item"
        :class="{active:index === activeItem }"
        @click="activeItem=index"
      ></span>

    </div>
    <div
      class="arrow-up"
      v-if="activeItem!=0"
      @click="activeItem--"
    >
      <MyIcon type="arrow-up" />
    </div>
    <div
      class="arrow-down"
      v-if="activeItem!=imgList.length-1"
      @click="activeItem++"
    >
      <MyIcon type="arrow-down-bold" />
    </div>
  </div>
</template>
<script>
import MyIcon from '@/components/MyIcon'
import Carousel from '@/components/Carousel'
export default {
  components: {
    MyIcon,
    Carousel
  },
  data () {
    return {
      clientHeight: 0,
      activeItem: 0,
      imgList: [
        {
          key: 0,
          url: 'http://duyixpy.top/img/bg3.jpg',
          keywords: '龙族',
          des: '爱欲之人犹如执炬逆风而行，必有灼手之患 --江南 《龙族》'
        },
        {
          key: 1,
          url: 'http://duyixpy.top/img/bg1.jpg',
          keywords: '龙族',
          des: '没有人逃得过悲伤，悲伤才是最大的魔鬼。 --江南 《龙族》'
        },
        {
          key: 2,
          url: 'http://duyixpy.top/img/bg2.jpg',
          keywords: '龙族',
          des: '可现在傻猴子要走了，她忽然觉得很害怕很害怕，原来跟傻猴子分开了，坐在荒原上嚎啕大哭的人并不是傻猴子，而是自己。——江南《龙族IV·奥丁之渊》'
        }
      ],
      isRunning: false,
      moveHeight: 90
    }
  },
  computed: {
    scollTop () {
      return -this.activeItem * this.clientHeight + 'px'
    }
  },
  mounted () {
    //   监听窗口大小改变函数
    window.addEventListener('resize', this.getComputedStyleByRef)
    this.getComputedStyleByRef()
  },
  created () {

  },
  methods: {
    getComputedStyleByRef () {
      this.clientHeight = this.$refs.wrapper.clientHeight
    },
    handlewheel (e) {
      // 运动过程中不进行多次
      if (this.isRunning) {
        return
      }
      if (e.deltaY > 10 && this.activeItem !== this.imgList.length - 1) {
        this.isRunning = true
        this.activeItem++
      } else if (e.deltaY < -50 && this.activeItem !== 0) {
        this.isRunning = true
        this.activeItem--
      }
    },
    runcallback () {
      this.isRunning = false
    }
  },
  destroyed () {
    //   组件销毁之后取消函数
    window.removeEventListener('resize', this.getComputedStyleByRef)
  }

}
</script>
<style scoped lang="scss">
@keyframes runup {
  0% {
    transform: translateY(-15px) translateX(-50%);
  }
  50% {
    transform: translateY(0px) translateX(-50%);
  }
  100% {
    transform: translateY(-15px) translateX(-50%);
  }
}

@keyframes rundown {
  0% {
    transform: translateY(15px) translateX(-50%);
  }
  50% {
    transform: translateY(0px) translateX(-50%);
  }
  100% {
    transform: translateY(15px) translateX(-50%);
  }
}

.home-page-container {
  width: 100%;
  height: 100%;
  border: 1px solid black;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;

  .arrow-up,
  .arrow-down {
    position: absolute;
    width: 40px;
    height: 40px;
    cursor: pointer;
    left: 50%;
    transform: translateX(-50%);

    .iconfont {
      font-size: 30px;
    }
  }
  .img-list {
    transition: all 0.8s;
  }

  .arrow-up {
    top: 20px;
    animation: ease runup 2s infinite;
  }

  .arrow-down {
    bottom: 20px;
    animation: ease rundown 2s infinite;
  }

  .img-list {
    background-color: white;
  }

  .circle {
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    .choose-item {
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: 1px solid black;
      margin-top: 8px;
      &.active {
        background-color: white;
      }
    }
  }
}
</style>
