<template>
  <!-- <FilterSelect :parent-selectArr="selectArr" :parent-title="title"></FilterSelect> -->
  <div class="d-flex justify-content-center">
    <div class=" ">
      <div class="d-flex justify-content-evenly">
        <div class="content-box resbox-outter">
          <div class="content-box resbox ps-2"  v-for="data of questionList" :key="data">
            <div class="d-flex date-and-title justify-content-between tyh vccc" >
              <p class="ps-3">日期</p>
              <p class="">標題</p>
              <button
                type="button"
                class="btn btn-primary confirm-btn check-res mt-2 ms-5" @click="updateData(data)">查看回覆
              </button>
            </div>
            <div class="d-flex justify-content-evenly w-75 date-and-title-content" >
              <p class="pe-5">{{data.LeavingTime}}</p>
              <p class="dataTitle single-ellipsis">{{data.Title}}</p>
            </div>
          </div>
        </div>
        <div class="content-box question-box">
          <p class="title mb-3 ps-3 fw-bold w-25 text-center">提問</p>
          <div class="q-title">{{ selectData.Title }}</div>
          <p class="title ps-3 fw-bold w-25 text-center mt-3">內容</p>
          <div class="q-content">{{ selectData.question.content }}</div>
          <div>
            <p class="title ps-3 mt-3 fw-bold w-25 text-center">回覆</p>
            <div class="res-content">{{ selectData.question.response }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import FilterSelect from "../baseComponents/FilterSelect.vue";
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
		{
			selected: "month",
			data: [
	  		{
	  			name: "今日",
	  			item: "today"
	  		},
	  		{
	  			name: "本月",
	  			item: "month"
	  		}				 		
			]	  			
		},		  		  		
	]);	
	const title = "查看問題回覆"
//data
  const questionList = ref([
    {
      LeavingTime: '2022-07-09',
      Title: '電腦螢幕打不開',
      question: 
        {
          content: '今天上課發現電腦螢幕打不開，請問能幫忙維修嗎?',
          response: '這周會請相關人員前往維修，謝謝'
        },
    },
    {
      LeavingTime: '2022-07-13',
      Title: '教室冷氣故障',
      question: 
        {
          content: '教室椅子壞掉，請問能幫忙維修嗎',
          response: '這周會請相關人員前往維修，謝謝'
        },
    },
	]);
  const selectData = ref(questionList.value[0]);

  function updateData (data) {
    selectData.value = data
    console.log(selectData.value)
  }
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
  width: 97.5%;
  height: 180px;
  padding: 1rem;
  box-shadow: gray;
}
.main-outter {
  width: 100%;
  height: 70vh;
}
.resbox {
  width: 35vw;
  height: 13vh;
}
.resbox-outter {
  overflow-y: scroll;
  height: 60vh;
  width: 42vw;
  .date-and-title {
    color: #558aba;
  }
  .date-and-title-content {
    font-size: xx-small;
  }
}
.question-box {
  width: 34vw;
  height: 60vh;
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
    height: 11vh;
    margin: 0 auto;
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
.single-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
