<template>
     <div class="authorization">
        <button  @click.prevent="logout" class="sign_out">SIGN OUT</button>
    </div>
</template>

<script>
import axios from "@/api/axios";

export default {
    name: 'AuthBtn',

  methods: {
    logout(){
      axios.post('/logout')
          .then( () => {

            localStorage.removeItem('x_xsrf_token');
            this.$router.push({name: 'welcomepage'});
          })
    }
  },
}
</script>

<style lang="scss" scoped>
    .authorization{
        display: flex;
        justify-content: center;

        .sign_out{
            font-size: 14px;
            line-height: 17px;
            color: white;
            background: #75AEF1;
            border: 0;
            border-radius: 10px;
            box-sizing: border-box;
            padding: 12px 16px;
            
            position: absolute;
            bottom: 42px;
            display: flex;
            align-items: center;
            justify-content: center;

        }
    }
</style>
