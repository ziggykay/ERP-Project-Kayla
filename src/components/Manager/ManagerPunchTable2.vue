<template>
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
<script setup>
	import FilterSelect from "../baseComponents/filterSelect.vue";
	import	{ref, watch} from "vue"
	import axios from 'axios'

	// data
	// selectOption
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

	const doAxios = async(group, startdate, stopdate, name, status, page)=>{
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
		doAxios(newB.group, newB.startdate, newB.stopdate, newB.name, newB.status, newA)
  },{deep: true});	

	
</script>

<style lang="scss" scoped>
	.tableContainer{
	  width: auto;
	  height: 100vh;
	  .tableInfo{
	  	height: 80vh;
	  	overflow-y: auto;
	  }
	}		
</style>

	