import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'ant-design-vue/dist/antd.css'
// import './style/color.scss'
import './style/reset.css'
import Antd from 'ant-design-vue'
import getTip from './utlis/getTip/index'
// import loadding from '@/directive/loadding'
// 导入事件总线
import './eventBus'

Vue.use(Antd)
Vue.config.productionTip = false
getTip(Vue)
// Vue.directive('loadding', loadding)
const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
if (userInfo) {
  store.dispatch('setUsernameInfo', userInfo)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
