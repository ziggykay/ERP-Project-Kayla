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
	  	<Datepicker class="datepicker mb-2 me-2 w-auto" v-model="date" range/>
	  	<button class="confirm-btn btn btn-height" @click="search">搜尋</button>
		</div>
	</div>

  <!-- chart -->
  <div class="content-box overall-box">
    <div class="py-2 checkBoxInner">
      <div v-for="data in items" class="content-box-border checkDiv d-flex">
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
import {ref, onMounted, computed, watch} from "vue"
import axios from 'axios'
import VChart from "vue-echarts";
import Overall from "../baseComponents/Overall.vue";

	const date = ref(""); 	// date
	onMounted(() => {
    const startDate = new Date(2021, 11, 16);
    const endDate = new Date(2022, 4, 27)
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
		// clear  option valeu
		selectType.value = []
		selectNumber.value = []
		type.value = ''
		number.value = ''
		let href = 'http://54.186.56.114:8081/Getdatalist'

		try{
			let { data } = await axios.post(href)
			let type = data.data.type


			for(let i = 0; i < type.length; i++){
				selectType.value.push({
					name: type[i],
					item: type[i]
				})
			}
		}
		catch{
			alert("資料錯誤")
		}
	}		
	axiosType()

	const axiosNumber = async() =>{
		// clear  option valeu
		selectNumber.value = []
		number.value = ''	
		let href = 'http://54.186.56.114:8081/Getdatalist'

		if(type.value !== ""){
			try{
				let postData = {
					type: type.value
				}
				let { data } = await axios.post(href, postData)
				
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
		let href = "http://54.186.56.114:8081/Getdatalist";
		selectProjct.value = [];
		project.value = ''
		
		try{
			let { data } = await axios.get(href)
			let filterProject = data.data.Project.filter((item)=>{
				return item.Status == projectType.value
			})
			for(let i = 0; i <= filterProject.length; i++){
				selectProjct.value.push({
					name: filterProject[i].Project,
					item: filterProject[i].Project
				})
			}
		}
		catch(e){
			console.log(e)
		}
	}







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
