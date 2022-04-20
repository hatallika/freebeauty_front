import Vue from 'vue'
import Vuex from 'vuex'

import masterSet from './masterSet'
import bookingSet from './bookingSet'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuth: false,
    selectData: '2022-04-25',
  },
  getters: {
    getAuth: state => state.isAuth,
    SELECTDATA: state => {
      return state.selectData
    }
  },
  mutations: {
    setAuth(state, bo) {
      state.isAuth = bo
    },
    SET_SELECTDATA: (state, payload) => {
      state.selectData = payload;
    }

  },
  actions: {
    // SET_SELECTDATA: (context, payload) => {
    // context.commit('SET_SELECTDATA', payload);
    // },
  },
  modules: {
    masterSet,
    bookingSet
  }
})
