import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import httpAxios from './util/httpAxios.js'
import global from './util/Global.vue'
import dateTime from 'vue-date-time-m'

Vue.component('data-time', dateTime)

Vue.config.productionTip = false

Vue.prototype.httpAxios = httpAxios
Vue.prototype.GLOBAL = global

/**
 * 导航钩子，全局钩子
 */
// router.beforeEach((to, from, next) => {
//   console.log(to)

//   // 拿出本地存储中的数据，以此来判断用户是否处于登录状态
//   let isLogin = localStorage.getItem('user') !== null
//   console.log(isLogin)

//   if (!isLogin) {
//     if (to.path !== '/login') {
//       return next({ path: '/login' })
//     }
//   } else {
//     return next()
//   }
// })

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app')
