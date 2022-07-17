<template>
  <div class="container-fluid px-5 pt-3">
    <div class="content-box inner">
      <p class="title"><strong>查看日誌</strong></p>
      <div class="d-flex align-items-center">
        <div class="dropdown mx-1 mt-1">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            班別
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li><a class="dropdown-item" value="1">選項一</a></li>
            <li><a class="dropdown-item" href="#">選項二</a></li>
            <li><a class="dropdown-item" href="#">選項三</a></li>
          </ul>
        </div>
        <div class="dropdown mx-1 mt-1">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            班級
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li><a class="dropdown-item" value="1">選項一</a></li>
            <li><a class="dropdown-item" href="#">選項二</a></li>
            <li><a class="dropdown-item" href="#">選項三</a></li>
          </ul>
        </div>
        <div class="dropdown mx-1 mt-1">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            專案
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li><a class="dropdown-item" value="1">選項一</a></li>
            <li><a class="dropdown-item" href="#">選項二</a></li>
            <li><a class="dropdown-item" href="#">選項三</a></li>
          </ul>
        </div>
      </div>
      <div class="d-flex align-items-center">
        <div class="dropdown mx-1 mt-1">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            本月
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li><a class="dropdown-item" value="1">選項一</a></li>
            <li><a class="dropdown-item" href="#">選項二</a></li>
            <li><a class="dropdown-item" href="#">選項三</a></li>
          </ul>
        </div>

        <!-- 日期選擇套件 Vue3-Datepicker -->
        <Datepicker class="datepicker mx-1 mt-1" v-model="date" range />
        <div class="mt-1">
          <button type="button" class="btn btn-primary confirm-btn">
            查詢
          </button>
        </div>
        <br />
      </div>

      <hr />
      <!-- <p>測試用內文</p> -->
      <div class="checkBox">
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
            <!-- <div>4</div> -->
          </div>
          <div>
            <router-link
              class="btn btn-primary confirm-btn"
              to="/company/userDiaryFeedback"
            >
              查看回覆</router-link
            >
          </div>
        </div>
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
            <!-- <div>4</div> -->
          </div>
          <div>
            <router-link
              class="btn btn-primary confirm-btn"
              to="/company/userDiaryFeedback"
            >
              查看</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const date = ref();

// For demo purposes assign range from the current date
onMounted(() => {
  const startDate = new Date();
  const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
  date.value = [startDate, endDate];
  return Date;
});
</script>

<style lang="scss" scoped>
.inner {
  width: 100%;
  height: 90vh;
  .checkDiv {
    width: 90%;
    height: 10vh;
  }
  .checkDiv:hover {
    background-color: #558aba;
    button {
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
    height: 450px;
    overflow-y: scroll;
  }
}
</style>
