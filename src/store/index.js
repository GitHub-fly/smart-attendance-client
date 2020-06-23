import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    clazzName: '',
    teacherId: ''
  },
  mutations: {
    setClazzName(state, clazzName) {
      state.clazzName = clazzName
    },
    setTeacherId(state, teacherId) {
      state.teacherId = teacherId
    }
  },
  actions: {},
  modules: {}
})
export default store
