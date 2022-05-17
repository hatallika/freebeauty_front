<template>

    <div class="client_modal">
      <div class="client_modal_win">
          <button @click="closeModal" class="client_modal_closedbutton"> Закрыть </button>

          <div class="event">
            <h3 class="event_service">Услуга:{{actualItem.service}}</h3>
            <form>
              <input type="text" ref="name" id="name" v-model="name" :placeholder="name" name="user_name" :disabled="!nameEdit">
              <button class="change" type="button" v-if="!nameEdit" v-on:click="toggleName()">
                <!-- Редактировать -->
                <svg style="width:18px;height:18px" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                </svg>
              </button>
              <button class="change" type="button" v-if="nameEdit" v-on:click="toggleName()">
                <!-- Сохранить -->
                <svg style="width:18px;height:18px" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M17 3H5C3.9 3 3 3.9 3 5V19C3 20.11 3.9 21 5 21H11.81C11.42 20.34 11.17 19.6 11.07 18.84C9.5 18.31 8.66 16.6 9.2 15.03C9.61 13.83 10.73 13 12 13C12.44 13 12.88 13.1 13.28 13.29C15.57 11.5 18.83 11.59 21 13.54V7L17 3M15 9H5V5H15V9M15.75 21L13 18L14.16 16.84L15.75 18.43L19.34 14.84L20.5 16.25L15.75 21" />
                </svg>
              </button>
            </form>
            <form>
              <input type="text" ref="name" id="lastname" v-model="lastname" :placeholder="lastname" name="user_lastname" :disabled="!lastNameEdit">
              <button class="change" type="button" v-if="!lastNameEdit" v-on:click="toggleLastName()">
                <!-- Редактировать -->
                <svg style="width:18px;height:18px" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                </svg>
              </button>
              <button class="change" type="button" v-if="lastNameEdit" v-on:click="toggleLastName()">
                <!-- Сохранить -->
                <svg style="width:18px;height:18px" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M17 3H5C3.9 3 3 3.9 3 5V19C3 20.11 3.9 21 5 21H11.81C11.42 20.34 11.17 19.6 11.07 18.84C9.5 18.31 8.66 16.6 9.2 15.03C9.61 13.83 10.73 13 12 13C12.44 13 12.88 13.1 13.28 13.29C15.57 11.5 18.83 11.59 21 13.54V7L17 3M15 9H5V5H15V9M15.75 21L13 18L14.16 16.84L15.75 18.43L19.34 14.84L20.5 16.25L15.75 21" />
                </svg>
              </button>
            </form>
            <form>
              <input type="tel" ref="phone" id="phone" v-model="phone" placeholder="8-245-485-36-11" phone="user_phone" :disabled="!phoneEdit">
              <button class="change" type="button" v-if="!phoneEdit" v-on:click="togglePhone()">
                <!-- Редактировать -->
                <svg style="width:18px;height:18px" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                </svg>
              </button>
              <button class="change" type="button" v-if="phoneEdit" v-on:click="togglePhone()">
                <!-- Сохранить -->
                <svg style="width:18px;height:18px" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M17 3H5C3.9 3 3 3.9 3 5V19C3 20.11 3.9 21 5 21H11.81C11.42 20.34 11.17 19.6 11.07 18.84C9.5 18.31 8.66 16.6 9.2 15.03C9.61 13.83 10.73 13 12 13C12.44 13 12.88 13.1 13.28 13.29C15.57 11.5 18.83 11.59 21 13.54V7L17 3M15 9H5V5H15V9M15.75 21L13 18L14.16 16.84L15.75 18.43L19.34 14.84L20.5 16.25L15.75 21" />
                </svg>
              </button>
            </form>
            <!--Дата и время-->
            <div class="form_bookitem">
              <input class="form_bookitem_field" type="date" name="date" v-model="date" :disabled="!datetimeEdit">
              <span class="form_bookitem_text">Дата</span>

              <input class="form_bookitem_field" type="time" name="time" v-model="time" :disabled="!datetimeEdit">
              <span class="form_bookitem_text">Время</span>

              <select class="form_bookitem_field interval" name="interval" v-model="interval" disabled>
                <option value="60">60 минут</option>
                <option value="90">90 минут</option>
                <option value="120">120 минут</option>
              </select>
              <span class="form_bookitem_text">Длительность</span>

              <!--Редактировать дату-->
              <button class="change" type="button" v-if="!datetimeEdit" v-on:click="toggleDateTime()">
                <!-- Редактировать -->
                <svg style="width:18px;height:18px" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                </svg>
              </button>
              <button class="change" type="button" v-if="datetimeEdit" v-on:click="toggleDateTime()">
                <!-- Сохранить -->
                <svg style="width:18px;height:18px" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M17 3H5C3.9 3 3 3.9 3 5V19C3 20.11 3.9 21 5 21H11.81C11.42 20.34 11.17 19.6 11.07 18.84C9.5 18.31 8.66 16.6 9.2 15.03C9.61 13.83 10.73 13 12 13C12.44 13 12.88 13.1 13.28 13.29C15.57 11.5 18.83 11.59 21 13.54V7L17 3M15 9H5V5H15V9M15.75 21L13 18L14.16 16.84L15.75 18.43L19.34 14.84L20.5 16.25L15.75 21" />
                </svg>
              </button>

            </div>

            <div class="event_phone">Телефон: {{actualItem.phone}} </div>
            <div class="event_comment">Коментарий: {{actualItem.comment}} </div>
            <div class="event_status">Статус: {{actualItem.status}} </div>
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
    }
},
  data() {
    return {
      name: this.actualItem.name,
      lastname: this.actualItem.lastname,
      nameEdit: false,
      lastNameEdit: false,
      phone: this.actualItem.phone,
      phoneEdit: false,
      date: this.actualItem.datetime.split(/[ ]/)[0],
      time: this.actualItem.time,
      datetime: this.actualItem.datetime,
      datetimeEdit: false,
      interval: 60,
      comment: "",
      commentEdit: false,
      service: {},
      serviceEdit:false,
      fixprice: null,
      fixpriceEdit: false,
      status:"",
      statusEdit: false,
    }
  },

methods: {
    closeModal() {
        this.$emit("closeModal")
    },
    toggleName() {
      if(this.nameEdit) { this.saveEvent({name: this.name})}
      this.nameEdit = !this.nameEdit;

      if (this.nameEdit) {
        setTimeout(() => this.$refs.name.focus(), 0);
      }
    },
    toggleLastName() {
      if(this.lastNameEdit) { this.saveEvent({lastname: this.lastname})}
      this.lastNameEdit = !this.lastNameEdit;

      if (this.lastNameEdit) {
        setTimeout(() => this.$refs.name.focus(), 0);

      }
    },
    togglePhone() {
      if(this.phoneEdit) { this.saveEvent({phone: this.phone})}
      this.phoneEdit = !this.phoneEdit;
      if (this.phoneEdit) {
        setTimeout(() => this.$refs.phone.focus(), 0);
      }
    },

  toggleDateTime() {
    if(this.datetimeEdit) { this.saveEvent({datetime: this.date + " " + this.time})}
    this.datetimeEdit = !this.datetimeEdit;
    if (this.datetimeEdit) {
      setTimeout(() => this.$refs.phone.focus(), 0);
    }
  },

  saveEvent(data){
    ///api/master/events/id
    axios.put('/api/master/events/'+ this.actualItem.id + '/', data).then(res => {
      console.log(res.data);
    }).catch(function (err) {
      console.log(err);
    })
  },

},

}

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
