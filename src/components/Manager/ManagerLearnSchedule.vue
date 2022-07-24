<template>
	<template v-if="userSelectArr[0]">
	<FilterSelect :parent-selectArr="userSelectArr" :parent-title="title" @user-selectData="userData"></FilterSelect>		
	</template>
	<template v-else>
		<div class="content-box w-auto">
			尚未有資料  
	  </div> 	
	</template>

  <!-- chart -->
  <div class="content-box overall-box chartContainer" >
		<v-chart class="chartHeight" :option="barchart" autoresize />  	
  </div> 

</template>
<script setup>
	import FilterSelect from "../baseComponents/FilterSelect.vue";
	import VChart from "vue-echarts";
	import	{ref, onMounted} from "vue"
	import axios from 'axios'
	
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


	const title = ref("學員學習進度");
	
	const barchart = ref({
    title: {
      text: '學員學習進度表',
			textStyle: {
			  color: '#558ABA'
			},
				subtext: '', 
    },
    tooltip: {},
    legend: {
    	left: "right",
    },
    yAxis: {
      data: [],
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
	    	name: '課程時數',
	      data: [],
	      type: 'bar',
	      stack: 'x',
	      itemStyle: {
					color: '#558ABA'
	      },
	    },
	    {
	    	name: '學生學習時數',
	      data: [],
	      type: 'bar',
	      stack: 'x',
	      itemStyle: {
					color: '#FF6A3C'
	      },			      
	    }
	  ],	  		
	})	 
	const userData = async(val)=>{
		let startdate = ''
		let stopdate = ''
		let group = ''
		let name = ''
		let cur = ''

		startdate = val[0][0];
		stopdate = val[0][1];
		group = val[1][0]+val[1][1]
		name = val[1][2]
		cur = val[1][3]

		//get axios data
		try{
			let href = "http://ec2-34-221-251-1.us-west-2.compute.amazonaws.com:8080/course"
			let axiosData = ''
			if(cur == ''){
			let {data} = await axios.get(href, { params: { group, startdate, stopdate, name}})			
				axiosData = data.data.course
			}
			else{
			let {data} = await axios.get(href, { params: { group, cur, name}})			
				axiosData = data.data.course				
			}


			// 清空舊的資料再更新
			barchart.value.yAxis.data = [];
			barchart.value.series[0].data = [];
			barchart.value.series[1].data = []			
			for(let i = 0; i <= axiosData.length - 1; i++){

				barchart.value.yAxis.data.push(axiosData[i].course)
				barchart.value.series[0].data.push(axiosData[i].totalhours)
				barchart.value.series[1].data.push(axiosData[i].present)
			}
		}
		catch{
			alert("資料錯誤")
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

	