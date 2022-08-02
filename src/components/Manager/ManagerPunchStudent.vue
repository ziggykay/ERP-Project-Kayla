<template>
	<!--  filter-->
	<div class="content-box filter-box">
		<p class="title"><strong>以學員篩選</strong></p> 	  	
		<hr/>
		<div class="d-flex flex-wrap">
	  	<select class="selectInfo me-2" v-model="type" @change="axiosNumber">
	  		<option value="">請選擇班別</option>
				<option v-for="(data, index) of selectType" :value="data.item">
					{{ data.name}}
				</option>	    	 	
	  	</select>
	  	<select class="selectInfo me-2" v-model="number" @change="axiosName">
	  		<option value="">請選擇班級</option>
				<option v-for="(data, index) of selectNumber" :value="data.item">
					{{ data.name }}
				</option>	      	 	
	  	</select>		  
	  	<select class="selectInfo me-2" v-model="name">
	  		<option value="">請選擇學生</option>
				<option v-for="(data, index) of selectName" :value="data.item">
					{{ data.name }}
				</option>	      	 	
	  	</select>			 	  	
<!-- 	  	<select class="selectInfo me-2">
				<option v-for="(data, index) of selectDate" :value="data.item">
					{{ data.name }}
				</option>	      	 	
	  	</select>		 -->	  	
		</div>  	
		<div class="d-flex mt-2 flex-wrap">
	  	<Datepicker class="datepicker mb-2 me-2 w-auto" v-model="date" range/>
	  	<button class="confirm-btn btn btn-height" @click="search">搜尋</button>
		</div>
	</div>	
	<!-- <button class="confirm-btn btn btn-height ms-auto ">匯出此頁</button>	 -->

	<!-- overall -->
	<Overall :parent-data="userAttendanceData"></Overall>			
	<!-- chart -->
	<div class="content-box overall-box chartContainer" >
	<v-chart class="chartHeight" :option="userBarchart" autoresize />  	
	</div>		   		
</template>

<script setup>
	import {ref, onMounted, computed, watch} from "vue"
	import axios from 'axios'
	import VChart from "vue-echarts";
	import Overall from "../baseComponents/Overall.vue";
	import store from "../../store"

	const token = store.getters["auth/getToken"]

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
	const name = ref("") 
	const status = ref("")// fix select option

	const selectType = ref([]) // dynamic select option value
	const selectNumber = ref([])
	const selectName = ref([])	
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
		}				 		// fix select option	value
	]);		

	const axiosType = async() =>{
		// clear  option valeu
		selectType.value = []
		selectNumber.value = []
		selectName.value = []
		type.value = ''
		number.value = ''
		name.value = ''		
		let href = 'http://54.186.56.114/diary/Getdatalist'
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
		selectName.value = []
		number.value = ''
		name.value = ''		
		let href = 'http://54.186.56.114/diary/Getdatalist'

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

	const axiosName = async() =>{
		// clear  option valeu
		selectName.value = []
		name.value = ''		
		let href = 'http://54.186.56.114/diary/Getdatalist'
		if(number.value !== ""){
			try{
				let postData = {
					type: type.value,
					number: number.value
				}
				let { data } = await axios.post(href, postData)
				let name = data.data.name
				for(let i = 0; i < name.length; i++){
					selectName.value.push({
						name: name[i].Name,
						item: name[i].Name
					})
				}
			}
			catch{
				alert("資料錯誤")
			}		
		}
		else{
			alert("請選擇資料")
		}
	}



// overvall and chart =================================================================
	const userAttendanceData = ref([
		{
			title: "出席率",
			number: "",
			color: "#558ABA"
		},
		{
			title: "遲到率",
			number: "",
			color: "#1AAF68"
		},
		{
			title: "缺席率",
			number: "",
			color: "#1AAF68"
		},
		{
			title: "請假率",
			number: "",
			color: "#1AAF68"
		}
	]); 	
	const userBarchart = ref({
    title: {
      text: '出席狀況',
			textStyle: {
			    color: '#558ABA'
			}
    },
    tooltip: {},
    legend: {
    	left: "right",
    },
    xAxis: {
      data: [],
      nameTextStyle: {
      	fontWeight: "bolder"
      }
    },
    yAxis: {
			nameTextStyle: {
      	fontWeight: "bolder"
      }
    },
	  series: [
	    {
	    	name: '到班時數',
	      data: [],
	      type: 'bar',
	      stack: 'x',
	      itemStyle: {
					color: '#558ABA'
	      },
	      // barWidth: '20%',
				// barCategoryGap: '5%'
	    },
	    {
	    	name: '缺席時數',
	      data: [],
	      type: 'bar',
	      stack: 'x',
	      itemStyle: {
					color: '#FF6A3C'
	      },			      
	    }
	  ],	  		
	})	  		

	const search = async()=>{
		// get axios data
		let href = "http://54.186.56.114/count"
		let config = {
			headers: {
				'authorization': `Bearer ${token}`
			},
			params: { 
				group: type.value+number.value, 
				startdate: date.value[0], 
				stopdate: date.value[1], 
				name: name.value
			}			
		}				
		let axiosData = ''
		try{
			let {data} = await axios.get(href, config)	
			axiosData = data.data		
				// over all
			userAttendanceData.value[0].number = `${Math.round((axiosData[axiosData.length-1]["number of people"]*axiosData.length-axiosData[axiosData.length-1].absent)/(axiosData[axiosData.length-1]["number of people"]*axiosData.length)*100)}%`
			userAttendanceData.value[1].number = `${Math.round(axiosData[axiosData.length-1].late/(axiosData[axiosData.length-1]["number of people"]*axiosData.length)*100)}%`
			userAttendanceData.value[2].number = `${Math.round((axiosData[axiosData.length-1].absent)/(axiosData[axiosData.length-1]["number of people"]*axiosData.length)*100)}%`
			userAttendanceData.value[3].number = `${Math.round(axiosData[axiosData.length-1].excused/(axiosData[axiosData.length-1]["number of people"]*axiosData.length)*100)}%`			
			//barcart
			// 清空資料再更新
			userBarchart.value.xAxis.data = []
			userBarchart.value.series[0].data = []
			userBarchart.value.series[1].data = []	

			for(let i = 0; i < axiosData.length - 1; i++){
				userBarchart.value.xAxis.data.push(axiosData[i].day)
				userBarchart.value.series[0].data.push(axiosData[i].attendancehours)
				userBarchart.value.series[1].data.push(axiosData[i].lackhours)
			}
		}
		catch(e){
			console.log(e)
			alert("沒有該筆資料")
		}		
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
.boxContainer{
	margin: 1rem;
}	
.overall-box{
  width: auto;
  height: auto;

}

.check-info{
	border-radius: 4px;
	cursor: pointer;		
}		
.chartContainer{
	height: 70vh;
	.chartHeight{
		height: 100%
	}
}		
.bar-width{
	width: 40%
}
.pie-width{
	width: 60%;
}
</style>

	