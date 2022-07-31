<template>
	<div class="content-box filter-box">
		<p class="title"><strong>學員學習進度</strong></p> 	  	
		<hr/>
		<div class="d-flex flex-wrap">
	  	<select class="selectInfo me-2" v-model="type" @change="axiosNumber">
	  		<option value="">請選擇班別</option>
				<option v-for="(data, index) of selectType" :value="data.item">
					{{ data.name}}
				</option>	    	 	
	  	</select>
	  	<select class="selectInfo me-2" v-model="number" @change="axiosName">
	  		<option value="">請選擇班級</option>
				<option v-for="(data, index) of selectNumber" :value="data.item">
					{{ data.name }}
				</option>	      	 	
	  	</select>		  
	  	<select class="selectInfo me-2" v-model="name">
	  		<option>全部學生</option>
				<option v-for="(data, index) of selectName" :value="data.item">
					{{ data.name }}
				</option>	      	 	
	  	</select>	
	  	<select class="selectInfo me-2"  v-model="leavetype">
				<option v-for="(data, index) of selectLeaveType" :value="data.item">
					{{ data.name }}
				</option>	      	 	
	  	</select>			 	  	
<!-- 	  	<select class="selectInfo me-2">
				<option v-for="(data, index) of selectDate" :value="data.item">
					{{ data.name }}
				</option>	      	 	
	  	</select>		 -->	  	
		</div>  	
		<div class="d-flex mt-2 flex-wrap">
	  	<Datepicker class="datepicker mb-2 me-2 w-auto" v-model="date" range/>
	  	<button class="confirm-btn btn btn-height me-2" @click="search">搜尋</button>
			<label class="btn confirm-btn upload">
				<input style="display:none;" ref="uploadFile" v-on:change="handleFileUpload()"  accept=".csv" type="file">
				上傳CSV檔
			</label>		  	
		</div>	
	</div>	
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
	import	{ref, watch, onMounted} from "vue"
	import axios from 'axios'
	
	const date = ref(""); 	// date
	onMounted(() => {
    const startDate = new Date(2021, 11, 16);
    const endDate = new Date(2022, 4, 27)
    date.value = [startDate, endDate]	
	})
	watch(date, (newVal, oldVal) => { //  set date to yyyy-mm-dd
		for(let i = 0; i <= date.value.length - 1; i++){
			date.value[i] = newVal[i].toISOString().split('T')[0] 
		}
	});

	const type = ref("") // dynamic select option
	const number = ref("")
	const name = ref("") 
	const leavetype = ref("")// fix select option

	const selectType = ref([]) // dynamic select option value
	const selectNumber = ref([])
	const selectName = ref([])	
	const selectLeaveType = ref([
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
		},			  				 		 // fix select option value
	])
	const selectDate = ref([
		{
			name: "請選擇日期範圍",
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
	]);		

	const axiosType = async() =>{
		// clear  option valeu
		selectType.value = []
		selectNumber.value = []
		selectName.value = []
		type.value = ''
		number.value = ''
		name.value = ''
		let href = 'http://54.186.56.114:8081/Getdatalist'
		try{
			let { data } = await axios.post(href)
			let type = data.data.type


			for(let i = 0; i < type.length; i++){
				selectType.value.push({
					name: type[i],
					item: type[i]
				})
			}
		}
		catch{
			alert("資料錯誤")
		}
	}		
	axiosType()

	const axiosNumber = async() =>{
		// clear  option valeu
		selectNumber.value = []
		selectName.value = []
		number.value = ''
		name.value = ''			
		let href = 'http://54.186.56.114:8081/Getdatalist'

		if(type.value !== ""){
			try{
				let postData = {
					type: type.value
				}
				let { data } = await axios.post(href, postData)
				let number = data.data.number
				for(let i = 0; i < number.length; i++){
					selectNumber.value.push({
						name: number[i],
						item: number[i]
					})
				}
			}
			catch(e){
				console.log(e)
				alert("資料錯誤")
			}		
		}
		else{
			alert("請選擇資料")
		}
	}

	const axiosName = async() =>{
		// clear  option valeu
		selectName.value = []
		name.value = ''		
		let href = 'http://54.186.56.114:8081/Getdatalist'
		if(number.value !== ""){
			try{
				let postData = {
					type: type.value,
					number: number.value
				}
				let { data } = await axios.post(href, postData)
				let name = data.data.name
				for(let i = 0; i < name.length; i++){
					selectName.value.push({
						name: name[i].Name,
						item: name[i].Name
					})
				}
			}
			catch{
				alert("資料錯誤")
			}		
		}
		else{
			alert("請選擇資料")
		}
	}

  const uploadFile = ref(null)  	// upload file
  const handleFileUpload = async() => {
		const formData = new FormData();
	 	// debugger;
	  // console.log("selected file",uploadFile.value.files[0])
	  formData.append('group', type.value+number.value)
	  formData.append('file', uploadFile.value.files[0])

	  const href = 'http://ec2-34-221-251-1.us-west-2.compute.amazonaws.com:8080/leave'
		const headers = {
		  'Content-Type': 'multipart/form-data'
		}
		try{
		let {data} = await axios.post(href, formData, {headers}) 	  //Upload to server
			console.log(data)
		}
		catch(e){
			alert(e.response.data.message)
			console.log(e)
		}
  }

	const tableTitle = ref([ 	// table
		{field:"name", title:"姓名"},
		{field:"date", title:"日期"},
		{field:"grade", title:"班級"},
		{field:"time", title:"請假時間"},
		{field:"note", title:"說明事由"},  		
	])

	const tableData = ref([])
	const search = async()=>{
		// get axios data
		let href = "http://ec2-34-221-251-1.us-west-2.compute.amazonaws.com:8080/leave"
		try{
			let {data} = await axios.get(href, { params: { 
				group: type.value+number.value, 
				name: name.value, 
				startdate: date.value[0], 
				stopdate: date.value[1], 
				leavetype: leavetype.value
			}})			
			let axiosData = data.data
			tableData.value = [] 			// 清空舊的資料再更新

			for(let i = 0; i <= axiosData.length - 1; i ++){
				tableData.value.push({ 
					date: axiosData[i].date, 
					grade: type.value+number.value, 
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
</script>

<style lang="scss" scoped>
.filter-box {
  height: auto;
  width: auto;
  .selectInfo {
    width: 100px;
    height: 38px;
    background-color: #e9f2ff;
    border-radius: 4px;
    border: none;
    cursor: pointer;
  }
  .btn-height {
    height: 38px;
  }
}		
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
