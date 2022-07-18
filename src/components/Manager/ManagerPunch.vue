<template>
	<!--change button  -->
	<div class="boxContainer">
  	<button class="confirm-btn btn me-3 shadow "  :class="{'bg-white': isGrade, 'text-black': isGrade}" @click="changeShow">各別班級</button>
  	<button class="confirm-btn btn me-3 shadow"  :class="{'bg-white': !isGrade, 'text-black': !isGrade}" @click="changeShow">個別學員</button>
	</div>

	<template v-if="!isGrade">
		<!--  filter-->
		<FilterSelect :parent-selectArr="userSelectArr" :parent-title="userTitle">
			<button class="confirm-btn btn btn-height ms-auto ">匯出此頁</button>	  	
		</FilterSelect>
	  
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

	  <!-- overall -->
	  <Overall :parent-data="gradeAttendanceData"></Overall>	  

		</template>

	<template v-if="isGrade">
		<!--  filter-->
		<FilterSelect :parent-selectArr="userSelectArr" :parent-title="userTitle">
			<button class="confirm-btn btn btn-height ms-auto ">匯出此頁</button>	  	
		</FilterSelect>
	  
	  <!-- overall -->
	  <Overall :parent-data="userAttendanceData"></Overall>
	  
	  <!-- chart -->
	  <div class="content-box overall-box chartContainer" >
			<v-chart class="chartHeight" :option="userBarchart" autoresize />  	
	  </div> 		
		</template>

		<!-- filter -->
		<FilterSelect :parent-selectArr="userSelectArr" :parent-title="userTitle">
			<template v-slot:bar>
				<input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
				<label for="jack">前端班</label>
				<input type="checkbox" id="john" value="John" v-model="checkedNames">
				<label for="john">數據班</label>
				<input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
				<label for="mike">雲端班</label>				
			</template>
			<button class="confirm-btn btn btn-height ms-auto ">匯出此頁</button>	  	
		</FilterSelect>		

</template>

<script setup>
	import {ref} from "vue"
	import VChart from "vue-echarts";
	import Overall from "../baseComponents/Overall.vue";
	import FilterSelect from "../baseComponents/FilterSelect.vue";
	
	// data
	// grade
	const gradeSelectArr = ref([
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
	const gradeTitle = ref("以班級篩選")

	const gradeAttendanceData = ref([
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
	const gradeBarchart = ref({
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
	const piechart = ref({
	  title: {
	    text: "本月整體出勤狀況",
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
	    data: ["正常到班", "遲到數", "缺勤"]
	  },
	  series: [
	    {
	      name: "本月整體出勤狀況",
	      type: "pie",
	      radius: "55%",
	      center: ["50%", "60%"],
	      data: [
	        { value: 335, name: "正常到班" },
	        { value: 310, name: "遲到數" },
	        { value: 234, name: "缺勤" },
	      ],
	      itemStyle : {
	        normal : {
	             label : {
	                show: true, position: 'inner',
	                formatter : "{d}%"
	            },
	            labelLine : {
	                show : false
	            }
	        }
	      },      
	    }
	  ]
	});		  			  	

	// user
	const userSelectArr = ref([
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
	const userTitle = ref("以學員篩選")

	const userAttendanceData = ref([
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

	