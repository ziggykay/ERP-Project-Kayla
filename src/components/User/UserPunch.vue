<template>
	<!--change button  -->
	<div class="boxContainer">
  	<button class="btn confirm-btn btn me-3 shadow" :class="{'bg-white': !isChart, 'text-black': !isChart}" @click="changeShow">圖表顯示 </button>
  	<button class="btn confirm-btn btn me-3 shadow" :class="{'bg-white': isChart, 'text-black': isChart}" @click="changeShow">表格顯示 </button>		
	</div>

	<template v-if="isChart">
		<!-- filter -->
		<div class="content-box filter-box">
			<p class="title"><strong>使用者出勤紀錄資訊</strong></p> 	  	
			<hr/>
			<div class="d-flex flex-wrap">		 	  	
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
	  <Overall :parent-data="AttendanceData">
		</Overall>

	  <!-- chart -->
	  <div class="content-box overall-box chartContainer">
			<v-chart class="chartHeight" :option="barchart" autoresize />  	
	  </div> 		
	</template>

	<template v-else>
		<!-- filter -->
		<div class="content-box filter-box">
			<p class="title"><strong>使用者出勤資訊</strong></p> 	  	
			<hr/>
			<div class="d-flex flex-wrap">		 	  	
		  	<select class="selectInfo me-2" v-model="status">
					<option v-for="(data, index) of selectTableStatus" :value="data.item">
						{{ data.name }}
					</option>	      	 	
		  	</select>			  	
			</div>  	
			<div class="d-flex mt-2 flex-wrap">
		  	<Datepicker class="datepicker mb-2 me-2 w-auto" v-model="date" range/>
		  	<button class="confirm-btn btn btn-height" @click="searchTable">搜尋</button>
			</div>
		</div>	

	   <!--table -->
	  <div class="content-box tableContainer">
	  	<p class="title"><strong>出勤情況總覽</strong></p>  	  	
			<hr/>
		  <vxe-table :data="tableData" class="tableInfo" emptyText="no data">
		    <vxe-column v-for="(data, index) of tableTitle "  :field="data.field" :title="data.title"></vxe-column>
		  </vxe-table>
		  <nav aria-label="Page navigation example" class="mt-2">
				<ul class="pagination justify-content-center">
				  <li class="page-item" v-for="n in tablePage">
				  	<button class="page-link" @click="changePage(n)">{{ n }}</button>
				  </li>
				</ul>
			</nav>
	  </div> 		
	</template>

</template>
  
