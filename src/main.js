import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import axios from 'axios'
import JSONbig from 'json-bigint'
import 'nprogress/nprogress.css'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'// 设置常态地址
axios.defaults.transformReponse = [function (data, headers) {
  // console.log('后端原始数据', data)

  // 把导致出错的代码放到try里边
  try {
    return JSONbig.parse(data)
  } catch (err) {
    console.log(err)
    return {

    }
  }
  // return JSONbig.parse(data)
}]
// axios请求拦截器
axios.interceptors.request.use(function (config) {
  console.log('请求拦截器', config)
  const token = window.localStorage.getItem('user.token')
  // 统一添加
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  // config.headers.Authorization = `Bearer${window.localStorage.getItem('user.token')}`
  // 通行得规则
  return config
}, function (error) {
  return Promise.reject(error)
})
// axios 响应拦截器
axios.interceptors.response.use(function (response) {
  console.log('响应拦截器')
  return response
}, function (error) {
  return Promise.reject(error)
})

Vue.prototype.$axios = axios// 共享给所有实例使用
Vue.use(Element)// 注册整个得所有得elementUI组件 Vue.use 调用了elementUI里边的一个方法 install
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
