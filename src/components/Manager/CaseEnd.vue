<template>
  <!-- 已結案區 -->
  <!-- filter -->
<FilterSelect :parent-selectArr="selectArr" :parent-title="title" @user-selectData="userData"></FilterSelect>
  <div class="d-flex justify-content-center">
    <div class="content-box main-outter">
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
import SystemManage from "/src/views/Manager/SystemManageView.vue";
import FilterSelect from "../baseComponents/FilterSelect.vue";
import { ref, onMounted } from "vue";
const date = ref();
// For demo purposes assign range from the current date
onMounted(() => {
  const startDate = new Date();
  const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
  date.value = [startDate, endDate];
  return Date;
});
// filter-data
	const selectArr = ref([
		[
			{
				name: "今日",
				item: "today"
			},
			{
				name: "本月",
				item: "month"
			}				 		
		]
	]);
	const title = "已結案區"
</script>

<style lang="scss" scoped>
.filter-select{
  width:100%
}
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
  width: 97.5%;
  height: 180px;
  padding: 1rem;
  box-shadow: gray;
}
.main-outter {
  width: 100%;
  height: 32rem;
}
.resbox {
  width: 34rem;
  height: 6rem;
}
.resbox-outter {
  overflow-y: scroll;
  height: 28rem;
  width: 40rem;
  .date-and-title {
    color: #558aba;
  }
  .date-and-title-content {
    font-size: xx-small;
  }
}
.question-box {
  width: 30rem;
  height: 27rem;
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
