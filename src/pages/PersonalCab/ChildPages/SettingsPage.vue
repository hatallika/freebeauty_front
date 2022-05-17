<template>
    <div class="page_container">       

        <div class="settings">
            <div>
                <div>
                    <div class="header_form grey_border">Личные данные</div>
                    <div></div>
                </div>

                <div class="form_border">
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
                        <input type="text" ref="patronymic" id="patronymic" v-model="patronymic" :placeholder="patronymic"  :disabled="!patronymicEdit">
                        <button class="change" type="button" v-if="!patronymicEdit" v-on:click="togglePatronymic()">
                            <!-- Редактировать -->
                            <svg style="width:18px;height:18px" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                            </svg>
                        </button>
                        <button class="change" type="button" v-if="patronymicEdit" v-on:click="togglePatronymic()">
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
                    <form>
                        <input type="email" ref="email" id="email" v-model="email" placeholder="ivanov@mail.ru" email="user_email" :disabled="!emailEdit">
                        <button class="change" type="button" v-if="!emailEdit" v-on:click="toggleEmail()">
                            <!-- Редактировать -->
                            <svg style="width:18px;height:18px" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                            </svg>
                        </button>
                        <button class="change" type="button" v-if="emailEdit" v-on:click="toggleEmail()">
                            <!-- Сохранить -->
                            <svg style="width:18px;height:18px" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M17 3H5C3.9 3 3 3.9 3 5V19C3 20.11 3.9 21 5 21H11.81C11.42 20.34 11.17 19.6 11.07 18.84C9.5 18.31 8.66 16.6 9.2 15.03C9.61 13.83 10.73 13 12 13C12.44 13 12.88 13.1 13.28 13.29C15.57 11.5 18.83 11.59 21 13.54V7L17 3M15 9H5V5H15V9M15.75 21L13 18L14.16 16.84L15.75 18.43L19.34 14.84L20.5 16.25L15.75 21" />
                            </svg>
                        </button>
                    </form>
                    <form>
                        <input type="text" ref="address" v-model="address" placeholder="Москва, ул.Московская 6" id="adds" name="user_adds" :disabled="!addressEdit">
                        <button class="change" type="button" v-if="!addressEdit" v-on:click="toggleAddress()">
                            <!-- Редактировать -->
                            <svg style="width:18px;height:18px" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                            </svg>
                        </button>
                        <button class="change" type="button" v-if="addressEdit" v-on:click="toggleAddress()">
                            <!-- Сохранить -->
                            <svg style="width:18px;height:18px" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M17 3H5C3.9 3 3 3.9 3 5V19C3 20.11 3.9 21 5 21H11.81C11.42 20.34 11.17 19.6 11.07 18.84C9.5 18.31 8.66 16.6 9.2 15.03C9.61 13.83 10.73 13 12 13C12.44 13 12.88 13.1 13.28 13.29C15.57 11.5 18.83 11.59 21 13.54V7L17 3M15 9H5V5H15V9M15.75 21L13 18L14.16 16.84L15.75 18.43L19.34 14.84L20.5 16.25L15.75 21" />
                            </svg>
                        </button>
                    </form>
                    <form>
                        <input type="text" ref="profession" v-model="profession" placeholder="Tattoo artist" name="user_mail"  :disabled="!professionEdit">
                        <button class="change" type="button" v-if="!professionEdit" v-on:click="toggleProfession()">
                            <!-- Редактировать -->
                            <svg style="width:18px;height:18px" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                            </svg>
                        </button>
                        <button class="change" type="button" v-if="professionEdit" v-on:click="toggleProfession()">
                            <!-- Сохранить -->
                            <svg style="width:18px;height:18px" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M17 3H5C3.9 3 3 3.9 3 5V19C3 20.11 3.9 21 5 21H11.81C11.42 20.34 11.17 19.6 11.07 18.84C9.5 18.31 8.66 16.6 9.2 15.03C9.61 13.83 10.73 13 12 13C12.44 13 12.88 13.1 13.28 13.29C15.57 11.5 18.83 11.59 21 13.54V7L17 3M15 9H5V5H15V9M15.75 21L13 18L14.16 16.84L15.75 18.43L19.34 14.84L20.5 16.25L15.75 21" />
                            </svg>
                        </button>
                    </form>
                </div>
                
            </div>
            <div>
                <div>
                    <div class="header_form grey_border">Онлайн - запись</div>
                    <div></div>
                </div>

                <div class="form_border">
                    <form>
                        <input readonly name="link" v-model="link">
                    </form>

                    <div class="header_form">Минимальный интервал для записи</div>

                    <form action="">
                        <select name="interval" v-model="interval">
                            <option value="60">60 минут</option>
                            <option value="90">90 минут</option>
                            <option value="120">120 минут</option>
                        </select>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "@/api/axios";

    export default {
        name: "SettingsPage",
        data: () => ({
            name: "",
            lastname: "",
            nameEdit: false,
            lastNameEdit: false,
            patronymic: "",
            patronymicEdit: false,
            phone: "",
            phoneEdit: false,
            email: "",
            emailEdit: false,
            address: "",
            addressEdit: false,
            profession: "",
            professionEdit: false,
            link: "freebeauty.ru/kljsd4353gdfvz",
            interval: 60
        }),
        methods: {
            toggleName() {
              if(this.nameEdit) { this.saveProfile({name: this.name})}
                this.nameEdit = !this.nameEdit;

                if (this.nameEdit) {
                    setTimeout(() => this.$refs.name.focus(), 0);
                }
            },

            toggleLastName() {
              if(this.lastNameEdit) { this.saveProfile({lastname: this.lastname})}
              this.lastNameEdit = !this.lastNameEdit;

              if (this.lastNameEdit) {
                setTimeout(() => this.$refs.name.focus(), 0);

              }
            },

            togglePatronymic() {
              if(this.patronymicEdit) { this.saveProfile({patronymic: this.patronymic})}
                this.patronymicEdit = !this.patronymicEdit;
                if (this.patronymicEdit) {
                    setTimeout(() => this.$refs.patronymic.focus(), 0);
                }
            },

            togglePhone() {
              if(this.phoneEdit) { this.saveProfile({phone: this.phone})}
                this.phoneEdit = !this.phoneEdit;
                if (this.phoneEdit) {
                    setTimeout(() => this.$refs.phone.focus(), 0);
                }
            },

            toggleEmail() {
              if(this.emailEdit) {
                //TODO подтвердить e-mail перед заменой
                this.saveProfile({email: this.email})}
                this.emailEdit = !this.emailEdit;
                if (this.emailEdit) {
                    setTimeout(() => this.$refs.email.focus(), 0);
                }
            },

            toggleAddress() {
              //TODO добавить данные в БД (нужна отдельная таблица profile from user и settings from user чтобы не было много полей на регистрацию и для деления ролей master,clients)
                this.addressEdit = !this.addressEdit;
                if (this.addressEdit) {
                    setTimeout(() => this.$refs.address.focus(), 0);
                }
            },
            toggleProfession() {
              if(this.professionEdit) { this.saveProfile({profession: this.profession})}
                this.professionEdit = !this.professionEdit;
                if (this.professionEdit) {
                    setTimeout(() => this.$refs.profession.focus(), 0);
                }
            },

            saveProfile(data){
              axios.post('/api/master/profile/update', data).then(res => {
                  console.log(res.data);
              }).catch(function (err) {
                console.log(err);
              })
            },
        },
      created() {
          axios.get('/api/master/profile').then(res => {
            console.log(res.data);
            this.name = res.data.user.name;
            this.lastname = res.data.user.lastname;
            this.patronymic = res.data.user.patronymic;
            this.profession = res.data.user.profession;
            this.phone = res.data.user.phone;
            this.email = res.data.user.email;
          })
      }
    }
</script>

<style lang="scss" scoped>
    .page_container {
        .settings {
            display: flex;
            flex-direction: column;
            color: rgb(143, 140, 140);


            .header_form{
                margin-left: 20px;
                font-size: 12px;
                padding: 10px 10px 0;
            }

            .grey_border {
                border-bottom: 1px solid #898989;
                width: 234px;
            }

            form {
                padding: 1em;
                padding-left: 0px;
                margin-left: 20px;
                box-sizing: border-box;
                

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