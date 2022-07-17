<template>
  <div class="container-fluid px-5 pt-3">
    <div class="inner">
      <filterSelect :parent-selectArr="selectArr" :parent-title="title" />
      <div class="content-box checkBox mt-3">
        <div class="py-2 checkBoxInner">
          <div
            class="content-box-border checkDiv d-flex align-items-center justify-content-around"
          >
            <div class="d-flex bigText">
              <div class="text">
                <div>日期</div>
                <div>2022/07/12</div>
              </div>
              <div class="text">
                <div>姓名</div>
                <div>王小明</div>
              </div>
              <div class="text">
                <div>內文</div>
                <div>XXXXXXXXXXXXX</div>
              </div>
            </div>
            <div>
              <router-link
                class="checkBtn btn btn-primary confirm-btn"
                to="/manager/checkDiary"
                >查看</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import filterSelect from "../baseComponents/filterSelect.vue";

const date = ref();

// For demo purposes assign range from the current date
onMounted(() => {
  const startDate = new Date();
  const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
  date.value = [startDate, endDate];
  return Date;
});
const selectArr = ref([
  {
    selected: "month",
    data: [
      {
        name: "今日",
        item: "today",
      },
      {
        name: "本月",
        item: "month",
      },
    ],
  },
]);
const title = ref("查看日誌");
</script>

<style lang="scss" scoped>
* {
  margin: auto;
  padding: auto;
}
.inner {
  width: 100%;
  height: 90vh;

  .checkDiv {
    width: 90%;
    height: 10vh;
    margin-top: 10px;
  }
  .checkDiv:hover {
    background-color: #558aba;
    .checkBtn {
      background-color: #22496d;
    }
    .text {
      color: #fff;
    }
  }
  .bigText {
    width: 60%;
  }
  .text {
    width: 30%;
  }
  .checkBox {
    width: 100%;
    height: 60vh;

    .checkBoxInner {
      overflow-y: scroll;
      height: 55vh;
    }
  }
}
</style>
