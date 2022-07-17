<template>
  <!-- 已結案區 -->
  <div class="d-flex justify-content-center">
    <div class="content-box main-outter">
      <div class="title p-3 fw-bold">已結案區</div>
      <!-- 日期選擇套件 Vue3-Datepicker -->
      <div class="d-md-flex p-3">
        <select class="me-3 selectInfo">
          <option>本日</option>
          <option>本月</option>
        </select>
        <Datepicker
          class="w-25 dateInfo datepicker dp__theme_light"
          v-model="date"
          range
        />
      </div>
      <div class="d-flex justify-content-start p-3 border-bottom pb-0"></div>
      <div class="d-flex justify-content-evenly">
        <div class="resbox-outter">
          <div class="content-box resbox ps-2">
            <div class="d-flex justify-content-between">
              <div class="d-flex date-and-title w-50 justify-content-evenly">
                <p class="">日期</p>
                <p>姓名</p>
                <p>問題</p>
              </div>
              <div>
                <button
                  type="button"
                  class="btn btn-primary confirm-btn check-res mt-2 ms-3"
                >
                  查看
                </button>
              </div>
            </div>
            <div
              class="d-flex justify-content-around w-75 date-and-title-content"
            >
              <p class="ps-4">2022/07/01</p>
              <p>王阿明</p>
              <p>我是2022/06/20請假，但是系統...</p>
            </div>
          </div>
        </div>
        <div>
          <div class="content-box question-box">
            <p class="title mb-3 ps-3 fw-bold w-25 text-center">提問</p>
            <div class="text-center">
              <input class="q-title" type="text" placeholder="請輸入問題標題" />
            </div>
            <!-- <div class="q-title text-center">日誌打錯專案名字</div> -->
            <div class="text-center mt-3">
              <textarea
                class="q-content"
                name=""
                id=""
                cols="30"
                rows="10"
                placeholder="請輸入問題內容..."
              ></textarea>
            </div>
            <div>
              <p class="title ps-3 mt-3 fw-bold w-25 text-center">回覆</p>
              <div class="res-content"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SystemManage from "../../views/manager/SystemManageView.vue";
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
.selectInfo {
  width: 70px;
  height: 38px;
  background-color: #e9f2ff;
  border-radius: 4px;
  border: none;
  cursor: pointer;
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
  overflow-y: scroll;
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
    overflow-y: scroll;
  }
  .res-content {
    border: solid 1px;
    width: 22vw;
    height: 11vh;
    margin: 0 auto;
  }
}
div.resbox:hover {
  color: white;
  background: #558aba;
  transition-duration: 0.3s;
  .check-res {
    background: #22496d;
  }
  p {
    color: white;
  }
}
</style>
