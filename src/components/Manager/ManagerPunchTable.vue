<template>
	<template v-if="selectArr[0]">
			<FilterSelect :parent-selectArr="selectArr" :parent-title="title" @user-selectData="totalData"></FilterSelect>
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
	const selectArr = ref([]);	  	 
	const getSelectArr = async() =>{

			// let href = 'http://localhost:80/api/diary/account'
			let type = "fn"
			let number = '101'

			try{
				// let { data } = await axios.get(href, { params: { type, number}})				
				selectArr.value = [
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
			  			name: "全部出勤狀態",
			  			item: ""
			  		},
			  		{
			  			name: "出勤",
			  			item: "regular"
			  		},	
			  		{
			  			name: "遲到",
			  			item: "late"
			  		},			  		
			  		{
			  			name: "早退",
			  			item: "excused"
			  		},				  			
			  		{
			  			name: "缺勤",
			  			item: "absent"
			  		}			  						  				 		
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
			}
			catch{
				alert("資料錯誤")
			}
	}		
	getSelectArr()	

	const title = ref("學員出勤資訊");
	
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
	const choseSelect = ref()
	const chosePage = ref(1)
	const changePage = (number)=>{
		chosePage.value = number		
	}
	const tableData = ref([])
	// get emit data to choseSelect
	const totalData = (val)=>{
		choseSelect.value = {}
		choseSelect.value = {
			startdate : val[0][0],
			stopdate : val[0][1],
			group : val[1][0]+val[1][1],
			name : val[1][2],
			status: val[1][3],
			cur: val[1][4]
		}
	}

	const doAxios = async(group, startdate, stopdate, name, status, cur, page)=>{
		// get axios data
		let href = "http://ec2-34-221-251-1.us-west-2.compute.amazonaws.com:8080/punch"

		try{
			let {data} = await axios.get(href, { params: { group, startdate, stopdate, name, status, cur, page}})		
			tablePage.value = Number(data.data.pagination[0].totalpages)
			let axiosData = data.data.punch
			tableData.value = [] 			// 清空舊的資料再更新

			for(let i = 0; i <= axiosData.length - 1; i ++){
				tableData.value.push({ 
					date: axiosData[i].date, 
					grade: group, 
					name: axiosData[i].name, 
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
  watch([chosePage, choseSelect], ([newA, newB], [prevA, prevB]) => {
		doAxios(newB.group, newB.startdate, newB.stopdate, newB.name, newB.status, newB.cur, newA)
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

	