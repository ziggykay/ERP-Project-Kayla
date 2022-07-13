<template>
	<!--  filter-->
	<filterSelect :parent-selectArr="selectArr"/>
  
  <!-- overall -->
  <Overall :parent-data="AttendanceData"></Overall>
  
  <!-- chart -->
  <div class="content-box overall-box chartContainer" >
		<v-chart class="chartHeight" :option="barchart" autoresize />  	
  </div> 
</template>

<script type="text/javascript">

	import {ref} from "vue"
	import VChart from "vue-echarts";
	import Overall from "./baseComponents/overall.vue";
	import filterSelect from "./baseComponents/filterSelect.vue";

	export default {
	  name:'ManagerPunch',
	  components: {
			VChart,
	  	Overall,
	  	filterSelect
	  },
	  setup(){
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
	  			title: "缺席率",
	  			number: "5%",
	  			color: "#1AAF68"
	  		},
	  		{
	  			title: "請假率",
	  			number: "5%",
	  			color: "#1AAF68"
	  		}
	  	]);

	  	const selectArr = ref([
	  		{
	  			selected: "fn",
	  			data: [
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
	  			]
	  		},
	  		{
	  			selected: "102",
	  			data: [
			  		{
			  			name: "101",
			  			item: "101"
			  		},
			  		{
			  			name: "102",
			  			item: "102"
			  		}		 		
	  			]
	  		},
	  		{
	  			selected: "test",
	  			data: [
			  		{
			  			name: "test",
			  			item: "test"
			  		},
			  		{
			  			name: "andy",
			  			item: "andy"
			  		}			 		
	  			]	  			
	  		},	
	  		{
	  			selected: "month",
	  			data: [
			  		{
			  			name: "今日",
			  			item: "today"
			  		},
			  		{
			  			name: "本月",
			  			item: "month"
			  		}				 		
	  			]	  			
	  		},		  		  		
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

	  	return { AttendanceData, selectArr, barchart}	  	
	  }
	} 
</script>

<style lang="scss" scoped>
	.overall-box{
	  width: auto;
	  height: auto;
	}		
	.chartContainer{
		height: 100vh;
		.chartHeight{
			height: 100%
		}
	}		
</style>

	