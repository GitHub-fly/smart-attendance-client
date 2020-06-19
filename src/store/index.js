import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    clazzName: ''
  },
  mutations: {
    setClazzName(state, clazzName) {
      state.clazzName = clazzName
    }
  },
  actions: {},
  modules: {}
})
export default store
