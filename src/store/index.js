import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectData: '2022-04-25',
    master: null,
  },
  getters: {
    SELECTDATA: state => {
      return state.selectData
    },
    MASTER: state => {
      return state.master
    },
  },
  mutations: {
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
  }
})
