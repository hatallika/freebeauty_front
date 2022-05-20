import Vue from 'vue'
import Vuex from 'vuex'
//import Axios from 'axios';

import masterSet from './masterSet'
import bookingSet from './bookingSet'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuth: false,
  },
  getters: {
    getAuth: state => state.isAuth,
  },
  mutations: {
    setAuth(state, bo) {
      state.isAuth = bo
    } 
  },
  actions: {
  },
  modules: {
    masterSet,
    bookingSet
  }
})
