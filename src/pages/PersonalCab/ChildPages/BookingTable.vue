<template>
  <div class="table">
    <ClientDetails v-if="isModalOpen" :actualItem="actualSlot" @closeModal="closeModal" />
    <div v-if="worktime==null">Этот день не рабочий</div>
    <div
      class="table_row"
      :class="slotStatus(item.status)"
      @click="setBook(item)"
      v-for="(item, index) in eventslots"
      :key="index"
    >
      <p class="table_row_slottime">{{ item.time }}</p>
      <div class="table_row_slotblock">
        <p class="table_row_service">{{ item.service }}</p>
        <p class="table_row_name">{{ item.name }}</p>
        <p class="table_row_phone">{{ item.phone }}</p>
        <p class="table_row_comment">{{ item.comment }}</p>
      </div>
    </div>
  </div>
</template>

<script>

import ClientDetails from "@/components/CLientDetails.vue";
import axios from "@/api/axios";

export default {
  name: "BookingTable",
  components: { ClientDetails },

  data() {
    return {
      isModalOpen: false,
      actualSlot: {},
      events:[],
      eventslots:[],
      userName: null,
      worktime: null,
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
          status: "",
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
          status: "",
          isFree: true,
        },
        {
          time: "15:00",
          service: "",
          name: "",
          phone: "",
          comment: "",
          status: "",
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
          status: "",
          isFree: true,
        },
      ],
    };
  },
  computed: {},
  methods: {
    setBook(item) {
      console.log('Выбрано',item);
      if(item.id){
        this.actualSlot = item
        this.isModalOpen = true
      } else {
        this.$router.push({name: 'AddBookingItem', params: {
            time: item.time,
            date: item.date,
          }
        });
      }

    },
    slotStatus(item) {
      switch (item) {
        case "failed":
          return "clientPass";
        case "done":
          return "clientPast";
        case "master_w":
          return "clientMaster";
        case "client_w":
          return "clientClient";
        default:
          break;
      }
    },
    closeModal() {
        this.actualSlot = {}
        this.isModalOpen = false},
    getEventsInfo(){
      axios.get('/sanctum/csrf-cookie').then(() => {
        //запрос событий на дату
        axios.post('api/master/events/oneday', {day: this.$store.getters.SELECTDATA}).then(res=>{ //'2022-04-25'
          this.events = res.data.eventsoneday;

          this.worktime = res.data.worktime;
          if(this.worktime === null) {
            console.log('Этот день не рабочий');
            this.eventslots = [];
          } else {

            if(this.events[0]){
              this.userName = this.events[0].user.name;
            }
            //получим массив для прорисовки свободных и занятых рабочих часов мастера .
            this.eventslots = this.getSlots(
                parseInt(this.worktime.start_time.split(/[- :]/)[0]), //начало рабочего дня
                parseInt(this.worktime.end_time.split(/[- :]/)[0]),// конец рабочего дня
                this.events); //записи клиентов
          }

        })
      })
    },
    getSlots(start,end,events){
      let slots = [];
      for(let i=start; i <= end; i++){
        let el = events.find(el => parseInt(el.datetime.split(/[- :]/)[3]) === i);

        if (el){
          slots.push({
            id: el.id,
            time: el.datetime.split(/[- :]/)[3] + ":00",
            service: el.service.name,
            name: el.name,
            phone: el.phone,
            comment: "comments",
            status: el.status,
          })
        } else {
          slots.push({
          time: (i>=10)?(i + ":00"):"0"+i+":00",
          date: this.$store.getters.SELECTDATA,
          service: "",
          name: "",
          phone: "",
          comment: "",
          status: "",
        })
        }
      }

      return slots;
    }
  },
  mounted() {
    this.getEventsInfo();
    this.$eventBus.$on("callGetEvents", () => {
      this.getEventsInfo();
    });

  },


};
</script>

<style lang="scss" scoped>
.table {
  position: relative;
  &_row {
    width: 100%;
    height: 64px;
    background-color: #fff;
    display: flex;
    margin: 2px 0;
    transition: all 0.2s;
    &:hover {
      transform: translate(1px, 1px);
      border: 1px solid rgba(152, 148, 148, 0.6);
      box-shadow: -4px -4px 6px -5px rgba(152, 148, 148, 1);
    }
    &:active {
      transform: translate(0px, 0px);
      border: 1px solid rgba(152, 148, 148, 0.6);
    }
    &_slottime {
      margin: 4px;
      font-size: 12px;
      font-family: "Courier New", Courier, monospace;
    }
    &_slotblock {
      margin: 4px 5%;
    }
    &_service {
      font-size: 14px;
      font-weight: 700;
    }
    &_name {
      font-size: 12px;
    }
    &_phone {
      font-size: 12px;
    }
    &_comment {
      font-size: 11px;
      font-style: italic;
      color: rgba(152, 148, 148, 1);
    }
  }
}
.clientPass {
  background-color: rgba(243, 109, 109, 0.5);
}
.clientPast {
  background-color: rgba(153, 145, 145, 0.5);
}
.clientMaster {
  background-color: rgba(171, 237, 170, 0.5);
}
.clientClient {
  background-color: rgba(117, 174, 241, 0.5);
}
</style>
