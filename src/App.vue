<template>
    <div id="app">
        <div class="wrapper">
            <router-view @sign-in="setAuth" />
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    computed: {
        ...mapGetters(["getAuth"])
    },
    methods: {
      setAuth(el) {
          //this.$store.commit('setAuth', true);
          if (el === true) {
              this.$router.push("/personalpage").catch(() => {});
          } else {
              this.$router.push("/welcomepage").catch(() => {});
          }
      },

      getToken(){
        this.token = localStorage.getItem('x_xsrf_token')
      },
    },
    mounted() {
      this.getToken();
      if(this.token){ this.$store.commit('setAuth', true);}
        if (this.$route.name === "NotFound") {
            this.$router.push("/404").catch(() => {});
        } else {
            if (this.getAuth) {
                this.$router.push("/personalpage").catch(() => {});
            } else {
                this.$router.push("/welcomepage").catch(() => {});
            }
        }
    },
    updated() {
      this.getToken()
    },
};
</script>

<style lang="scss">
*,
*::before,
*::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    border: 0;
}
a {
    text-decoration: none;
}

ul,
ol,
li {
    list-style: none;
}

html,
body,
#app {
    height: 100%;
    line-height: 1;
    background-color: rgba(255, 255, 255, 0.637);
    font-family: Arial, "Helvetika Neue", Helvetica, sans-serif;
}
.wrapper {
    margin: 0 calc(50vw - 512px);
    height: 100%;
    background: #c0c0c0;
    box-shadow: 0 0 50px -20px black;
}

button {
    cursor: pointer;
}
</style>
