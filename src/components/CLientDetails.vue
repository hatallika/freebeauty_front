<template>
  <div class="client_modal">
    <div class="client_modal_win">
      <h3 class="client_modal_headtext">Данные записи</h3>
      <form class="form" @keypress.enter.prevent>
        <div class="form_leftblock">
          <div class="form_fio form_itemblock">
            <input class="form_input" id="name" type="text" v-model="name" />
            <label class="form_label" for="name">Имя</label>
          </div>
          <div class="form_fio form_itemblock">
            <input class="form_input" id="lastname" type="text" v-model="lastname" />
            <label class="form_label" for="lastname">Фамилия</label>
          </div>

          <div class="form_serviceselect form_itemblock">
            <select class="form_input" id="service_id" v-model="service_id">
              <option v-for="(option, index) of getServicesDB" :key="index" :value="option.id">
                {{ option.name }}
              </option>
            </select>
            <label class="form_label" for="service_id">Услуга</label>

          </div>
          <div class="form_fio form_itemblock">
            <input class="form_input" id="price" type="text" v-model="getPrice" />
            <label class="form_label" for="price">Цена</label>
            <div class="form_label">Договорная цена: {{getOldPrice}}</div>
          </div>

          <div class="form_textarea form_itemblock">
            <textarea
              class="form_input form_textarea"
              name="comment"
              id="comment"
              v-model="comment"
              placeholder="Введите комментарий"
            ></textarea>
            <label class="form_label" for="comment">Комментарий</label>
          </div>
        </div>
        <div class="form_rightblock">
          <div class="form_phone form_itemblock">
            <input class="form_input" id="phone" type="text" v-model="phone" />
            <label class="form_label" for="phone">Телефон</label>
          </div>
          <div class="form_date form_itemblock">
            <input class="form_input" id="date" type="date" v-model="date" />
            <label class="form_label" for="date">Дата</label>
          </div>

          <div class="form_time form_itemblock">
            <input class="form_input" id="time" type="time" v-model="time" />
            <label class="form_label" for="time">Время</label>
          </div>

          <div class="form_stime form_itemblock">
            <select class="form_input" id="stime" v-model="serviceTime">
              <option v-for="(time, index) of getTimeLimits" :key="index">
                {{ time }}
              </option>
            </select>
            <label class="form_label" for="stime">Длительность</label>
          </div>
        </div>
      </form>

      <div class="client_modal__btnblock">
        <button
          @click="setItem"
          class="client_modal_savebutton client_modal_btn"
        >
          СОХРАНИТЬ
        </button>
        <button
          @click="closeModal"
          class="client_modal_closebutton client_modal_btn"
        >
          ОТМЕНА
        </button>
        <a v-if="!isFree" href="javascript:;" v-on:click="deleteEvent">Удалить событие</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from "@/api/axios";
