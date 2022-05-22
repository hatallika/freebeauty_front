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
      date: '',
      from: '10:00',
      to: '20:00',
  },

  isWorkDay: false,
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
    },

    setWorkTime(state, array) {
        state.workTime = array
    }
};

const actions = {
    getUserInfoFromBase({commit}){
        axios.get('/sanctum/csrf-cookie').then(() => {
            axios.get('/api/user').then(res => {
                console.log(res.data.user);
                commit('setUserInfo', res.data.user)
            })
        });
    },

    getWorkTimeFromDB({commit, rootState,state}){
        axios.get('/sanctum/csrf-cookie').then(() => {
            //запрос рабочего графика  на дату
            axios.post('api/master/worktime/oneday', {day: rootState.selectData}).then(res=>{

                if(res.data.worktime) {
                    rootState.isWorkDay = true;
                    let newDate = res.data.worktime.date.split('-');
                    commit('setWorkTime', {
                        from: res.data.worktime.start_time.replace(/(:\d{2})$/, ""),
                        to: res.data.worktime.end_time.replace(/(:\d{2})$/, ""),
                        date: newDate[2]+'.'+ newDate[1]+ '.' + newDate[0],
                    });

                    let setArray = [];
                    let firstStep = state.workTime;
                    let fromH = firstStep.from.split(":")[0];
                    let fromM = firstStep.from.split(":")[1];
                    let toH = firstStep.to.split(":")[0];
                    let toM = firstStep.to.split(":")[1];
                    for (let i = fromH; i <= toH; i++) {
                        let item = "";
                        if (i === fromH) {
                            item = `${i}:${fromM}`;
                        } else {
                            item = `${i}:00`;
                        }
                        setArray.push(item);
                    }
                    if (setArray[setArray.length - 1] == `${toH}:00` && toM != "00") {
                        setArray.push(`${toH}:${toM}`);
                    }
                    commit("setWorkTimeList", setArray);


                } else {
                    rootState.isWorkDay = false;
                }
            })
        })
    },

    // setWorkTime_({commit, state}) {
    //
    //     let setArray = [];
    //     let firstStep = state.workTime;
    //     let fromH = firstStep.from.split(":")[0];
    //     let fromM = firstStep.from.split(":")[1];
    //     let toH = firstStep.to.split(":")[0];
    //     let toM = firstStep.to.split(":")[1];
    //     for (let i = fromH; i <= toH; i++) {
    //         let item = "";
    //         if (i === fromH) {
    //             item = `${i}:${fromM}`;
    //         } else {
    //             item = `${i}:00`;
    //         }
    //         setArray.push(item);
    //     }
    //     if (setArray[setArray.length - 1] == `${toH}:00` && toM != "00") {
    //         setArray.push(`${toH}:${toM}`);
    //     }
    //     commit("setWorkTimeList", setArray);
    //
    //
    //
    // },
};

export default {
  state,
  mutations,
  getters,
  actions,
};
