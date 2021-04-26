import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    station_no: '',
    loggindate: '',
    userno: ''
  },
  mutations: {
    setUsernameInfo (state, userInfo) {
      state.username = userInfo.username
      state.userno = userInfo.userno
      state.station_no = userInfo.station_no || '超级管理员'
      state.loggindate = userInfo.loggindate
    },
    clearUserInfo (state) {
      state.username = ''
      state.userno = ''
      state.station_no = ''
      state.loggindate = ''
    }
  },
  actions: {
    setUsernameInfo (context, userInfo) {
      context.commit('setUsernameInfo', userInfo)
    },
    clearUserInfo (context) {
      context.commit('clearUserInfo')
    }

  },
  modules: {
  }
})
