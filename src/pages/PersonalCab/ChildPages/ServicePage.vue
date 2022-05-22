<template>
    <div class="container">
        <div class="service">
            <div>
                <div>
                    <div class="services grey_border">Список услуг</div>
                    <div></div>
                </div>

                <div class="form_border background_forms">
                    <form v-for="service in getServicesDB" :key="service.id">
                        <input type="text" v-model="service.name" :disabled="service.id !== editServiceId">
                        <input class="border_input margin_input" v-model="service.interval" type="time" :disabled="service.id !== editServiceId">
                        <input class="border_input" type="text" v-model="service.price" :disabled="service.id !== editServiceId">

                        <button class="change" type="button" v-if="service.id !== editServiceId" v-on:click="editService(service.id)">
                            <!-- Редактировать -->
                            <svg style="width:18px;height:18px" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                            </svg>
                        </button>
                        <button class="change" type="button" v-if="service.id === editServiceId" v-on:click="saveService(service)">
                            <!-- Сохранить -->
                            <svg style="width:18px;height:18px" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M17 3H5C3.9 3 3 3.9 3 5V19C3 20.11 3.9 21 5 21H11.81C11.42 20.34 11.17 19.6 11.07 18.84C9.5 18.31 8.66 16.6 9.2 15.03C9.61 13.83 10.73 13 12 13C12.44 13 12.88 13.1 13.28 13.29C15.57 11.5 18.83 11.59 21 13.54V7L17 3M15 9H5V5H15V9M15.75 21L13 18L14.16 16.84L15.75 18.43L19.34 14.84L20.5 16.25L15.75 21" />
                            </svg>
                        </button>
                      <a href="javascript:;" v-on:click="deleteService(service)">[x]</a>
                    </form>
                </div>
            </div>

            <div>
                <div>
                    <div class="services grey_border">Добавить</div>
                    <div></div>
                </div>

                <div class="form_border">
                    <form>
                        <input type="text" v-model="newService.name">
                        <input class="border_input margin_input" type="time" v-model="newService.interval">
                        <input class="border_input" type="text" v-model="newService.price">

                        <button class="change" type="button" v-on:click="addService()">
                            <!-- Сохранить -->
                            <svg style="width:18px;height:18px" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M17 3H5C3.9 3 3 3.9 3 5V19C3 20.11 3.9 21 5 21H11.81C11.42 20.34 11.17 19.6 11.07 18.84C9.5 18.31 8.66 16.6 9.2 15.03C9.61 13.83 10.73 13 12 13C12.44 13 12.88 13.1 13.28 13.29C15.57 11.5 18.83 11.59 21 13.54V7L17 3M15 9H5V5H15V9M15.75 21L13 18L14.16 16.84L15.75 18.43L19.34 14.84L20.5 16.25L15.75 21" />
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "@/api/axios";
export default {
    name: "ServicePage",
    data: () => ({
        editServiceId: "",
        newService: {
            service: "",
            time: "",
            price: ""
        },
        services: [
            {
                id: "1225458959896",
                service: "Сеанс тату - Малый размер",
                time: "60 минут",
                price: "2000 р."
            },
            {
                id: "6587782471184",
                service: "Сеанс тату - Средний размер",
                time: "90 минут",
                price: "4000 р."
            },
            {
                id: "7845148522111",
                service: "Сеанс тату - Большой размер",
                time: "120 минут",
                price: "8000 р."
            }
        ]
    }), 
    methods: {
        editService(id) {
            this.editServiceId = id;


        },
        saveService(service) {
            this.services = this.services.map(s => s.id === service.id ? service : s);

            this.editServiceId = "";
            console.log(this.services);
            axios.post('api/master/services/update/' + service.id, service).then(res=>{ //'2022-04-25'
            console.log(res.data); })
                .catch(error => {
                  console.log(error);
                })
        },
        addService() {

          axios.post('api/master/services/add', {
            name: this.newService.name,
            price: this.newService.price,
            interval: this.newService.interval,
          }).then(res=>{
            console.log(res.data);
            this.$store.dispatch("getServicesFromDB");
          });

            this.services = [...this.services, {...this.newService, id: Date.now().toString()}];
            this.newService = {
                service: "",
                time: "",
                price: ""
            }
        },

        deleteService(service){
          if (confirm('Удалить услугу: ' + service.name)) {
          axios.delete('api/master/services/delete/' + service.id).then(res=>{
              console.log(res.data);
              this.$store.dispatch("getServicesFromDB");
          })
              .catch(error => {
                console.log(error);
              })
          }
        }
    },
    computed: {
      ...mapGetters(["getServicesDB"]),
        servicesList() {
            return this.services.map(service => service.id === this.editServiceId ? {...service} : service);
        }
    },
  created() {
      this.$store.dispatch("getServicesFromDB");
  }
}
</script>

<style lang="scss" scoped>
.container {
    .service {
        display: flex;
        flex-direction: column;
        color: rgb(143, 140, 140);

        .services {
            margin-left: 20px;
            font-size: 12px;
            padding: 10px 10px 0;
        }

        .grey_border {
            border-bottom: 1px solid #898989;
            width: 234px;
            margin-bottom: 10px;
        }

        .background_forms {
            background: #C4C4C433;
            overflow: auto;
            max-height: 180px;
        }

        form {
            padding: 1em;
            padding-left: 0px;
            margin-left: 20px;
            box-sizing: border-box;

            .border_input {
                width: 80px;
            }

            .margin_input {
                margin: 0 10px ;
            }

            input {
                width: 234px;
                box-sizing: border-box;
                border: 1px solid #999;
                padding: 6px;
                border-radius:10px;
                background: #ffff;
                border: 0.2px solid rgb(153, 145, 145, 0.55);
                font-size: 12px;
            }

            .change {
                font-size: 8px;
                line-height: 12px;
                box-sizing: border-box;
                border: none;
                margin-left: 10px;
                background: none;
                color: #797979;
            }

            select {
                width: 234px;
                box-sizing: border-box;
                border: 1px solid #999;
                padding: 6px;
                border-radius:10px;
                background: #ffff;
                border: 0.2px solid rgb(153, 145, 145, 0.55);
                font-size: 12px;
            }
        }
    }
}

</style>