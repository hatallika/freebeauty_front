<template>
  <div class="page_container">
    <form  @submit.prevent="save()">
      <h2 class="page_container_title">Записать клиента</h2>
      <div class="page_container_content">
        <div class="form_bookitem">
          <input class="form_bookitem_field" type="text" name="name" v-model="form.name" placeholder="Имя">
          <span class="form_bookitem_text">Имя</span>
        </div>
        <div class="form_bookitem">
          <input class="form_bookitem_field" type="text" name="lastname" v-model="form.lastname" placeholder="Фамилия">
          <span class="form_bookitem_text">Фамилия</span>
        </div>
        <div class="form_bookitem">
          <input class="form_bookitem_field" type="text" name="phone" v-model="form.phone" placeholder="Телефон">
          <span class="form_bookitem_text">Телефон</span>
        </div>

        <div class="form_bookitem">
          <select class="form_bookitem_field interval" name="service" v-model="form.service_id">
            <option v-for="service in services" :key="service.id" :value="service.id">{{ service.name }}</option>
          </select>
          <span class="form_bookitem_text">Услуга</span>

          <textarea class="form_bookitem_textarea" name="comment" v-model="form.comment" placeholder="Ваш комментарий"></textarea>
          <span class="form_bookitem_text">Комментарий</span>
        </div>

        <div class="form_bookitem">
          <input class="form_bookitem_field" type="date" name="date" v-model="form.date">
          <span class="form_bookitem_text">Дата</span>

          <input class="form_bookitem_field" type="time" name="time" v-model="form.time">
          <span class="form_bookitem_text">Время</span>

          <select class="form_bookitem_field interval" name="interval" v-model="interval" disabled>
            <option value="60">60 минут</option>
            <option value="90">90 минут</option>
            <option value="120">120 минут</option>
          </select>
          <span class="form_bookitem_text">Длительность</span>
        </div>
        <button class="form_bookitem_button" type="submit">Записать</button>
      </div>

    </form>

  </div>
</template>

<script>
import axios from "@/api/axios";

export default {
  name: "AddBookingItem",
  data() {
    return {
      services:[],
      form:{
        name: "",
        lastname: "",
        datetime: "",
        service_id:"1",
        comment:"",
      },
      interval: 60,
    }
  },
  methods: {
    save(){

      this.form.datetime = this.form.date + ' ' + this.form.time + ':00'

      console.log(this.form.datetime);
      axios.post('/api/master/events/ ', this.form).then(res=>{
        console.log(res.data);
        if(res.data.success) {
          this.$router.push({name: 'BookingTable'});
        }
      }).catch((error)=> {
        console.log(error.response.data.errors);
      });
    },

  },
  created() {
    axios.get('/api/services').then(res => {
      console.log(res.data);
      this.services = res.data.services;
      this.form.date = this.$route.params.date;
      this.form.time = this.$route.params.time;
    })
  }
}
</script>

<style lang="scss" scoped>
.form_bookitem_button {

}
.page_container {
  width: 100%;
  background-color: #E0E0E0;

  &_title {
    display: flex;
    text-align: start;
    font-size: 18px;
    font-weight: 600;
    margin-left: 40%;
    padding-top: 8px;
  }

  .page_container_content {
    padding: 46px 10px 28px 37px ;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;

    .form_bookitem {
      flex: 50%;
      margin-bottom: 30px;
      /*&:nth-child(2n){
        margin-left: 35px;
      }*/
      &_button {
        display: block;
        margin-left: 40%;

        width: 100px;
        height: 40px;
        background: #75AEF1;
        border-radius: 10px;

        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        color: #FFFFFF;
        text-transform: uppercase;
      }

      &_field {
        border-radius: 10px;
        width: 250px;
        height: 30px;
        font-weight: 400;
        font-size: 16px;
        line-height: 21px;
        padding-left: 10px;
        box-sizing: border-box;
        margin-top: 5px;
      }

      &_textarea {
        border-radius: 10px;
        width: 250px;
        font-weight: 400;
        font-size: 16px;
        padding: 10px;
        box-sizing: border-box;
        margin-top: 5px;
      }

      &_text {
        font-weight: 400;
        font-size: 12px;
        line-height: 30px;
        color: #626262;
        margin-left: 12px;
      }

    }
  }


}
</style>