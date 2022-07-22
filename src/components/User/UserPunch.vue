<template>
	
	<!--change button  -->
	<div class="boxContainer">
  	<button class="btn confirm-btn btn me-3 shadow" :class="{'bg-white': !isChart, 'text-black': !isChart}" @click="changeShow">圖表顯示 </button>
  	<button class="btn confirm-btn btn me-3 shadow" :class="{'bg-white': isChart, 'text-black': isChart}" @click="changeShow">表格顯示 </button>		
	</div>

	<template v-if="isChart">
		<!-- filter -->
	  <FilterSelect :parent-selectArr="selectArr" :parent-title="title" @user-selectData="userData"></FilterSelect>
	  
	  <!-- overall -->
	  <Overall :parent-data="AttendanceData">
		</Overall>

	  <!-- chart -->
	  <div class="content-box overall-box chartContainer">
			<v-chart class="chartHeight" :option="barchart" autoresize />  	
	  </div> 		
	</template>

	<template v-else>
		<template v-if="selectTabelArr[0]">
				<FilterSelect :parent-selectArr="selectTabelArr" :parent-title="title2" @user-selectData="Data"></FilterSelect>
		</template>
		<template v-else>
			<div class="content-box w-auto">
				尚未有資料  
		  </div> 				
		</template>

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

   <!--table -->
</template>
  
<script setup>
	import VChart from "vue-echarts";
	import Overall from "../baseComponents/overall.vue";
	import FilterSelect from "../baseComponents/FilterSelect.vue";
	import {ref, onMounted, computed, watch} from "vue"
	import axios from "axios"

	// chartCopmponent
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
	const title = "使用者出勤紀錄資訊"

	const choseSelect = ref()
	const userData = (val)=>{
		choseSelect.value = {}
		choseSelect.value = {
			startdate: val[0][0],
			stopdate: val[0][1]
		}
	}

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
			title: "遲到次數",
			number: "",
			color: "#1AAF68"
		},
		{
			title: "遲到時數",
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
      data: ['1110701', '1110701', '1110701', '1110701', '1110701'],
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
	      data: [5, 2, 7, 5, 5],
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
	      data: [0, 5, 0, 2, 0],
	      type: 'bar',
	      stack: 'x',
	      itemStyle: {
					color: '#FF6A3C'
	      },			      
	    }
	  ],	  		
	})
	// get axios data
	const doAxios = async(group, startdate, stopdate, name)=>{
		let href = "http://localhost:80/api/count/"
		let {data} = await axios.get(href, { params: { group, startdate, stopdate, name}})
		try{
			let axiosData = data.data[0]
			let sum = 0;
			for (let key in axiosData) {
	    	sum = sum + axiosData[key]
			}
			// over all
			AttendanceData.value[0].number = `${Math.round((axiosData.present+axiosData.late)/sum*100)}%`
			AttendanceData.value[1].number = `${Math.round(axiosData.late/sum*100)}%`
			AttendanceData.value[2].number = `${Math.round((axiosData.absent+axiosData.excused)/sum*100)}%`
			AttendanceData.value[3].number = `${Math.round(axiosData.excused/sum*100)}%`
			//barcart
	
		}
		catch{
			alert("資料錯誤")
		}		
	}
	watch(choseSelect, (newVal, oldVal)=>{
		let group = 'fn101'
		let name = 'Rossen' 		
		doAxios(group, newVal.startdate, newVal.stopdate, name)
	})


	// isChart
	const isChart = ref(true);
	const changeShow = () => {
		isChart.value = !isChart.value
	}

	// tableComponent
	const selectTabelArr = ref([]);	  	 
	const getSelectTabelArr = async() =>{
		let href = 'http://localhost:80/api/diary/account'
		let type = "fn"
		let number = '101'

		let { data } = await axios.get(href, { params: { type, number}})

		try{
			selectTabelArr.value = [
				[
		  		{
		  			name: "all",
		  			item: "all"
		  		},
		  		{
		  			name: "present",
		  			item: "present"
		  		},	
		  		{
		  			name: "late",
		  			item: "late"
		  		}					  				 		
				],		  		
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
			]	  			
		}
		catch{
			alert("資料錯誤")
		}
	}		
	getSelectTabelArr()	
	const title2 = ref("使用者出勤資訊");
	
	// table
	const tableTitle = ref([
		{field:"date", title:"日期"},
		{field:"grade", title:"班級"},	  		
		{field:"name", title:"姓名"},
		{field:"signin", title:"簽到"},
		{field:"signout", title:"簽退"},
		{field:"inip", title:"INIP"},	  		
	])
	const tablePage = ref()
	const choseSelect2 = ref()
	const chosePage = ref(1)
	const changePage = (number)=>{
		chosePage.value = number		
	}
	const tableData = ref([])
	// get emit data to choseSelect2
	const Data = (val)=>{
		choseSelect2.value = {}
		choseSelect2.value = {
			startdate : val[0][0],
			stopdate : val[0][1],
			group : 'fn101',
			name : 'Rossen',
			status: val[1][0]
		}
	}

	const doAxios2 = async(group, startdate, stopdate, name, status, page)=>{
		// get axios data
		let href = "http://localhost:80/api/punch"
		let {data} = await axios.get(href, { params: { group, startdate, stopdate, name, status, page}})
		try{
			tablePage.value = Number(data.data.pagination[0].totalpages)
			let axiosData = data.data.punch
			tableData.value = [] 			// 清空舊的資料再更新

			for(let i = 0; i <= axiosData.length - 1; i ++){
				tableData.value.push({ 
					date: axiosData[i].classdate, 
					grade: group, 
					name: axiosData[i].student, 
					signin: axiosData[i].intime, 
					signout: axiosData[i].outtime, 
					inip: axiosData[i].inip
				})
			} 
		}
		catch{
			alert("資料錯誤")
		}		
	}
  watch([chosePage, choseSelect2], ([newA, newB], [prevA, prevB]) => {
		doAxios2(newB.group, newB.startdate, newB.stopdate, newB.name, newB.status, newA)
  },{deep: true});	
	
</script>

<style lang="scss" scoped >  
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
