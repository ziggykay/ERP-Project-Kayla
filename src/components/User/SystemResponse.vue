<template>

  <!-- Date-Picker -->
  <div class="content-box filter-box">
    <p class="title"><strong>查看問題回覆</strong></p> 	  	
		<hr/>
		<div class="d-flex mt-2 flex-wrap">
	  	<!-- <Datepicker class="datepicker mb-2 me-2 w-auto" v-model="date" range fixedStart/> -->
	  	<button class="confirm-btn btn btn-height" @click="search">搜尋</button>
		</div>
  </div>	

  <div class="d-flex justify-content-center">
    <div class=" ">
      <div class="d-flex justify-content-evenly">
        <div class="content-box resbox-outter">
          <div class="content-box resbox ps-2"  v-for="(data,index) of questionList" :key="data">
            <div class="d-flex date-and-title justify-content-between" >
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
          <div class="q-content">{{ selectData.Content }}</div>
          <div>
            <p class="title ps-3 mt-3 fw-bold w-25 text-center">回覆</p>
            <div class="res-content">{{ selectData.ReplyContent }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import FilterSelect from "../baseComponents/filterSelect.vue";
import store from  "../../store";
import axios from "axios";

const token = store.getters["auth/getToken"]

// ============================================================
const date = ref(""); 	// date
onMounted(() => {
  const startDate = new Date(2022, 6, 2);
  const endDate = new Date(2022, 6, 31)
  date.value = [startDate, endDate]	
})
watch(date, (newVal, oldVal) => { //  set date to yyyy-mm-dd
	for(let i = 0; i <= date.value.length - 1; i++){
		date.value[i] = newVal[i].toISOString().split('T')[0] 
	}
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
// ======================================================================
const questionList = ref([])
const search = async()=>{
	let href = 'http://54.186.56.114/diary/Message'
	try{
		questionList.value = []
		let { data } = await axios.get(href, {headers: {'authorization': `Bearer ${token}`}})
		// console.log(data)
		for(let i = 0; i < data.data.length; i++){
			questionList.value.push({
			  Content: data.data[i].Content,
			  LeavingTime: data.data[i].LeavingTime,
			  ReplyContent: data.data[i].ReplyContent,
			  ReplyingTime: data.data[i].ReplyingTime,
			  Title: data.data[i].Title	
			})
		}
	}
	catch(e){
		console.log(e)
		alert("資料錯誤")
	}


}
// ============================================================
const selectData = ref({})
const updateData = (data)=>{
	selectData.value = data
	// console.log(selectData.value)
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
