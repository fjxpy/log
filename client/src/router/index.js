import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '../views/Login'
// import store from '../store'
// import axios from '../axios/index'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject)
  }
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@/views/Index.vue'),
    meta: {
      name: '登录'
    }
  },
  {
    path: '/a',
    name: 'Main',
    component: () => import('@/layout/main/Main.vue'),
    meta: {
      name: '登录'
    },
    children: [
      {
        path: '/article/articleinfo',
        name: 'ArticleInfo',
        component: () => import('@/views/Article/ArticleInfo.vue'),
        meta: {
          name: '文章信息'
        }
      },
      {
        path: '/blog/:id',
        name: 'Blog',
        component: () => import('@/views/Blog/BlogInfo.vue')
      },
      {
        path: '/message',
        name: 'Message',
        component: () => import('@/views/Message/Index.vue'),
        meta: {
          name: '文章信息'
        }
      }

    ]

  },
  {
    path: '/index',
    name: 'HomePage',
    component: () => import('@/layout/main/Homepage.vue'),
    meta: {
      name: '登录'
    }
  }

]
/*
const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: {
      name: '登录'
    }
  },
  {
    path: '/main',
    name: 'Main',
    meta: {
      needLogin: true,
      name: '首页'
    },
    component: () => import('@/layout/main/Main.vue'),
    children: [
      {
        path: '/total',
        name: 'Total',
        component: () => import('@/layout/main/Main.vue'),
        meta: {
          name: '统计'
        }
      },
      {
        path: '/main',
        name: 'Homepage',
        component: () => import('@/layout/main/Homepage.vue'),
        meta: {
          name: '主页'
        }
      },
      {
        path: '/article/articleinfo',
        name: 'ArticleInfo',
        component: () => import('@/views/Article/ArticleInfo.vue'),
        meta: {
          name: '文章信息'
        }
      },
      {
        path: '/article/articlelist',
        name: 'ArticleList',
        component: () => import('@/views/Article/ArticleTable.vue'),
        meta: {
          name: '文章信息'
        }
      },
      {
        path: '/article/add',
        name: 'ArticleAdd',
        component: () => import('@/views/Article/ArticleAdd.vue'),
        meta: {
          name: '新增文章'
        }
      },
      {
        path: '/blog/:id',
        name: 'Blog',
        component: () => import('@/views/Blog/BlogInfo.vue')
      }
    ]
  }
]
//

*/
/*
router.beforeEach((to, from, next) => {
  // 判断一下是否有登录信息
  const needLogin = Array.from(to.matched).some(ele => {
    return ele.meta.needLogin
  })
  if (needLogin) {
    // 校验是否需要登录
    const userno = store.state.userno

    if (!userno) {
      next({ name: 'Login' })
      return
    }
    // 日志记录
    axios.post('/log', {
      userno: store.state.userno,
      msg: `访问路径:${to.fullPath},访问hash:${
        to.hash
      },请求参数query:${JSON.stringify(
        to.query
      )},请求参数params:${JSON.stringify(to.params)}`,
      path: to.path,
      name: to.meta.name
    })
  }
  next()
})
*/

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router
