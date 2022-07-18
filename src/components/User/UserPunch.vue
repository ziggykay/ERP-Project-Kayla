<template>
	
	<!--change button  -->
	<div class="boxContainer">
  	<button class="confirm-btn btn me-3 shadow "  :class="{'bg-white': !isChart, 'text-black': !isChart}" @click="changeShow">圖表顯示 </button>
  	<button class="confirm-btn btn me-3 shadow"  :class="{'bg-white': isChart, 'text-black': isChart}" @click="changeShow">表格顯示 </button>		
	</div>
	<!-- filter -->
  <FilterSelect :parent-selectArr="selectArr" :parent-title="title"></FilterSelect>
  
  <!-- overall -->
  <Overall :parent-data="AttendanceData"></Overall>

  <!-- chart -->
  <div class="content-box overall-box chartContainer" v-show="isChart">
		<v-chart class="chartHeight" :option="barchart" autoresize />  	
  </div> 

   <!--table -->
  <div class="content-box overall-box" v-show="!isChart">
  	<p class="title"><strong>出勤情況總覽</strong></p>
  	<select class=" me-3 selectInfo">
			<option>全部</option> 	    
	    <option>遲到</option>
	    <option>早退</option>  	 	
  	</select>  	  	
		<hr/>
	  <vxe-table :data="tableData">
	    <vxe-column v-for="(data, index) of tableTitle "  :field="data.field" :title="data.title"></vxe-column>
	  </vxe-table>
  </div> 

</template>
  
<script setup>
	import VChart from "vue-echarts";
	import Overall from "../baseComponents/overall.vue";
	import FilterSelect from "../baseComponents/filterSelect.vue";
	import {ref, onMounted, computed} from "vue"

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


	// AttendanceData
	const AttendanceData = ref([
		{
			title: "出席率",
			number: "98%",
			color: "#558ABA"
		},
		{
			title: "遲到率",
			number: "5%",
			color: "#1AAF68"
		},
		{
			title: "遲到次數",
			number: "2天",
			color: "#1AAF68"
		},
		{
			title: "遲到時數",
			number: "2.5天",
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
	

	// isChart
	const isChart = ref(true);
	const changeShow = () => {
		isChart.value = !isChart.value
	}

	// table
	const tableTitle = ref([
		{field:"date", title:"日期"},
		{field:"name", title:"姓名"},
		{field:"signin", title:"簽到"},
		{field:"signout", title:"簽退"},
	])

	const tableData = ref([
    { date: "20220630", name: "ryan", signin: "09:00", signout: "17:30"},
		{ date: "20220630", name: "ryan", signin: "09:00", signout: "17:30"},
		{ date: "20220630", name: "ryan", signin: "09:00", signout: "17:30"},        
		{ date: "20220630", name: "ryan", signin: "09:00", signout: "17:30"},
		{ date: "20220630", name: "ryan", signin: "09:00", signout: "17:30"},
	])
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
	  // .dateInfo{
	  // 	color: #E9F2FF
	  // }
	}	
	.shadow{
		box-shadow: 2.5px 4px 3px rgb(179, 175, 175);
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
</style>