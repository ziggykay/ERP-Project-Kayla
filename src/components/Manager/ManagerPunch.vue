<template>
	<!--change button  -->
	<div class="boxContainer">
  	<button class="confirm-btn btn me-3 shadow "  :class="{'bg-white': !isGrade, 'text-black': !isGrade}" @click="changeShow">各別班級</button>
  	<button class="confirm-btn btn me-3 shadow"  :class="{'bg-white': isGrade, 'text-black': isGrade}" @click="changeShow">個別學員</button>
	</div>

	<template v-if="isGrade">
		<!--  filter-->
		<FilterSelect :parent-selectArr="gradeSelectArr" :parent-title="gradeTitle">
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

	  <!-- chart -->
	  <div class="content-box overall-box chartContainer" >
			<v-chart class="chartHeight" :option="gradeCompareBarchart" autoresize />  	
	  </div>	

	</template>

	<template v-if="!isGrade">
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


</template>

<script setup>
	import {ref} from "vue"
	import VChart from "vue-echarts";
	import Overall from "../baseComponents/overall.vue";
	import FilterSelect from "../baseComponents/filterSelect.vue";
	
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
      text: '出勤狀況（人數）',
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
	    	name: '遲到數',
	      data: [0, 5, 0, 2, 0],
	      type: 'bar',
	      stack: 'x',
	      itemStyle: {
					color: '#9FE080'
	      },			      
	    },
	    {
	    	name: '缺勤',
	      data: [0, 5, 0, 2, 0],
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
	// gradecompare
	const checkedGrades = ref([])	
	const gradeCompareSelectArr =ref([
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

	