<script setup>
	import VChart from "vue-echarts";
	import Overall from "../baseComponents/overall.vue";
	import FilterSelect from "../baseComponents/FilterSelect.vue";
	import {ref, onMounted, computed, watch} from "vue"
	import axios from "axios"
	import store from "../../store"


	// chartCopmponent
	// filter-data
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
	const type = ref("dv")
	const number = ref('102')	
	const group = ref('dv102')
	const	name = ref('Albee') 	
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
	//chart and overall =========================================
	// AttendanceData
	const AttendanceData = ref([
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
	// chart
	const barchart = ref({
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
	    	name: '課程時數',
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
		// console.log(cur)
		let href = "http://ec2-34-221-251-1.us-west-2.compute.amazonaws.com:8080/count"	
		let axiosData = ""

		try{
			let {data} = await axios.get(href, { params: { 
				group: type.value+number.value, 
				startdate: date.value[0], 
				stopdate: date.value[1], 
				name: name.value
			}})	
			axiosData = data.data			
			// console.log(axiosData)
			
			// over all
			AttendanceData.value[0].number = `${Math.round((axiosData[axiosData.length-1]["number of people"]*axiosData.length-axiosData[axiosData.length-1].absent)/(axiosData[axiosData.length-1]["number of people"]*axiosData.length)*100)}%`
			AttendanceData.value[1].number = `${Math.round(axiosData[axiosData.length-1].late/(axiosData[axiosData.length-1]["number of people"]*axiosData.length)*100)}%`
			AttendanceData.value[2].number = `${Math.round((axiosData[axiosData.length-1].absent)/(axiosData[axiosData.length-1]["number of people"]*axiosData.length)*100)}%`
			AttendanceData.value[3].number = `${Math.round(axiosData[axiosData.length-1].excused/(axiosData[axiosData.length-1]["number of people"]*axiosData.length)*100)}%`		
			
			//barcart
			// 清空資料再更新
			barchart.value.xAxis.data = []
			barchart.value.series[0].data = []
			barchart.value.series[1].data = []	

			for(let i = 0; i < axiosData.length - 1; i++){
				barchart.value.xAxis.data.push(axiosData[i].day)
				barchart.value.series[0].data.push(axiosData[i].attendancehours)
				barchart.value.series[1].data.push(axiosData[i].lackhours)
			}
	
		}
		catch{
			alert("資料錯誤")
		}	
	}
	// =========================================================
	// isChart
	const isChart = ref(true);
	const changeShow = () => {
		isChart.value = !isChart.value
	}
	// =========================================================
	// tableComponent
	const status = ref("");
	const tableDate = ref(""); 	// date
	onMounted(() => {
    const startDate = new Date(2021, 11, 16);
    const endDate = new Date(2022, 4, 27)
    tableDate.value = [startDate, endDate]	
	})
	watch(tableDate, (newVal, oldVal) => { //  set date to yyyy-mm-dd
		for(let i = 0; i <= tableDate.value.length - 1; i++){
			tableDate.value[i] = newVal[i].toISOString().split('T')[0] 
		}
	});
	const selectTableDate = ref([
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
	const selectTableStatus = ref([
		{
			name: "全部出勤狀態",
			item: ""
		},					
		{
			name: "出勤",
			item: "regular"
		},
		{
			name: "遲到",
			item: "late"
		},
		{
			name: "早退",
			item: "excused",
		},
		{
			name: "缺勤",
			itme: "absent"
		}
	]);		
	// ========================================================================
	// get axios data
	
	// table
	const tableTitle = ref([
		{field:"date", title:"日期"},
		{field:"grade", title:"班級"},	  		
		{field:"name", title:"姓名"},
		{field:"signin", title:"簽到"},
		{field:"signout", title:"簽退"},
		{field:"inip", title:"INIP"},	  		
	])
	const tableData = ref([])
	const tablePage = ref()
	const chosePage = ref(1)
	const changePage = (number)=>{
		chosePage.value = number
		searchTable();		
	}

	const searchTable = async()=>{
		let href = "http://54.186.56.114/punch"
		console.log(store.state.userInfo)
		try{
			let {data} = await axios.get(href, { params: { 
				// group: group.value, 
				startdate: tableDate.value[0], 
				stopdate: tableDate.value[1], 
				// name: name.value,
				status: status.value,
				page: chosePage.value
			}}, {headers: {'Authorization': `Bearer ${store.state.token}`}})
			// tablePage.value = Number(data.data.pagination[0].totalpages)
			// let axiosData = data.data.punch
			// tableData.value = [] 			// 清空舊的資料再更新

			// for(let i = 0; i <= axiosData.length - 1; i ++){
			// 	tableData.value.push({ 
			// 		date: axiosData[i].date, 
			// 		grade: group.value, 
			// 		name: axiosData[i].name, 
			// 		signin: axiosData[i].intime, 
			// 		signout: axiosData[i].outtime, 
			// 		inip: axiosData[i].inip
			// 	})
			// } 
		}
		catch(e)
		{
			console.error(e)
			alert("資料錯誤")
		}			
	}
</script>

<style lang="scss" scoped >  
.filter-box {
  height: auto;
  width: auto;
  .selectInfo {
    width: 100px;
    height: 38px;
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
  .selectInfo{
  	width: 100px;
  	height: 38px;
  	background-color: #E9F2FF;
  	border-radius: 4px;
  	border: none;
  	cursor: pointer;
  };
}	
.shadow{
	box-shadow: 3px 3px 2.5px 2.5px rgb(179, 175, 175);
}
.dateHeight{
	height: auto;
}
.chartContainer{
	height: 100vh;
	.chartHeight{
		height: 100%
	}
}	
.tableContainer{
  width: auto;
  height: 100vh;
  .tableInfo{
  	height: 80vh;
  	overflow-y: auto;
  }
}		
</style>
