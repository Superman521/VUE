import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/index.vue'
import Login from '../views/login'
import Homepage from '@/views/homepage'
import Article from '@/views/article'
import Publish from '@/views/publish'
// 加载 nprogress 中的指定的样式文件
// 注意:加载第三方包中的具体文件不需要写具体路径，直接写包名

import Nprogress from 'nprogress'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      {// 首页
        path: '',
        component: Homepage
      },
      {// 文章列表
        path: '/article',
        component: Article
      },
      {// 发布文章
        path: '/publish',
        component: Publish
      }
    ]
  },
  {
    // 一级路由
    path: '/login',
    component: Login
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

// 路由的拦截器 beforeEach 方法该方法收一个函数作为参数
// 参数1：to 表示区哪里的路由信息
// 参数2：from 百事来自哪里的路由细腻些
// 参数3：next 他是一个方法 用于路由放行
router.beforeEach((to, from, next) => {
  // 开启顶部导航进度条
  Nprogress.start()
  // console.log('所有页面的访问都要经过这里')

  // 如果访问的是登录页面，则额直接放行
  // 如果访问登录页面直接放行
  if (to.path === '/login') {
    next()
    return
  }

  // 非登录页面校验
  // 获取用户token
  const token = window.localStorage.getItem('user.token')
  // 判断是否有无tonken
  if (token) {
    next()
  } else {
    // 没有登录到指定页面
    next('/login')
    // 如果在非登录状态访问非登录页面，这里手动钟直进度条
    Nprogress.done()
  }
})
router.afterEach((to, from) => {
  // 结束顶部导航进度条
  Nprogress.done()
})
export default router
