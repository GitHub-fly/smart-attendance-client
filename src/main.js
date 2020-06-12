import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import httpAxios from './util/httpAxios'
import global from './util/Global.vue'

Vue.config.productionTip = false

Vue.prototype.httpAxios = httpAxios
Vue.prototype.GLOBAL = global

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app')
