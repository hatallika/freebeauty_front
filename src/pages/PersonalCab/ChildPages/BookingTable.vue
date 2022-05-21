<template>
  <div class="table">
    <ClientDetails
      v-if="isModalOpen"
      :actualItem="actualSlot"
      :actualIndex="actualIndex"
      @closeModal="closeModal"
      @setItem="setItem"
    />
    <div class="table_centreblock">
      <div>
        <div
          class="table_basicRow"
          v-for="(item, index) in getWorkTimeList"
          :key="index"
          :style="{ height: setRowHeight(item) }"
        >
          {{ item }}
        </div>
      </div>
      <div style="width: 100%">
        <div
          class="table_row"
          :class="slotStatus(getItem(item, 'status'))"
          @click="setBook(getSlotList, index)"
          v-for="(item, index) in getWorkTimeList"
          :key="index"
          :style="{ height: setRowHeight(item) }"
        >
          <div class="table_row_slotblock">
            <p class="table_row_service">{{ getItem(item, "service") }}</p>
            <p class="table_row_name">{{ getItem(item, "name") }}</p>
            <p class="table_row_phone">{{ getItem(item, "phone") }}</p>
            <p class="table_row_comment">{{ getItem(item, "comment") }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClientDetails from "@/components/CLientDetails.vue";
import { mapGetters } from "vuex";

export default {
  name: "BookingTable",
  components: { ClientDetails },
  data() {
    return {
      isModalOpen: false,
      actualSlot: {},
      actualIndex: 0,
    };
  },
  computed: {
    ...mapGetters(["getSlotList", "getWorkTime", "getWorkTimeList"]),
  },
  created() {
    this.$store.dispatch('getWorkTimeFromDB') // dispatch loading
    console.log(this.$store.getters.getWorkTime);
  },
  methods: {
    getItem(item, name) {
      let slot = this.getSlotList.find((el) => {
        return el.time === item;
      });
      if (slot !== undefined) {
        return slot[name];
      } 
    },
    setBook(item, index) {
      this.actualSlot = item[index];
      this.isModalOpen = true;
      this.actualIndex = index;
    },
    slotStatus(item) {
      switch (item) {
        case "freeslot":
          return "freeSlot";
        case "pass":
          return "clientPass";
        case "past":
          return "clientPast";
        case "masterbook":
          return "clientMaster";
        case "clientbook":
          return "clientClient";
        default:
          break;
      }
    },
    closeModal() {
      this.actualSlot = {};
      this.isModalOpen = false;
    },
    setItem(newItem) {
      this.$store.commit("setSlotList", newItem);
      this.actualSlot = {};
      this.isModalOpen = false;
    },
    setWorkTime() {
      let setArray = [];
      let firstStep = this.getWorkTime;
      let fromH = firstStep.from.split(":")[0];
      let fromM = firstStep.from.split(":")[1];
      let toH = firstStep.to.split(":")[0];
      let toM = firstStep.to.split(":")[1];
      for (let i = fromH; i <= toH; i++) {
        let item = "";
        if (i === fromH) {
          item = `${i}:${fromM}`;
        } else {
          item = `${i}:00`;
        }
        setArray.push(item);
      }
      if (setArray[setArray.length - 1] == `${toH}:00` && toM != "00") {
        setArray.push(`${toH}:${toM}`);
      }
      this.$store.commit("setWorkTimeList", setArray);
    },

    // TODO вынести в стор метод .
    setRowHeight(item) {
      let minute = item.split(":")[1];
      if (minute != "00") {
        return `${minute}px`;
      } else {
        return "60px";
      }
    },
  },
  mounted() {
    this.setWorkTime();
  },
};
</script>

<style lang="scss" scoped>
.table {
  position: relative;
  &_centreblock {
    display: flex;
  }
  &_basicRow {
    color: rgba(103, 103, 103, 0.8);
    font-size: 10px;
    width: 60px;
    background-color: #fff;
    box-shadow: inset 0 0 1px 0 rgba(152, 148, 148, 1);
    padding: 8px;
    text-align: center;
  }
  &_mainblock {
    width: 100%;
  }
  &_row {
    background-color: #fff;
    display: flex;
    box-shadow: inset 0 0 1px 0 rgba(152, 148, 148, 1);

    transition: all 0.2s;
    &:hover {
      border: 1px solid rgba(103, 103, 103, 0.6);
      box-shadow: -4px -4px 6px -5px rgba(152, 148, 148, 1);
    }
    &:active {
      border: 1px solid rgba(90, 87, 87, 0.6);
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
.freeSlot {
  background-color: rgba(255, 255, 255, 0.982);
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
