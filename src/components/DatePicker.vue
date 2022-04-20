<template>
    <div class="datepicker">
        <form>
            <input type="date" class="picker" v-model="mydate" @input="getSelect">
        </form>
    </div>
</template>

<script>
export default {
    name: 'DatePicker',

  data(){
      return {
        mydate: this.$store.getters.SELECTDATA
      }
  },
  methods: {
    getSelect() {
      this.$store.commit('SET_SELECTDATA', this.mydate);
      //this.$store.dispatch('SET_SELECTDATA', this.mydate);
      this.$eventBus.$emit("callGetEvents");
      }
  }
}
</script>

<style lang="scss" scoped>
    .datepicker {
        padding: 32px 0 44px 0;

        .picker {
            width: 100%;
        }   
    }
</style>
