import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectData: '2022-04-25',
  },
  getters: {
    SELECTDATA: state => {
      return state.selectData
    }
  },
  mutations: {
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
  }
})