export default {
  name: "ClientDetails",
  props: {
    actualItem: {
      type: Object,
      required: true,
    },
    actualIndex: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      date: "",
      time: "",
      service_id: "",
      name: "",
      lastname: "",
      phone: "",
      comment: "",
      status: "",
      fixprice: "",
      isFree: false,
      serviceTime: 60,
      serviceSelect: "",
    };
  },
  computed: {
    ...mapGetters(['getServiceArr', 'getTimeLimits', 'getServicesDB']),
    getPrice: {
      get: function (){
      //let Index = this.services.indexOf(this.form.service_id);
      let index = this.getServicesDB.findIndex(el => el.id === this.service_id);
      let price = null;
      if (this.getServicesDB[index]){
        price = this.getServicesDB[index].price;
      }
      return price;
    },
      set: function (newValue){
        this.fixprice = newValue;
      }
    },
    getOldPrice: function (){
      return this.actualItem.fixprice
    },
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
    addEventToDB(){

      axios.post('/api/master/events', {
        name: this.name,
        lastname: this.lastname,
        phone:this.phone,
        service_id: this.service_id,
        datetime: this.date + " " + this.time + ":00",
        status: 'master_w',
        fixprice: this.getPrice,
        comment: this.comment,
      }).then(res=>{
        console.log(res.data);
        if(res.data.success) {
          this.$store.dispatch("getSlotListFromBase");
          this.closeModal();
        }
      }).catch((error)=> {
        console.log(error.response.data.errors);
      });
    },

    updateEventFromDB(){
      console.log("id",this.actualItem.id);
      axios.put('/api/master/events/'+ this.actualItem.id, {
        name: this.name,
        lastname: this.lastname,
        phone:this.phone,
        service_id: this.service_id,
        datetime: this.date + " " + this.time + ":00",
        status: 'master_w',
        fixprice: this.fixprice,
        comment: this.comment,
      }).then(res => {
        console.log(res.data);
        if(res.data) {
          this.$store.dispatch("getSlotListFromBase");
          this.closeModal();
        }
      }).catch((error)=> {
        console.log(error.response.data.errors);
      })

    },

    deleteEvent(){
      if (confirm('Удалить Событие: ' + this.actualItem.service.name)) {
        axios.delete('api/master/events/' + this.actualItem.id).then(res=>{
          console.log(res.data);
          if(res.data.success){
            this.$store.dispatch("getSlotListFromBase");
            this.closeModal();
          }

        })
            .catch(error => {
              console.log(error);
            })
      }
    },

    setItem() {
      if(this.actualItem.isFree){
        this.addEventToDB();
      } else {
        this.updateEventFromDB();
      }

      // let newItem = {
      //   index: this.actualIndex,
      //   date: this.date,
      //   item: {
      //     time: this.time,
      //     service: this.service,
      //     name: this.name,
      //     phone: this.phone,
      //     comment: this.comment,
      //     status: this.setStatus() || this.setSec() ,
      //     isFree: this.setIsFree(),
      //   },
      // };
      // this.$emit("setItem", newItem);
      // if (newItem.item.isFree){
      //   console.log(newItem)
      //   //this.addEvenToDB(newItem);
      // }
    },
    setIsFree() {
      if (
        this.service === "" &&
        this.name === "" &&
        this.phone === ""
      ) {
        return true;

      } else {
        return false;
      }
    },
    setStatus() {
      if (this.setIsFree()) {
        return "freeslot";
      } else {
        return ""
      }
    },
    setSec() {
      if (this.status === "freeslot") {
        return "masterbook";
      } else {
        return this.status
      }
    },
  },
  mounted() {
    this.time = this.actualItem.time;
    this.date = this.actualItem.date;
    this.name = this.actualItem.name;
    this.lastname = this.actualItem.lastname;
    this.service_id = this.actualItem.service.id;
    this.phone = this.actualItem.phone;
    this.comment = this.actualItem.comment;
    this.status = this.actualItem.status;
    this.isFree = this.actualItem.isFree;
    this.fixprice = this.actualItem.fixprice;
    // if (this.service != "") {
    //   ({ title: this.service, timeLimit: this.serviceTime } =
    //     this.getServiceArr.find((item) => {
    //       return item.title == this.service;
    //     }));
    // }
  },
  created() {
    this.$store.dispatch("getServicesFromDB");
  }
};
</script>

<style lang="scss" scoped>
.client_modal {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: rgb(181 205 205 / 50%);
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  &_win {
    width: 720px;
    height: 420px;
    background-color: rgba(224, 224, 224, 1);
    box-shadow: 0 0 20px -10px black;
    display: flex;
    flex-direction: column;
  }
  &_headtext {
    margin: 16px;
    align-self: center;
  }
  &__btnblock {
    margin: 16px;
    align-self: center;
  }
  &_btn {
    width: 100px;
    height: 40px;
    color: white;
    font-size: 14px;
    background-color: rgba(117, 174, 241, 1);
    margin: 8px;
    border-radius: 10px;
  }
  &_closebutton {
    transition: all 0.2s;
    &:hover {
      background-color: rgba(243, 109, 109, 1);
      box-shadow: 0 0 14px -6px black;
    }
    &:active {
      background-color: rgba(243, 109, 109, 0.5);
    }
  }
  &_savebutton {
    transition: all 0.4s;
    &:hover {
      background-color: rgba(171, 237, 170, 1);
      box-shadow: 0 0 10px -6px black;
    }
    &:active {
      background-color: rgba(171, 237, 170, 0.5);
    }
  }
  .form {
    display: flex;
    justify-content: center;
    margin: auto 0;
    &_leftblock {
      margin-right: 32px;
    }
    &_input {
      width: 200px;
      height: 32px;
      border-radius: 10px;
      padding-left: 8px;
      padding-right: 8px;
    }
    &_itemblock {
      margin: 8px;
    }
    &_textarea {
      padding-top: 8px;
      height: 74px;
    }
    &_label {
      margin: 8px;
      color: rgba(98, 98, 98, 1);
      font-size: 12px;
    }
  }
}
</style>
