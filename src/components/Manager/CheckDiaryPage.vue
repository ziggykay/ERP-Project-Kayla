<template>
	<!-- filter -->
	<div class="content-box filter-box">
		<p class="title"><strong>查看日誌</strong></p> 	  	
		<hr/>
		<div class="d-flex flex-wrap">
	  	<select class="selectInfo me-2" v-model="type" @change="axiosNumber">
	  		<option value="">請選擇班別</option>
				<option v-for="(data, index) of selectType" :value="data.item">
					{{ data.name}}
				</option>	    	 	
	  	</select>
	  	<select class="selectInfo me-2" v-model="number">
	  		<option value="">請選擇班級</option>
				<option v-for="(data, index) of selectNumber" :value="data.item">
					{{ data.name }}
				</option>	      	 	
	  	</select>		 
	  	<select class="selectInfo me-2" v-model="projectType" @change="axiosProject">
	  		<option value="">請選擇類型</option>
				<option v-for="(data, index) of selectProjectType" :value="data.item">
					{{ data.name }}
				</option>	      	 	
	  	</select>		  	 
	  	<select class="selectInfo me-2" v-model="project">
	  		<option value="">請選擇專案</option>
				<option v-for="(data, index) of selectProjct" :value="data.item">
					{{ data.name }}
				</option>	      	 	
	  	</select>	  		 	  	  	
		</div> 		 	
		<div class="d-flex mt-2 flex-wrap">
	  	<Datepicker class="datepicker mb-2 me-2 w-auto" v-model="date" range fixedStart/>
	  	<button class="confirm-btn btn btn-height" @click="search">搜尋</button>
		</div>
	</div>
  <!-- chart -->
  <div class="content-box overall-box">
    <div class="py-2 checkBoxInner">
      <div v-for="(data, index) of diaryData" class="content-box-border checkDiv d-flex">
        <div class="d-flex bigText">
          <div class="text align-self-center">
            <div>
              <p>日期</p>
              <p class="single-ellipsis">{{ data.Time }}</p>
            </div>
          </div>
          <div class="text align-self-center">
            <p>姓名</p>
            <p>{{ data.Name }}</p>
          </div>
          <div class="text align-self-center">
            <p>內文</p>

            <p class="single-ellipsis">{{ data.Content }}</p>
          </div>
        </div>
        <div class="align-self-center">
	        <button
	          class="btn btn-primary confirm-btn"
	          @click="checkUserInfo(data)"
	        >
	          詳細資訊
	        </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, computed, watch} from "vue"
import axios from 'axios'
import VChart from "vue-echarts";
import Overall from "../baseComponents/Overall.vue";
import { useRouter, useRoute } from 'vue-router'
import store from  "../../store";

const token = store.getters["auth/getToken"]
const router = useRouter()
// ==========================================================
// select option data
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

const type = ref("") // dynamic select option
const number = ref("")
const project = ref("")
const projectType = ref("")// fix select option


const selectType = ref([]) // dynamic select option value
const selectNumber = ref([])
const selectProjct = ref([])
const selectDate = ref([
	{
		name: "請選擇日期範圍",
		item: ""
	},					
	{
		name: "今日",
		item: "today"
	},
	{
		name: "本月",
		item: "month"
	}				 		 // fix select option	value //fix slect option value //fix select option value
]);
const selectProjectType = ref([
	{
		name: "專案",
		item: "專案"
	},					
	{
		name: "產品",
		item: "產品"
	},
])		

const axiosType = async() =>{
	// clear option valeu
	selectType.value = []
	selectNumber.value = []
	type.value = ''
	number.value = ''
	let href = 'http://54.186.56.114/diary/Getdatalist'	
	let postData = {}
	let config = {
    headers: {
			'authorization': `Bearer ${token}`
    }			
	}

	try{
		let { data } = await axios.post(href, postData, config)
		console.log(data)
		let type = data.data.type


		for(let i = 0; i < type.length; i++){
			selectType.value.push({
				name: type[i],
				item: type[i]
			})
		}
	}
	catch(e){
		console.log(e)
		alert("資料錯誤")
	}
}		
axiosType()
const axiosNumber = async() =>{
	// clear  option value
	selectNumber.value = []
	number.value = ''	
	let href = 'http://54.186.56.114/diary/Getdatalist'
	let postData = {}
	let config = {
    headers: {
			'authorization': `Bearer ${token}`
    }			
	}			
	if(type.value !== ""){
		try{
			let postData = {
				type: type.value
			}
			let { data } = await axios.post(href, postData,config)
			
			let number = data.data.number
			for(let i = 0; i < number.length; i++){
				selectNumber.value.push({
					name: number[i],
					item: number[i]
				})
			}
		}
		catch(e){
			console.log(e)
			alert("資料錯誤")
		}		
	}
	else{
		alert("請選擇資料")
	}
}

const axiosProject = async() =>{
	let href = "http://54.186.56.114/diary/Getdatalist";
	let config = {
    headers: {
			'authorization': `Bearer ${token}`
    }			
	}			
	selectProjct.value = [];
	project.value = ''
	
	try{
		let { data } = await axios.get(href, config)
		let filterProject = data.data.Project.filter((item)=>{
			return item.Status == projectType.value
		})
		filterProject.forEach(function(item, index){
			selectProjct.value.push({
				name: item.Project,
				item: item.Project
			})			
		})
	}
	catch(e){
		console.log(e)
	}
}
// ============================================================
// diary data
const diaryData = ref([])
const search = async() =>{
	let href = 'http://54.186.56.114/diary/ReadDiaryLog'
	let postData = {
		date_from: date.value[0],
		date_to: date.value[1],
		number: number.value,
		project: project.value,
		type: type.value
	}
	try{
		diaryData.value = []
		let { data } = await axios.post(href, postData, {headers: {'authorization': `Bearer ${token}`}})
		// console.log(data.data)
		data.data.forEach(function(item, index){
			diaryData.value.push(item)
		})
	}
	catch(e){
		console.log(e)
		alert("資料錯誤")
	}
}
// =========================================================
// to  /user/checkSelfDiary"
function checkUserInfo(data) {
  router.push({
    name: "CheckSelfDiary",
    params: {
    	user: JSON.stringify(data) 
    },
  });	
}
</script>

<style lang="scss" scoped>
.filter-box {
  height: auto;
  width: auto;
  .selectInfo {
    width: 100px;
    height: 38px;
    background-color: #e9f2ff;
    border-radius: 4px;
    border: none;
    cursor: pointer;
  }
  .btn-height {
    height: 38px;
  }
}		
.overall-box {
  width: auto;
  height: auto;
}

.checkDiv {
  width: 60vw;
  height: auto;
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