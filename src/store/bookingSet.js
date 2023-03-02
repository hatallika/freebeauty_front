import axios from "@/api/axios";

const state = {
    statuses : {
        master_w: "Добавлено мастером",
        client_w:"Добавлено клиентом",
        done: "Заказ исполнен",
        failed:"Отмена заказа"
    },
    slotList: [
        {
          time: "10:00",
          service: "Сеанс-тату. Средний размер",
          name: "Антон Александров",
          phone: "8-999-544-01-40",
          comment: "Татуировка дракона - спина, взять обезбол",
          status: "past",
          isFree: false,
        },
        {
          time: "11:00",
          service: "",
          name: "",
          phone: "",
          comment: "",
          status: "freeslot",
          isFree: true,
        },
        {
          time: "12:00",
          service: "Удаление тату. Малый размер",
          name: "Елена Дмитриева",
          phone: "8-999-544-01-40",
          comment: "",
          status: "pass",
          isFree: false,
        },
        {
          time: "13:00",
          service: "Сеанс-тату. Большой размер",
          name: "Илья Иванов",
          phone: "8-999-544-01-40",
          comment: "Парковка фольксваген т143ов77",
          status: "masterbook",
          isFree: false,
        },
        {
          time: "14:00",
          service: "",
          name: "",
          phone: "",
          comment: "",
          status: "freeslot",
          isFree: true,
        },
        {
          time: "15:00",
          service: "",
          name: "",
          phone: "",
          comment: "",
          status: "freeslot",
          isFree: true,
        },
        {
          time: "16:00",
          service: "",
          name: "Дмитрий",
          phone: "8-999-544-01-40",
          comment: "Хочет партаки",
          status: "clientbook",
          isFree: false,
        },
        {
          time: "17:00",
          service: "",
          name: "",
          phone: "",
          comment: "",
          status: "freeslot",
          isFree: true,
        },
      ],
} 

const getters = {
    getSlotList: state => state.slotList,
    getStatuses: state=>state.statuses,
}

const mutations = {
    setSlotList(state, newItem) {
        state.slotList[newItem.index] = newItem.item
        state.slotList = [...state.slotList]
    },
    setAllSlots: (state, array) => {
        state.slotList = array;
    },
}

const actions = {
    getSlotListFromBase({commit, rootState,getters}){
        axios.get('/sanctum/csrf-cookie').then(() => {
            axios.post('api/master/events/oneday', {day: rootState.selectData}).then(res => {

                let events = res.data.eventsoneday;
                let worktime = res.data.worktime;
                console.log(events, worktime);
                if(res.data.worktime) {
                    let slots = [];
                    for (let i = parseInt(worktime.start_time.split(/[- :]/)[0]); i <= parseInt(worktime.end_time.split(/[- :]/)[0]); i++) {
                        let el = events.find(el => parseInt(el.datetime.split(/[- :]/)[3]) === i);
                        if (el) {
                            slots.push({
                                id: el.id,
                                time: el.datetime.split(/[- :]/)[3] + ":00",
                                date: el.datetime.split(/[ ]/)[0],
                                datetime: el.datetime,
                                service: el.service,
                                fixprice: el.fixprice,
                                service_name: el.service.name,
                                name: el.name,
                                lastname: el.lastname,
                                phone: el.phone,
                                comment: el.comment ?? "Коментарий отстутсвует",
                                status: el.status,
                                isFree: false,

                            })
                        } else {
                            slots.push({
                                time: (i >= 10) ? (i + ":00") : "0" + i + ":00",
                                date: getters.SELECTDATA,
                                service: "",
                                name: "",
                                phone: "",
                                comment: "",
                                status: "",
                                isFree: true,

                            })
                        }
                    }
                    console.log("Slots", slots);
                    commit("setAllSlots", slots);
                    console.log(getters.getSlotList);
                }
            })
        })
    }
}

export default {
    state,
    mutations,
    getters,
    actions
}