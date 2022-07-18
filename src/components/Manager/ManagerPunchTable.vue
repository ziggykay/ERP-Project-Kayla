<template>
	<FilterSelect :parent-selectArr="selectArr" :parent-title="title" @user-selectData="totalData"></FilterSelect>
   <!--table -->
  <div class="content-box tableContainer">
  	<p class="title"><strong>出勤情況總覽</strong></p>  	  	
		<hr/>
	  <vxe-table :data="tableData" class="tableHeight">
	    <vxe-column v-for="(data, index) of tableTitle "  :field="data.field" :title="data.title"></vxe-column>
	  </vxe-table>
  </div> 

</template>
<script setup>
	import FilterSelect from "../baseComponents/filterSelect.vue";
	import	{ref} from "vue"
	import axios from 'axios'
	
	// data
	// selectOption
	const selectArr = ref([
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
				name: "Rossen",
				item: "Rossen"
			},
			{
				name: "andy",
				item: "andy"
			}			 		
		],	
		[
  		{
  			name: "late",
  			item: "late"
  		},
  		{
  			name: "absent",
  			item: "absent"
  		},	
  		{
  			name: "all",
  			item: "all"
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
		],		  		  		
	]);	  	 
	const title = ref("學員出勤資訊");
	
	// table
	const tableTitle = ref([
		{field:"date", title:"日期"},
		{field:"grade", title:"班級"},	  		
		{field:"name", title:"姓名"},
		{field:"signin", title:"簽到"},
		{field:"signout", title:"簽退"},
		{field:"ip", title:"IP"},	  		
	])

	const tableData = ref([
    { date: "20220630", grade: "前端班", name: "ryan", signin: "09:00", signout: "17:30", ip: "127.0.0.1"},
		{ date: "20220630", grade: "前端班", name: "ryan", signin: "09:00", signout: "17:30", ip: "127.0.0.1"},
		{ date: "20220630", grade: "前端班", name: "ryan", signin: "09:00", signout: "17:30", ip: "127.0.0.1"},
	])

	const totalData = async(val)=>{
		console.log(val)
		let startdate = ''
		let stopdate = ''
		let group = ''
		let name = ''
		let status = ''
		let row = ''
		let page = ''

		startdate = val[0][0];
		stopdate = val[0][1];
		group = val[1][0]+val[1][1]
		name = val[1][2]

		// // // get axios data
		let href = "http://localhost:80/api/punch"
		let {data} = await axios.get(href, { params: { group, startdate, stopdate, name}})
		console.log(data.data)
		// try{
		// 	let axiosData = data.data.course

		// 	// 清空舊的資料再更新
		// 	barchart.value.yAxis.data = [];
		// 	barchart.value.series[0].data = [];
		// 	barchart.value.series[1].data = []			
		// 	for(let i = 0; i <= axiosData.length - 1; i++){

		// 		barchart.value.yAxis.data.push(axiosData[i].course)
		// 		barchart.value.series[0].data.push(axiosData[i].totalhours)
		// 		barchart.value.series[1].data.push(axiosData[i].present)
		// 	}
		// }
		// catch{
		// 	alert("資料錯誤")
		// }
	}
</script>

<style lang="scss" scoped>
	.tableContainer{
	  width: auto;
	  height: 100vh;
	  .tableHeight{
	  	// height: 80%
	  }
	}		
</style>

	