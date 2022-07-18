<template>
	<FilterSelect :parent-selectArr="selectArr" :parent-title="title"></FilterSelect>
  <!-- chart -->
  <div class="content-box overall-box chartContainer" >
		<v-chart class="chartHeight" :option="barchart" autoresize />  	
  </div> 

</template>
<script setup>
	import FilterSelect from "../baseComponents/filterSelect.vue";
	import VChart from "vue-echarts";
	import	{ref} from "vue"
	
	//data 
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
	
	const title = ref("學員學習進度");
	
	const barchart = ref({
    title: {
      text: '學員學習進度表',
			textStyle: {
			  color: '#558ABA'
			},
				subtext: '目前顯示：王小明', 
    },
    tooltip: {},
    legend: {
    	left: "right",
    },
    yAxis: {
      data: ['Javascript', 'HTML', 'CSS', 'Vue.js', 'Git'],
      nameTextStyle: {
      	fontWeight: "bolder"
      }
    },
    xAxis: {
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

	