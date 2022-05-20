import axios from "@/api/axios";
const state = {
  userInfo: { name: "", lastName: "", patronymic: "", profession: "" },
  serviceArr: [
    {
      title: "",
      timeLimit: 60,
    },
    {
      title: "Удаление тату. Малый размер",
      timeLimit: 30,
    },
    {
      title: "Удаление тату. Большой размер",
      timeLimit: 60,
    },
    {
      title: "Сеанс-тату. Малый размер",
      timeLimit: 30,
    },
    {
      title: "Сеанс-тату. Средний размер",
      timeLimit: 30,
    },
    {
      title: "Сеанс-тату. Большой размер",
      timeLimit: 60,
    },
  ],
  timeLimits: [15, 30, 45, 60],
  workTime: {
      from: '10:00',
      to: '20:00',
  },
  workTimeList:[],
};

const getters = {
    getUserInfo: state => state.userInfo,
    getServiceArr: state => state.serviceArr,
    getTimeLimits: state => state.timeLimits,
    getWorkTime: state => state.workTime,
    getWorkTimeList: state => state.workTimeList
};

const mutations = {
    setUserInfo: (state, array_UserInfo) => {
        state.userInfo = array_UserInfo;
    },

    setWorkTimeList(state, array) {
        state.workTimeList = array
    }
};

const actions = {
    getUserInfoFromBase({commit}){
        axios.get('/sanctum/csrf-cookie').then(() => {
            axios.get('/api/user').then(res => {
                console.log(res.data.user);
                //this.$store.commit('SET_MASTER', res.data.user);
                //this.userInfo = res.data.user;
                commit('setUserInfo', res.data.user)
            })
        });
    }
};

export default {
  state,
  mutations,
  getters,
  actions,
};
