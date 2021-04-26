import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import('@/layout/Main.vue'),
    children: [
      {
        path: '/total',
        name: 'Total',
        component: () => import('@/layout/page/Page.vue')
      },
      {
        path: '/main',
        name: 'Page',
        component: () => import('@/layout/page/Page.vue')
      },
      {
        path: '/articlelist',
        name: 'Articlelist',
        component: () => import('@/layout/content/Article.vue')
      },
      {
        path: '/articlelist/add',
        name: 'CreateArticle',
        component: () => import('@/layout/content/CreateArticle.vue')
      },
      {
        path: '/articlelist/list',
        name: 'List',
        component: () => import('@/layout/content/ArticleInfo.vue')
      },
      {
        path: '/articlelist/list/cate/:id',
        name: 'ArtList',
        component: () => import('@/layout/content/ArticleInfo.vue')
      },
      {
        path: '/article/:id',
        name: 'Article',
        component: () => import('@/layout/content/BlogInfo.vue')
      },
      {
        path: '/taking',
        name: 'TakingAbout',
        component: () => import('@/layout/content/TakingAbout.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
