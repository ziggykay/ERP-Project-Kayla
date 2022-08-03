<template>
  <!-- filter -->
  <div class="content-box">
		<p class="title"><strong>已結案區</strong></p> 	  	
		<hr/>	
		<div class="d-flex mt-2 flex-wrap">
		  <Datepicker class="datepicker mb-2 me-2 w-auto" v-model="date" range/>
		  <button class="confirm-btn btn btn-height" @click="search">搜尋</button>
		</div>
	</div>
  <!-- 已結案區	 -->
<div class="d-flex container-out">
  <div class="content-box main-outter">
    <div class="d-flex justify-content-start p-3 "></div>
    <!-- v-if="unrepliedsid.length!=0" -->
    <div class="d-flex justify-content-evenly">
      <div class="resbox-outter">
        <div class="content-box resbox res-box-hover ps-2" v-for="(data,index) of finishData" :key="index" >
          <div class="d-flex justify-content-between">
            <div class="d-flex date-and-title w-50 justify-content-around ms-4">
              <p class="">日期</p>
              <p class="">姓名</p>
              <p class="">問題</p>
            </div>
            <button type="button" class="btn btn-primary confirm-btn check-res-hover mt-2 ms-3"
               @click="updateData(data)" >查看</button>
          </div>
          <div class="d-flex justify-content-around w-50 date-and-title-content ms-5">
            <p class="text-ellipsis ms-1">{{data.LeavingTime}}</p>
            <p class="text-ellipsis ms-3">{{data.Name}}</p>
            <p class="text-ellipsis ">{{data.Title}}</p>
          </div>
        </div>
      </div>
      <!-- 查看區 -->
      <template v-if="finishData.length > 0">
        <div class="content-box question-box">
          <p class="title fw-bold text-start">問題</p>
          <p class="q-title">{{selectData.Title}}</p>
          <p class="title fw-bold text-start mt-2">內容</p>
            <div class="q-content">{{selectData.Content}}</div>
            <p class="title ps-3 mt-2 fw-bold text-start">回覆</p>
            <textarea class="q-content d-block" cols="50" rows="3" placeholder="請輸入回覆內容..."
              v-model="selectData.ReplyContent">
            </textarea>
        </div>      	
      </template>
    </div>
    <!-- <div v-else><p class="text-center fs-5">尚無資料</p></div> -->
  </div>
</div>
</template>

<script setup>
import SystemManage from "/src/views/Manager/SystemManageView.vue";
import FilterSelect from "../baseComponents/FilterSelect.vue";
import { ref, computed, onMounted, watch } from "vue";
import { useStore, mapActions, mapState } from "vuex";
import axios from 'axios'

const store = useStore()
const token = store.getters["auth/getToken"]

	const date = ref(""); 	// date
	onMounted(() => {
    const startDate = new Date(2022, 5, 2);
    const endDate = new Date(2022, 7, 32)
    date.value = [startDate, endDate]	
	})
	watch(date, (newVal, oldVal) => { //  set date to yyyy-mm-dd
		for(let i = 0; i <= date.value.length - 1; i++){
			date.value[i] = newVal[i].toISOString().split('T')[0] 
		}
	});

// =====================================================================
// get finish data
const finishData = ref([])
const search = async()=>{
	let href = 'http://54.186.56.114/diary/Endmessage'	
	let config = {
		params: {
			date_from: date.value[0],
			date_to: date.value[1]
		},
    headers: {
			'authorization': `Bearer ${token}`
    }			
	}

	try{
		finishData.value = []
		let { data } = await axios.get(href, config)
		// console.log(data.data)
		for(let i = 0; i < data.data.length; i++){
			finishData.value.push(data.data[i])
		}		

	}
	catch(e){
		console.log(e)
		alert("資料錯誤")
	}		
}
// ==================================================================
// get select finish data 
const selectData = ref({})
const updateData = (data)=>{
	// console.log(data)
	selectData.value = data
	// console.log(selectData.value)
} 









  // //store
  // const store = useStore()
  // const unreplieds = computed(()=>  store.state.unreplieds)
  // const unrepliedsid = store.getters.unrepliedsid

  // //查看按鈕
  // const selectData = ref(unreplieds.value[0]);
  // function updateData (data) {
  //   selectData.value = data
  //   console.log(selectData.value)
  // }
</script>

<style lang="scss" scoped>
.container-out{
  width: 100%;
}
.content-box {
  margin: 1rem;
  background-color: #fff;
  // width: 300px;
  width: 97%;
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
  width: auto;
  height: 6rem;
}
.resbox-outter {
  overflow-y: scroll;
  height: 28rem;
  width: 100%;
  .date-and-title {
    color: #558aba;
  }
  .date-and-title-content {
    font-size: xx-small;
  }
}
.question-box {
  width:70%;
  height: auto;
  .title {
    color: #558aba;
  }
  .q-title {
    border: solid 1px;
    width:100%;
    min-width: 350px;
    height: auto;
    margin: 0 auto;
  }
  .q-content {
    border: solid 1px;
    width:100%;
    min-width: 350px;
    height: 5rem;
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