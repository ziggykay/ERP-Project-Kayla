<template>
  <!-- filter -->
  <FilterSelect :parent-selectArr="selectArr" :parent-title="title">
    <div class="py-1">
      <input class="mx-1" type="checkbox" /><span>企業已回覆</span>
    </div></FilterSelect
  >

  <!-- chart -->
  <div class="content-box overall-box">
    <div class="py-2 checkBoxInner">
      <div v-for="data in items" class="content-box-border checkDiv d-flex">
        <div class="d-flex bigText">
          <div class="text">
            <p>日期</p>
            <p class="single-ellipsis">{{ data.Time }}</p>
          </div>
          <div class="text">
            <p>姓名</p>
            <p>{{ data.Name }}</p>
          </div>
          <div class="text">
            <p>內文</p>

            <p class="single-ellipsis">{{ data.Content }}</p>
          </div>
        </div>
        <div>
          <router-link
            class="checkBtn btn btn-primary confirm-btn"
            to="/user/checkSelfDiary"
            >查看</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import FilterSelect from "../baseComponents/FilterSelect.vue";
import { ref, onMounted, computed } from "vue";

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
  {
    selected: "project",
    data: [
      {
        name: "專案",
        item: "project",
      },
      {
        name: "產品",
        item: "product",
      },
    ],
  },
]);
const title = ref("查看日誌");

const items = ref([
  {
    Time: "2022-07-18",
    Name: "AAA",
    Content:
      "進入專案開始階段 齊助浪寶:7/3日確認需使用的演算法 (從0開始還是套現成模組) V.Dr:6/23簡報呈現內容初次討論 確認使用者登入介面以及蟲害的判斷條件(資料庫 機器學習) SPSS下載與嘗試是否能成為齊助浪寶的現成演算法",
  },
  {
    Time: "2022-07-18",
    Name: "AAA",
    Content:
      "進入專案開始階段 齊助浪寶:7/3日確認需使用的演算法 (從0開始還是套現成模組) V.Dr:6/23簡報呈現內容初次討論 確認使用者登入介面以及蟲害的判斷條件(資料庫 機器學習) SPSS下載與嘗試是否能成為齊助浪寶的現成演算法",
  },
  {
    Time: "2022-07-18",
    Name: "AAA",
    Content:
      "進入專案開始階段 齊助浪寶:7/3日確認需使用的演算法 (從0開始還是套現成模組) V.Dr:6/23簡報呈現內容初次討論 確認使用者登入介面以及蟲害的判斷條件(資料庫 機器學習) SPSS下載與嘗試是否能成為齊助浪寶的現成演算法",
  },
]);
</script>

<style lang="scss" scoped>
.overall-box {
  width: auto;
  height: auto;
}

.checkDiv {
  width: 60vw;
  height: 10vh;
  p {
    margin-bottom: 0;
  }
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
  width: 80%;
  height: 10%;
}
.text {
  width: 30%;
}
.checkBoxInner {
  overflow-y: scroll;
  height: 55vh;
}
.single-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
