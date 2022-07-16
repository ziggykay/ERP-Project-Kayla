<template>
  <!--change button  -->
  <div class="boxContainer">
    <button
      class="confirm-btn btn me-3 shadow"
      :class="{ 'bg-white': !isInfo, 'text-black': !isInfo }"
      @click="changeShow"
    >
      待回覆區
    </button>
    <button
      class="confirm-btn btn me-3 shadow"
      :class="{ 'bg-white': isInfo, 'text-black': isInfo }"
      @click="changeShow"
    >
      已結案區
    </button>
  </div>
  <div v-show="isInfo">
    <NeedResponse></NeedResponse>
  </div>
  <div v-show="!isInfo">
    <CaseEnd></CaseEnd>
  </div>
</template>

<script setup>
import NeedResponse from "../../components/Manager/NeedResponse.vue";
import CaseEnd from "../../components/Manager/CaseEnd.vue";
import { ref } from "vue";

const isInfo = ref(true);
const changeShow = () => {
  isInfo.value = !isInfo.value;
};
// const tabChange = (tabItem) =>  {
// this.changeView = tabItem;
// this.changeView = NeedResponse
// }
// const data = ref([
//     {
//         changeView: NeedResponse,
//     }
// ]
// )
</script>

<style lang="scss" scoped>
.boxContainer {
  margin: 1rem;
}

.content-box {
  margin: 1rem;
  background-color: #fff;
  width: 300px;
  height: 180px;
  padding: 1rem;
  box-shadow: gray;
}
.main-outter {
  width: 100%;
  height: 90vh;
}
.resbox {
  width: 35vw;
  height: 13vh;
}
.resbox-outter {
  overflow: scroll;
  height: 60vh;
  width: 40vw;
  .date-and-title {
    color: #558aba;
  }
  .date-and-title-content {
    font-size: xx-small;
  }
}
.question-box {
  width: 30vw;
  height: 55vh;
  .title {
    color: #558aba;
  }
  .q-title {
    border: solid 1px;
    width: 22vw;
    height: 5vh;
    margin: 0 auto;
  }
  .q-content {
    border: solid 1px;
    width: 22vw;
    height: 15vh;
    margin: 0 auto;
    overflow: scroll;
  }
  .res-content {
    border: solid 1px;
    width: 22vw;
    height: 11vh;
    margin: 0 auto;
  }
}
.case-end {
  background: #f93434;
  &:hover {
    background: #e12626;
  }
}
</style>
