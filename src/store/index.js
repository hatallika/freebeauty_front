import Vue from 'vue'
import Vuex from 'vuex'

import masterSet from './masterSet'
import bookingSet from './bookingSet'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuth: false,
    selectData: '2022-04-25',
    master: null,
  },
  getters: {
    getAuth: state => state.isAuth,
    SELECTDATA: state => {
      return state.selectData
    },
    MASTER: state => {
      return state.master
    },
  },
  mutations: {
    setAuth(state, bo) {
      state.isAuth = bo
    },
    SET_SELECTDATA: (state, payload) => {
      state.selectData = payload;
    },
    SET_MASTER: (state, payload) => {
      state.master = payload;
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
