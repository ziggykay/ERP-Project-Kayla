<template>
	<!--change button  -->
	<div class="boxContainer">
  	<button class="confirm-btn btn me-3 shadow "  :class="{'bg-white': !isGrade, 'text-black': !isGrade}" @click="changeShow">各別班級</button>
  	<button class="confirm-btn btn me-3 shadow"  :class="{'bg-white': isGrade, 'text-black': isGrade}" @click="changeShow">個別學員</button>
	</div>

	<template v-if="isGrade">
		<template v-if="gradeSelectArr[0]">
			<!--  filter-->
			<FilterSelect :parent-selectArr="gradeSelectArr" :parent-title="gradeTitle" @user-selectData="gradeData">
				<button class="confirm-btn btn btn-height ms-auto ">匯出此頁</button>	  	
			</FilterSelect>
		  <!-- overall -->
		  <Overall :parent-data="gradeAttendanceData"></Overall>			
		</template>

		<template v-else>
			<div class="content-box w-auto">
				尚未有資料  
		  </div> 	
		</template>
	  
	  <!-- chart -->
	  <div class="d-md-flex m-auto h-auto">
		  <div class="content-box overall-box chartContainer bar-width" >  
				<v-chart class="chartHeight" :option="piechart" autoresize/>  		
		  </div> 		  	
		  <div class="content-box overall-box chartContainer pie-width" >
				<v-chart class="chartHeight" :option="gradeBarchart" autoresize />   		
		  </div> 		  	
	  </div>  

	  <template v-if="gradeCompareSelectArr[0]">
			<!-- filter -->
			<FilterSelect :parent-selectArr="gradeCompareSelectArr" :parent-title="gradeCompare">
				<template v-slot:bar>
					<input type="checkbox" id="fn" value="fn" v-model="checkedGrades">
					<label for="fn">前端班</label>
					<input type="checkbox" id="bd" value="bd" v-model="checkedGrades">
					<label for="bd">數據班</label>
					<input type="checkbox" id="cd" value="cd" v-model="checkedGrades">
					<label for="cd">雲端班</label>					
				</template>	
			</FilterSelect>		  	
	  </template>

	  <!-- chart -->
	  <div class="content-box overall-box chartContainer" >
			<v-chart class="chartHeight" :option="gradeCompareBarchart" autoresize />  	
	  </div>	
	</template>

<!-- ============================================================================================================================= -->
	<template v-if="!isGrade">
		<template v-if="userSelectArr[0]">
			<!--  filter-->
			<FilterSelect :parent-selectArr="userSelectArr" :parent-title="userTitle" @user-selectData="userData">
				<button class="confirm-btn btn btn-height ms-auto ">匯出此頁</button>	  	
			</FilterSelect>
		  <!-- overall -->
		  <Overall :parent-data="userAttendanceData"></Overall>			
		</template>

		<template v-else>
			<div class="content-box">
				尚未有資料  
		  </div> 			
		</template>
	  
	  <!-- chart -->
	  <div class="content-box overall-box chartContainer" >
			<v-chart class="chartHeight" :option="userBarchart" autoresize />  	
	  </div>		   		
	</template>
</template>

