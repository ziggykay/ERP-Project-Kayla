<template>
	<!-- filter -->
	<div class="content-box filter-box">
		<p class="title"><strong>課表資訊</strong></p> 	  	
		<hr/>
		<div class="d-flex flex-wrap">
	  	<select class="selectInfo me-2" v-model="type" @change="axiosNumber">
	  		<option value="">請選擇班別</option>
				<option v-for="(data, index) of selectType" :value="data.item">
					{{ data.name}}
				</option>	    	 	
	  	</select>
	  	<select class="selectInfo me-2" v-model="number">
	  		<option value="">請選擇班級</option>
				<option v-for="(data, index) of selectNumber" :value="data.item">
					{{ data.name }}
				</option>	      	 	
	  	</select>		  
	  	<select class="selectInfo me-2"  v-model="monthPick">
				<option v-for="(data, index) of selectMonth" :value="data.item">
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
	  	<!-- <Datepicker class="datepicker mb-2 me-2 w-auto" v-model="date" range/> -->
	  	<button class="confirm-btn btn btn-height me-2" @click="search">搜尋</button>
			<label class="btn confirm-btn upload">
				<input style="display:none;" ref="uploadFile" v-on:change="handleFileUpload()"  accept=".csv" type="file">
				上傳CSV檔
			</label>		  	
		</div>	
	</div>

  <!--table -->
  <div class="content-box tableContainer">
    <p class="title"><strong>課程清單</strong></p>
    <hr />
    <vxe-table :data="tableData" class="tableInfo" emptyText="no data">
      <vxe-column
        v-for="data of tableTitle"
        :key="data"
        :field="data.field"
        :title="data.title"
      ></vxe-column>
    </vxe-table>
  </div>
</template>
<script setup>
	import FilterSelect from "../baseComponents/FilterSelect.vue";
	import	{ref, watch, onMounted} from "vue"
	import axios from "axios"
	import store from "../../store"	
		
		const token = store.getters["auth/getToken"]

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
	const monthPick = ref("")

	const selectType = ref([]) // dynamic select option value
	const selectNumber = ref([])
	const selectMonth = ref([
		{
			name: "全部月份",
			item: ""
		},
		{
			name: "2021-12",
			item: "2021-12"
		},		  					
		{
			name: "2022-01",
			item: "2022-01"
		},
		{
			name: "2022-02",
			item: "2022-02"
		},
		{
			name: "2022-03",
			item: "2022-03"
		},	
		{
			name: "2022-04",
			item: "2022-04"
		},	
		{
			name: "2022-05",
			item: "2022-05"
		}	  			  			  					 		  // fix select option value
	])

	const axiosType = async() =>{
		// clear  option valeu
		selectType.value = []
		selectNumber.value = []
		type.value = ''
		number.value = ''
		let href = 'http://54.186.56.114/diary/Getdatalist'
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
		number.value = ''		
		let href = 'http://54.186.56.114/diary/Getdatalist'

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
	// ========================================================
  const uploadFile = ref(null)  	// upload file
  const handleFileUpload = async() => {
		const formData = new FormData();
	 	// debugger;
	  // console.log("selected file",uploadFile.value.files[0])
	  formData.append('group', type.value+number.value)
	  formData.append('file', uploadFile.value.files[0])

	  const href = 'http://54.186.56.114/curriculum'
		const headers = {
		  'Content-Type': 'multipart/form-data',
		  'authorization': `Bearer ${token}`
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
	// ========================================================
	const tableTitle = ref([ 	// table
		{field:"course", title:"課程名稱"},
		{field:"date", title:"課程日期"},	  		
		{field:"classroom", title:"課程教室"},
		{field:"hours", title:"課程時數"},
		{field:"part", title:"課程時段"},
	])
	
	const tableData = ref([])

	const search = async(group, month) => {
		let href = 'http://54.186.56.114/curriculum'
		let config = {
		  headers:{'authorization': `Bearer ${token}`},
		  params: {group: type.value+number.value, month: monthPick.value},
		}		

		try{
		 	let { data } = await axios.get( href, config)
			let axiosData = data.data

			 // 清空資料再更新
			 tableData.value = []
			 for(let i = 0; i < axiosData.length; i++){
				tableData.value.push({ 
					course: axiosData[i].course, 
					date: axiosData[i].date, 
					classroom: axiosData[i].classroom, 
					hours: axiosData[i].hours, 
					part: axiosData[i].part, 
				})
			 }
		}
		catch(e){
			console.log(e)
			alert("沒有該筆資料")
		}
	}
</script>

<style lang="scss" scoped>
.tableContainer {
  width: auto;
  height: 100vh;
  .tableInfo {
    height: 80%;
    overflow-y: auto;
  }
}
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
</style>
