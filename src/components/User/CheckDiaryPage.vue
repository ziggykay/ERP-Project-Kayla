<template>
  <div class="container pt-3 inner">
    <div class="col-12">
      <filterSelect
        class="m-0"
        :parent-selectArr="selectArr"
        :parent-title="title"
      >
        <input type="text" placeholder="123" />
      </filterSelect>
    </div>
    <div class="col-12 mt-3">
      <div class="content-box checkBox">
        <div class="py-2 checkBoxInner">
          <div v-for="data in items" class="content-box-border checkDiv d-flex">
            <div class="d-flex bigText">
              <div class="text">
                <p>日期</p>
                <p>{{ data.Time }}</p>
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
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import filterSelect from "../baseComponents/FilterSelect.vue";

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
body {
  margin: 0;
  padding: 0;
}
.inner {
  width: 100%;
  height: 90vh;

  .checkDiv {
    width: 90%;
    height: 5rem;
    margin-top: 5px;
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
  .checkBox {
    width: 100%;
    height: 60vh;
    margin: 0;

    .checkBoxInner {
      overflow-y: scroll;
      height: 55vh;
    }
  }
}
.single-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
