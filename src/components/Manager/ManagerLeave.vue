<template>
	<template v-if="selectArr[0]">
		<FilterSelect :parent-selectArr="selectArr" :parent-title="title" @user-selectData="totalData">
			<label class="btn confirm-btn upload">
				<input style="display:none;" ref="uploadFile" v-on:change="handleFileUpload()"  accept=".csv" type="file">
				上傳CSV檔
			</label>			
		</FilterSelect>		
	</template>
	<template v-else>
		<div class="content-box w-auto">
			尚未有資料  
	  </div> 			
	</template>

   <!--table -->
  <div class="content-box tableContainer">
  	<p class="title"><strong>表格</strong></p>  	  	
		<hr/>
	  <vxe-table :data="tableData" class="tableInfo" emptyText="no data">
	    <vxe-column v-for="(data, index) of tableTitle "  :field="data.field" :title="data.title"></vxe-column>
	  </vxe-table>
  </div> 

</template>
<script setup>
	import FilterSelect from "../baseComponents/FilterSelect.vue";
	import	{ref, watch} from "vue"
	import axios from "axios"
	
	// data
	// selectOption
	const selectArr = ref([]);	  	 
	const getSelectArr = async() =>{

			let href = 'http://localhost:80/api/diary/account'
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
							name: "全部學生",
							item: ""
						},		
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
							name: "全部請假類型",
							item: ""
						},			
						{
							name: "病假",
							item: "病假"
						},
						{
							name: "事假",
							item: "事假"
						},	
						{
							name: "喪假",
							item: "喪假"
						},			  				 		
						{
							name: "特殊原因",
							item: "特殊原因"
						},			  				 		
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
	getSelectArr()
	const title = ref("學員請假資訊");
 	
 	// upload file
  const uploadFile = ref(null)
  const handleFileUpload = async() => {
		const formData = new FormData();

	 	// debugger;
	  // console.log("selected file",uploadFile.value.files[0])
	  //Upload to server
	  formData.append('group', choseSelect.value.group)
	  formData.append('file', uploadFile.value.files[0])

	  const href = 'http://ec2-34-221-251-1.us-west-2.compute.amazonaws.com:8080/leave'
		const headers = {
		  'Content-Type': 'multipart/form-data'
		}
		try{
		let {data} = await axios.post(href, formData, {headers})
			console.log(data)
		}
		catch(e){
			alert(e.response.data.message)
			console.log(e)

		}

  }

	// table
	const tableTitle = ref([
		{field:"name", title:"姓名"},
		{field:"date", title:"日期"},
		{field:"grade", title:"班級"},
		{field:"time", title:"請假時間"},
		{field:"note", title:"說明事由"},  		
	])

	const tableData = ref([])
	const choseSelect = ref()	
	const totalData = (val)=>{
		choseSelect.value = {}
		choseSelect.value = {
			startdate : val[0][0],
			stopdate : val[0][1],
			group : val[1][0]+val[1][1],
			name : val[1][2],
			leavetype: val[1][3]
		}
	}

	const doAxios = async(group, name, startdate, stopdate, leavetype)=>{
		// get axios data
		let href = "http://ec2-34-221-251-1.us-west-2.compute.amazonaws.com:8080/leave"
		try{
			let {data} = await axios.get(href, { params: { group, name, startdate, stopdate, leavetype}})			
			let axiosData = data.data
			tableData.value = [] 			// 清空舊的資料再更新

			for(let i = 0; i <= axiosData.length - 1; i ++){
				tableData.value.push({ 
					date: axiosData[i].date, 
					grade: group, 
					name: axiosData[i].name, 
					time: axiosData[i].time,
					note: axiosData[i].reason
				})
			} 
		}
		catch{
			alert("資料錯誤")
		}		
	}	

	watch(choseSelect, (newValue, oldValue)=>{
		doAxios(newValue.group, newValue.name, newValue.startdate, newValue.stopdate, newValue.leavetype)
	})

</script>

<style lang="scss" scoped>
	.tableContainer{
	  width: auto;
	  height: 100vh;
	  .tableInfo{
	  	height: 80%;
	  	overflow-y: auto;
	  }
	}
.upload{
	height: 38px;
}
</style>