<script setup>
	import {ref, onMounted, computed, watch} from "vue"
	import axios from 'axios'
	import VChart from "vue-echarts";
	import Overall from "../baseComponents/Overall.vue";
	import FilterSelect from "../baseComponents/FilterSelect.vue";
	
	// data
	// grade
	const gradeSelectArr = ref([
 		[
  		{
  			name: "前端班",
  			item: "fn"
  		},
  		{
  			name: "數據班",
  			item: "bd"
  		},
  		{
  			name: "雲端班",
  			item: "cd"
  		}	  		
		],
 		[
  		{
  			name: "101",
  			item: "101"
  		},
  		{
  			name: "102",
  			item: "102"
  		}		 		
		],		
 		[
  		{
  			name: "請選擇日期",
  			item: ""
  		}, 		
  		{
  			name: "今日",
  			item: "today"
  		},
  		{
  			name: "本月",
  			item: "month"
  		}				 		
		],		  		  		
	]);		
	const gradeTitle = ref("以班級篩選")

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
	// overall and chart data
	const gradeData = async(val)=>{
		let startdate = ''
		let stopdate = ''
		let group = ''
		let cur = ''

		startdate = val[0][0];
		stopdate = val[0][1];
		group = val[1][0]+val[1][1]
		cur = val[1][2]

		try{
			// get axios data
			let href = "http://ec2-34-221-251-1.us-west-2.compute.amazonaws.com:8080/count"
			let axiosData = ''
			if(cur == ''){
				let {data} = await axios.get(href, { params: { group, startdate, stopdate } })	
				axiosData = data.data
			}
			else{
				let {data} = await axios.get(href, { params: { group, cur}})	
				axiosData = data.data				
			}
			// // over all
			gradeAttendanceData.value[0].number = `${Math.round((axiosData[axiosData.length-1]["number of people"]*axiosData.length-axiosData[axiosData.length-1].absent)/(axiosData[axiosData.length-1]["number of people"]*axiosData.length)*100)}%`
			gradeAttendanceData.value[1].number = `${Math.round(axiosData[axiosData.length-1].late/(axiosData[axiosData.length-1]["number of people"]*axiosData.length)*100)}%`
			gradeAttendanceData.value[2].number = `${Math.round((axiosData[axiosData.length-1].absent)/(axiosData[axiosData.length-1]["number of people"]*axiosData.length)*100)}%`
			gradeAttendanceData.value[3].number = `${Math.round(axiosData[axiosData.length-1].excused/(axiosData[axiosData.length-1]["number of people"]*axiosData.length)*100)}%`

			// // pie chart
			piechart.value.series[0].data[0].value = axiosData[axiosData.length-1].regular
			piechart.value.series[0].data[1].value = axiosData[axiosData.length-1].late
			piechart.value.series[0].data[2].value = axiosData[axiosData.length-1].absent

			// // bar chart
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
		catch{
			alert("沒有該筆資料!")
		}
	}

	// gradecompare
	const checkedGrades = ref([])	
	const gradeCompareSelectArr =ref([
		[
  		{
  			name: "101",
  			item: "101"
  		},
  		{
  			name: "102",
  			item: "102"
  		}		 		
		],
		[
  		{
  			name: "請選擇日期",
  			item: ""
  		}, 		
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
	const gradeCompare = ref("班級比較")
	const gradeCompareBarchart = ref({
	  tooltip: {
	    trigger: 'axis',
	    axisPointer: {
	      type: 'shadow'
	    }
	  },
	  legend: {},
	  grid: {
	    left: '3%',
	    right: '4%',
	    bottom: '3%',
	    containLabel: true
	  },
	  xAxis: [
	    {
	      type: 'category',
	      data: ['7/01~7/06', '7/07~7/14', '7/07~7/14', '7/07~7/14', '7/07~7/14', '7/07~7/14', '7/07~7/14']
	    }
	  ],
	  yAxis: [
	    {
	      type: 'value'
	    }
	  ],
	  series: [
	    {
	      name: '正常到班',
	      type: 'bar',
	      stack: 'fn',
	      emphasis: {
	        focus: 'series'
	      },
	      data: [320, 332, 301, 334, 390, 330, 320]
	    },
	    {
	      name: '遲到',
	      type: 'bar',
	      stack: 'fn',
	      emphasis: {
	        focus: 'series'
	      },
	      data: [120, 132, 101, 134, 90, 230, 210]
	    },
	    {
	      name: '缺勤',
	      type: 'bar',
	      stack: 'fn',
	      emphasis: {
	        focus: 'series'
	      },
	      data: [220, 182, 191, 234, 290, 330, 310]
	    },
	    {
	      name: '正常到班',
	      type: 'bar',
	      stack: 'bd',
	      emphasis: {
	        focus: 'series'
	      },
	      data: [320, 332, 301, 334, 390, 330, 320]
	    },
	    {
	      name: '遲到',
	      type: 'bar',
	      stack: 'bd',
	      emphasis: {
	        focus: 'series'
	      },
	      data: [120, 132, 101, 134, 90, 230, 210]
	    },
	    {
	      name: '缺勤',
	      type: 'bar',
	      stack: 'bd',
	      emphasis: {
	        focus: 'series'
	      },
	      data: [220, 182, 191, 234, 290, 330, 310]
	    },   
	    {
	      name: '正常到班',
	      type: 'bar',
	      stack: 'cd',
	      emphasis: {
	        focus: 'series'
	      },
	      data: [320, 332, 301, 334, 390, 330, 320]
	    },
	    {
	      name: '遲到',
	      type: 'bar',
	      stack: 'cd',
	      emphasis: {
	        focus: 'series'
	      },
	      data: [120, 132, 101, 134, 90, 230, 210]
	    },
	    {
	      name: '缺勤',
	      type: 'bar',
	      stack: 'cd',
	      emphasis: {
	        focus: 'series'
	      },
	      data: [220, 182, 191, 234, 290, 330, 310]
	    },         
	  ]
	})

	// user
	const userSelectArr = ref([]);	 	
	const getUserSelectArr = async() =>{

			let href = 'http://localhost:80/api/diary/account'
			let type = "fn"
			let number = '101'


			try{
				// let { data } = await axios.get(href, { params: { type, number}})				
				userSelectArr.value = [
					[
						{
							name: "前端班",
							item: "fn"
						},
						{
							name: "數據班",
							item: "bd"
						},
						{
							name: "雲端班",
							item: "cd"
						}	  		
					],
					[
			  		{
			  			name: "101",
			  			item: "101"
			  		},
			  		{
			  			name: "102",
			  			item: "102"
			  		}		 		
					],
					[	 		
					],				
					[
						{
							name: "請選擇日期",
							item: ""
						},					
						{
							name: "今日",
							item: "today"
						},
						{
							name: "本月",
							item: "month"
						}				 		
					]	
				]
				userSelectArr.value[2].push({
		  			name: "Rossen",
		  			item: "rossen"
		  	})
				// for(let i = 0; i <= data.data.length - 1; i++){
				// 	userSelectArr.value[2].push({
		  // 			name: data.data[i].Name,
		  // 			item: data.data[i].Name
		  // 		})
				// }		  			
			}
			catch{
				alert("資料錯誤")
			}
	}		
	getUserSelectArr()

	const userTitle = ref("以學員篩選")

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
			title: "早退率",
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
	// overall and chart data
	const choseSelect = ref();
	const userData = (val)=>{
		choseSelect.value = {}
		choseSelect.value = {
			startdate: val[0][0],
			stopdate: val[0][1],
			group: val[1][0]+val[1][1],
			name: val[1][2],
			cur: val[1][3]
		}
	}
	const doAxios = async(group, startdate, stopdate, name ,cur)=>{
		// get axios data
		let href = "http://ec2-34-221-251-1.us-west-2.compute.amazonaws.com:8080/count"
		let axiosData = ''

		try{
			if(cur == ''){
				let {data} = await axios.get(href, { params: { group, startdate, stopdate, name}})	
				axiosData = data.data
			}
			else{
				let {data} = await axios.get(href, { params: { group, cur, name}})	
				axiosData = data.data				
			}			
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
		catch{
			alert("資料錯誤")
		}		
	}
	watch(choseSelect, (newVal, oldVal)=>{
		// get axios data
		doAxios(newVal.group, newVal.startdate, newVal.stopdate, newVal.name, newVal.cur)
	})

	// changeComponent
	const isGrade = ref(true)
	function changeShow(){
		isGrade.value = !isGrade.value
	}

</script>

<style lang="scss" scoped>
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

	