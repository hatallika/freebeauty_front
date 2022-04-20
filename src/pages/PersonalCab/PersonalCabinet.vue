<template>
  <div class="lk">
    <SideBar></SideBar>
    <div class="content">
      <div class="content_masterinfo">
        <div class="content_infoblock">
          <p class="content_masterinfo_name">{{userInfo.lastname}} {{ userInfo.name }} {{userInfo.patronymic}}</p>
          <p class="content_masterinfo_role">{{ userInfo.profession }}</p>
        </div>
      </div>
      <div class="content_listinfo">
        <div class="content_infoblock">
          <div class="content_listinfo_headtext">
            <p class="content_listinfo_title">{{ listTitle }}</p>
            <p v-if="isBookingList" class="content_listinfo_date">
              {{ listDate }}
            </p>
            <p v-if="isBookingList" class="content_listinfo_time">
              ( {{ listTime }} )
            </p>
          </div>
          <a
            href="#"
            v-if="isBookingList"
            class="content_listinfo_change"
            @click="getAction"
          >
            Изменить
          </a>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import axios from "@/api/axios";

export default {
  name: "PersonalCabinet",
  components: {
    SideBar,
  },
  data() {
    return {
      userInfo: [],
      masterName: "Иван Иванов",
      masterRole: "Tatoo artist",
      listTitle: "Рабочий день",
      listDate: this.$store.getters.SELECTDATA,
      listTime: "10:00 - 18:00",
      isBookingList: true,
    };
  },
  methods: {
    getAction() {
      alert("Что изменить");
    },
  },
  mounted() {
    this.$router.push("/personalpage/bookingtable").catch(() => {});
    axios.get('/sanctum/csrf-cookie').then(() => {
      axios.get('/api/user').then(res => {
        console.log(res.data.user);
        this.userInfo = res.data.user;
      })
    });
  },
};
</script>

<style lang="scss" scoped>
.lk {
  height: 100%;
  background: rgb(242, 236, 236, 0.49);
  display: flex;
  .content {
    width: 100%;
    background-color: rgba(242, 236, 236, 1);
    &_masterinfo,
    &_listinfo {
      min-height: 64px;
      margin: 16px auto;
      background-color: rgba(226, 216, 216, 0.69);
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: start;
    }
    &_infoblock {
      margin-left: 40%;
    }
    &_masterinfo {
      &_name {
        font-size: 18px;
        font-weight: 600;
        margin: 4px 0;
      }
      &_role {
        font-size: 12px;
        color: rgba(165, 165, 165, 1);
      }
    }
    &_listinfo {
      &_headtext {
        display: flex;
      }
      &_title {
        font-size: 18px;
        font-weight: 600;
      }
      &_change {
        font-size: 12px;
        color: rgba(165, 165, 165, 1);
        text-decoration: underline;
        &:hover {
          text-decoration: none;
        }
        &:active {
          color: rgb(83, 82, 82);
        }
      }
      &_date,
      &_time {
        font-size: 14px;
        margin: 2px 8px;
      }
    }
  }
}
</style>
