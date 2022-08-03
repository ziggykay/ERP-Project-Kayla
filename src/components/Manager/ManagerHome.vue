<template>
	<!-- filter -->
	<div class="content-box filter-box">
		<p class="title"><strong>以班級篩選</strong></p> 	  	
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
  <!-- overall -->
  <Overall :parent-data="gradeAttendanceData"></Overall>		
  <!-- chart -->
  <div class="d-md-flex m-auto h-auto">
	  <div class="content-box overall-box chartContainer bar-width" >  
			<v-chart class="chartHeight" :option="piechart" autoresize/>  		
	  </div> 		  	
	  <div class="content-box overall-box chartContainer pie-width" >
			<v-chart class="chartHeight" :option="gradeBarchart" autoresize />   		
	  </div> 		  	
  </div>  

<!-- diary =================================================================== -->
  <div class="d-md-flex m-auto h-auto">
	  <div class="content-box overall-box chartContainer bar-width" >  
			<v-chart class="chartHeight" :option="diaryPiechart" autoresize/>  		
	  </div> 		  	
	  <div class="content-box overall-box chartContainer pie-width" >
			<v-chart class="chartHeight" :option="diaryGradeBarchart" autoresize />   		
	  </div> 		  	
  </div>  
</template>

<script setup>
	import {ref, onMounted, computed, watch} from "vue"
	import axios from 'axios'
	import VChart from "vue-echarts";
	import Overall from "../baseComponents/Overall.vue";
	import store from "../../store"	


	const token = store.getters["auth/getToken"]

	// data
	// grade
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

	const selectType = ref([]) // dynamic select option value
	const selectNumber = ref([])
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
		}				 		 // fix select option	value
	]);		

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
// grade chart and overall========================================================================
	const gradeAttendanceData = ref([
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
			title: "早退率",
			number: "",
			color: "#1AAF68"
		}
	]);
	const gradeBarchart = ref({
    title: {
      text: '出勤狀況',
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
    	name: '日期',
    	nameLocation : 'end',      
      nameTextStyle: {
      	fontWeight: "bolder"
      }
    },
    yAxis: {
    	name: '人數',
    	nameLocation : 'end',
    },
	  series: [
	    {
	    	name: '正常到班',
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
	    	name: '遲到',
	      data: [],
	      type: 'bar',
	      stack: 'x',
	      itemStyle: {
					color: '#9FE080'
	      },			      
	    },
	    {
	    	name: '缺勤',
	      data: [],
	      type: 'bar',
	      stack: 'x',
	      itemStyle: {
					color: '#FAC858'
	      },			      
	    }
	  ],	  		
	})
	const piechart = ref({
	  title: {
	    text: "出勤狀況比例",
			textStyle: {
			    color: '#558ABA'
			}
	  },
	  tooltip: {
	    trigger: "item",
	    formatter: "{a} <br/>{b} : {c} ({d}%)"
	  },
	  legend: {
	    orient: "vertical",
	    left: "right",
	    data: ["出勤", "遲到數", "缺席"]
	  },
	  series: [
	    {
	      name: "整體出勤狀況",
	      type: "pie",
	      radius: "55%",
	      center: ["50%", "60%"],
	      data: [
	        { value:'', name: "出勤" },
	        { value:'', name: "遲到數" },
	        { value:'', name: "缺席" },
	      ],
        label : {
            show: true, position: 'inner',
            formatter : "{d}%"
        },
        labelLine : {
            show : false
        }      
	    }
	  ]
	});

	// diary
	const diaryGradeBarChart = ref({
    title: {
      text: '本日日誌登打率',
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
    	name: '日期',
    	nameLocation : 'end',      
      nameTextStyle: {
      	fontWeight: "bolder"
      }
    },
    yAxis: {
    	name: '人數',
    	nameLocation : 'end',
    },
	  series: [
	    {
	    	name: '已登打',
	      data: [],
	      type: 'bar',
	      stack: 'x',
	      itemStyle: {
					color: '#9FE080'
	      },			      
	    },
	    {
	    	name: '尚未登打',
	      data: [],
	      type: 'bar',
	      stack: 'x',
	      itemStyle: {
					color: '#FAC858'
	      },			      
	    }
	  ],	  		
	})
	const diaryPieChart = ref({
	  title: {
	    text: "本月日誌登打率",
			textStyle: {
			    color: '#558ABA'
			}
	  },
	  tooltip: {
	    trigger: "item",
	    formatter: "{a} <br/>{b} : {c} ({d}%)"
	  },
	  legend: {
	    orient: "vertical",
	    left: "right",
	    data: ["已登打", "尚未登打"]
	  },
	  series: [
	    {
	      name: "整體登打狀況",
	      type: "pie",
	      radius: "55%",
	      center: ["50%", "60%"],
	      data: [
	        { value:'', name: "已登打" },
	        { value:'', name: "尚未登打" },
	      ],
        label : {
            show: true, position: 'inner',
            formatter : "{d}%"
        },
        labelLine : {
            show : false
        }      
	    }
	  ]
	});

	// overall and chart data
	const search = ()=>{
		const getPunchData = async () => {
			try{
				// get axios data
				let href = "http://54.186.56.114/count"
				let axiosData = ''
				let config = {
					params: {
						group: type.value+number.value, 
						startdate: date.value[0], 
						stopdate: date.value[1] 			
					},
					headers: {
						'authorization': `Bearer ${token}`
					}
				}
				let {data} = await axios.get(href,config)	
				axiosData = data.data

				// over all
				gradeAttendanceData.value[0].number = `${Math.round((axiosData[axiosData.length-1]["number of people"]*axiosData.length-axiosData[axiosData.length-1].absent)/(axiosData[axiosData.length-1]["number of people"]*axiosData.length)*100)}%`
				gradeAttendanceData.value[1].number = `${Math.round(axiosData[axiosData.length-1].late/(axiosData[axiosData.length-1]["number of people"]*axiosData.length)*100)}%`
				gradeAttendanceData.value[2].number = `${Math.round((axiosData[axiosData.length-1].absent)/(axiosData[axiosData.length-1]["number of people"]*axiosData.length)*100)}%`
				gradeAttendanceData.value[3].number = `${Math.round(axiosData[axiosData.length-1].excused/(axiosData[axiosData.length-1]["number of people"]*axiosData.length)*100)}%`

				// pie chart
				piechart.value.series[0].data[0].value = axiosData[axiosData.length-1].regular
				piechart.value.series[0].data[1].value = axiosData[axiosData.length-1].late
				piechart.value.series[0].data[2].value = axiosData[axiosData.length-1].absent

				// bar chart
				// 先清空值再更改新資料
				gradeBarchart.value.xAxis.data = [];
				gradeBarchart.value.series[0].data = [];
				gradeBarchart.value.series[1].data = [];
				gradeBarchart.value.series[2].data = []
				for(let i = 0; i < axiosData.length-1; i++){
					gradeBarchart.value.xAxis.data.push(axiosData[i].day)
					gradeBarchart.value.series[0].data.push(axiosData[i].regular)
					gradeBarchart.value.series[1].data.push(axiosData[i].late)
					gradeBarchart.value.series[2].data.push(axiosData[i].absent)
				}
			}
			catch(e){
				console.log(e)
				alert("沒有該筆資料!")
			}
		}
		const getDiaryData = async () => {
			try{
				// get axios data
				let href = "http://54.186.56.114/typingrate"
				let axiosData = ''
				let config = {
					params: {
						group: type.value+number.value, 
						time:'month'						
					},
					headers: {
						'authorization': `Bearer ${token}`
					}					
				}
				let {data} = await axios.post(href, config)	
				axiosData = data.data

				// pie chart
				diaryPieChart.value.series[0].data[0].value = axiosData[axiosData.length-1].regular
				diaryPieChart.value.series[0].data[1].value = axiosData[axiosData.length-1].late
				diaryPieChart.value.series[0].data[2].value = axiosData[axiosData.length-1].absent

				// bar chart
				// 先清空值再更改新資料
				gradeBarchart.value.xAxis.data = [];
				gradeBarchart.value.series[0].data = [];
				gradeBarchart.value.series[1].data = [];
				gradeBarchart.value.series[2].data = []
				for(let i = 0; i < axiosData.length-1; i++){
					gradeBarchart.value.xAxis.data.push(axiosData[i].day)
					gradeBarchart.value.series[0].data.push(axiosData[i].regular)
					gradeBarchart.value.series[1].data.push(axiosData[i].late)
					gradeBarchart.value.series[2].data.push(axiosData[i].absent)
				}
			}
			catch(e){
				console.log(e)
				alert("沒有該筆資料!")
			}
		}
		getPunchData()
	}

	//grade compare ==================================================================
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

	