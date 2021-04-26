<template>
  <div class="menu">
    <a-menu
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
    >
      <a-sub-menu
        v-for="item in menuArr"
        :key="item.key"
      >
        <span slot="title">
          <my-icon :type="item.type" />
          <span> {{item.menu}}
          </span>
        </span>
        <component
          v-for="childitem in  item.children"
          :key="childitem.key"
          :is="childitem.children_len===0?'a-menu-item':'a-sub-menu'"
          :title="childitem.children===0?'':childitem.itemName"
          @click="changeRoute(childitem.router_name)"
        >
          <my-icon :type="childitem.type" />
          {{childitem.children_len===0?childitem.menu:'' }}
          <component
            v-for="childs in  childitem.children"
            :key="childs.key"
            :is="childs.children_len===0?'a-menu-item':'a-sub-menu'"
            :title="childs.children===0?'':childs.menu"
          >
            {{childs.children_len===0?childs.menu:'' }}
          </component>

        </component>

      </a-sub-menu>

    </a-menu>
    <div class="contact">
      <PersonalDes></PersonalDes>
    </div>
  </div>
</template>
<script>
import MyIcon from '@/components/MyIcon'
import PersonalDes from '@/components/PersonalDes'
import axios from '@/axios/index.js'

export default {
  components: {
    MyIcon,
    PersonalDes
  },
  data () {
    return {
      collapsed: false,
      menuArr: []
    }
  },
  created () {
    axios.get('menu').then(res => {
      /**
       * 数据处理 得到对应菜单数据
       * 返回数据不是自己想要的 需要自己调整
       *
       */
      const insData = res.data.data.rows
      const main = insData.filter((ele) => {
        return ele.level === 1
      })

      main.forEach((ele) => {
        ele.children = []
        insData.forEach((item) => {
          if (item.parent_id === ele.key) {
            ele.children.push(item)
          }
        })
      })

      this.menuArr = main
    })
  },
  methods: {
    toggleCollapsed () {
      this.collapsed = !this.collapsed
    },
    changeRoute (val) {
      // console.log(val)
      this.$router.push({ name: val })
    }

  }
}
</script>
<style scoped lang="scss">
.menu {
  width: 200px;
  height: 100vh;
  font-size: 16px;
  position: relative;
  .btn {
    position: absolute;
    left: 200px;
    top: 10px;
  }
  .ant-menu-root {
    height: calc(100vh - 150px);
    overflow-x: hidden;
    overflow-y: auto;
  }
}
.ant-menu {
  height: 100vh;
}

.contact {
  position: absolute;
  height: 150px;
  bottom: 10px;
  left: 0;
  width: 200px;
}
</style>
