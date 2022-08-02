<template>
<!-- filter -->
  <div class="content-box filter-box">
		<p class="title"><strong>查看問題回覆</strong></p> 	  	
		<hr/>
	  <div class="d-flex mt-2 flex-wrap">
		  <Datepicker class="datepicker mb-2 me-2 w-auto" v-model="date" range/>
		    <button class="confirm-btn btn btn-height" @click="search">搜尋</button>
		</div>
	</div>	
  <div class="d-flex container-out">
    <div class="content-box main-outter">
    <div class="d-flex justify-content-start p-3 "></div>
      <div class="d-flex justify-content-evenly" v-if="unrepliedsid.length!=0">
        <div class="resbox-outter">
          <!-- 尚未按回覆 -->
          <div class="content-box resbox res-box-hover ps-2">
            <div class="d-flex justify-content-between">
              <div class="d-flex date-and-title w-50 justify-content-around ms-4">
                <p class="">日期</p>
                <p class="">問題</p>
              </div>
                <button type="button" class="btn btn-primary confirm-btn check-res-hover mt-2 ms-3"
                @click="updateData()" >查看</button>
            </div>
            <div class="d-flex justify-content-around w-50 date-and-title-content ms-5">
              <p class="text-ellipsis ms-5">XXX</p>
              <p class="text-ellipsis ms-5">XXX</p>
            </div>
          </div>
        </div>
        <!-- 回覆區 -->
        <div class="content-box question-box">
          <p class="title fw-bold text-start">問題</p>
          <p class="q-title">XXX</p>
          <p class="title fw-bold text-start mt-2">內容</p>
          <div class="q-content">XXX</div>
          <div>
            <p class="title ps-3 mt-2 fw-bold text-start">回覆</p>
            <div class="q-content d-block">XXX</div>
          </div>
        </div>
      </div>
      <div v-else><p class="text-center fs-5">尚無資料</p></div>
  </div>
</div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import FilterSelect from "../baseComponents/filterSelect.vue";
import store from  "../../store";
import axios from "axios";
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
		let { data } = await axios.get(href, {headers: {'authorization': `Bearer ${store.state.token}`}})
		console.log(data)
		// for(let i = 0; i < data.data.length; i++){
		// 	questionList.value.push({
		// 	  Content: data.data[i].Content,
		// 	  LeavingTime: data.data[i].LeavingTime,
		// 	  ReplyContent: data.data[i].ReplyContent,
		// 	  ReplyingTime: data.data[i].ReplyingTime,
		// 	  Title: data.data[i].Title	
		// 	})
		// }
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
}

</script>

<style lang="scss" scoped>
.container-out{
  width: 100%;
}
.content-box {
  margin: 1rem;
  background-color: #fff;
  // width: 300px;
  width: 98%;
  height: 180px;
  padding: 1rem;
  box-shadow: gray;
}
.main-outter {
  // width: 100%;
  // width: auto;
  height: auto;
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
  width: 28rem;
  height: auto;
  .title {
    color: #558aba;
  }
  .q-title {
    border: solid 1px;
    width: auto;
    height: auto;
    margin: 0 auto;
  }
  .q-content {
    border: solid 1px;
    width: auto;
    height: 5rem;
    margin: 0 auto;
  }
  .res-content {
    border: solid 1px;
    width: 22vw;
    height: 11vh;
    margin: 0 auto;
  }
}
div.res-box-hover:hover {
  color: white;
  background: #558aba;
  transition-duration: 0.3s;
  .check-res-hover {
    background: #22496d;
  }
  p {
    color: white;
  }
}
.case-end {
  background: #fa2323;
  &:hover {
    background: #e01010;
  }
}
textarea {
  outline: none;
  resize: none;
}
.text-ellipsis{
  width: 6rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
