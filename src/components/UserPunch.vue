<template>
	
	<!--change button  -->
	<div class="boxContainer">
  	<button class="confirm-btn btn me-3 shadow "  :class="{'bg-white': !isChart, 'text-black': !isChart}" @click="changeShow">圖表顯示 </button>
  	<button class="confirm-btn btn me-3 shadow"  :class="{'bg-white': isChart, 'text-black': isChart}" @click="changeShow">表格顯示 </button>		
	</div>
  
  <!-- 日期選擇套件 Vue3-Datepicker -->
  <div class="content-box dateHeight d-md-flex overall-box">
  	<select class="me-3 selectInfo">
	    <option>本日</option>
	    <option>本月</option>  		
  	</select>
  	<Datepicker class="w-25 dateInfo datepicker dp__theme_light" v-model="date" range/>	
  </div>	 	
  
  <!-- overall -->
  <Overall :parent-data="AttendanceData"></Overall>

  <!-- chart -->
  <div class="content-box overall-box chartContainer" v-show="isChart">
		<v-chart class="chartHeight" :option="barchart" autoresize />  	
  </div> 

   <!--table -->
  <div class="content-box overall-box tableContainer" v-show="!isChart">
  	<p class="title"><strong>出勤情況總覽</strong></p>
  	<select class=" me-3 selectInfo">
			<option>全部</option> 	    
	    <option>遲到</option>
	    <option>早退</option>  	 	
  	</select>  	  	
		<hr/>
	  <vxe-table :data="tableData" class="tableHeight">
	    <vxe-column field="date" title="日期"></vxe-column>
	    <vxe-column field="name" title="姓名"></vxe-column>
	    <vxe-column field="signin" title="簽到"></vxe-column>
	    <vxe-column field="signout" title="簽退"></vxe-column>
	  </vxe-table>
  </div> 

</template>
  
<script type="text/javascript">
	// ecahrt
	import VChart from "vue-echarts";
	import Overall from "./baseComponents/overall.vue";


	import {ref, onMounted, computed} from "vue"

	export default {
	  name:'UserPunch',
	  components: {
	  	VChart,
	  	Overall
	  },	  
	  setup(){

	  	// date
	  	const date = ref("");
	  	onMounted(() => {
		    const startDate = new Date();
		    const endDate = new Date(new Date().setDate(startDate.getDate() + 7))
		    date.value = [startDate, endDate]	
	  	})

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

	  	// isChart
	  	const isChart = ref(true);
	  	const changeShow = () => {
	  		isChart.value = !isChart.value
	  	}

	  	const tableData = ref([
	      { date: "20220630", name: "ryan", signin: "09:00", signout: "17:30"},
				{ date: "20220630", name: "ryan", signin: "09:00", signout: "17:30"},
				{ date: "20220630", name: "ryan", signin: "09:00", signout: "17:30"},        
				{ date: "20220630", name: "ryan", signin: "09:00", signout: "17:30"},
				{ date: "20220630", name: "ryan", signin: "09:00", signout: "17:30"},
				{ date: "20220630", name: "ryan", signin: "09:00", signout: "17:30"}, 
	      { date: "20220630", name: "ryan", signin: "09:00", signout: "17:30"},
				{ date: "20220630", name: "ryan", signin: "09:00", signout: "17:30"},
				{ date: "20220630", name: "ryan", signin: "09:00", signout: "17:30"}, 
	      { date: "20220630", name: "ryan", signin: "09:00", signout: "17:30"},
				{ date: "20220630", name: "ryan", signin: "09:00", signout: "17:30"},
				{ date: "20220630", name: "ryan", signin: "09:00", signout: "17:30"}, 
	  	])

	  	return { date, AttendanceData, barchart, isChart, changeShow, tableData }
	  }
	} 

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
	.tableContainer{
		height: 80%;
		.tableHeight{
			min-height: 100%;
		}
	}
</style>