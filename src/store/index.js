import Vue from 'vue'
import Vuex from 'vuex'
//import Axios from 'axios';

import masterSet from './masterSet'
import bookingSet from './bookingSet'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuth: false,
    selectData: '2022-04-25',
    isWorkDay: false,
  },
  getters: {
    getIsWorkDate: state => state.isWorkDay,
    getAuth: state => state.isAuth,
    SELECTDATA: state => state.selectData,

  },
  mutations: {
    setAuth(state, bo) {
      state.isAuth = bo
    },
    SET_SELECTDATA: (state, payload) => {
      state.selectData = payload;
    },
  },
  actions: {
  },
  modules: {
    masterSet,
    bookingSet
  }
})
