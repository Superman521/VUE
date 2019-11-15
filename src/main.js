import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import axios from 'axios'
import 'nprogress/nprogress.css'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'// 设置常态地址
Vue.prototype.$axios = axios// 共享给所有实例使用
Vue.use(Element)// 注册整个得所有得elementUI组件 Vue.use 调用了elementUI里边的一个方法 install
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
