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
	  		<option value="">請選擇學生</option>
				<option v-for="(data, index) of selectName" :value="data.item">
					{{ data.name }}
				</option>	      	 	
	  	</select>	
	  	<select class="selectInfo me-2"  v-model="status">
				<option v-for="(data, index) of selectStatus" :value="data.item">
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
	  	<button class="confirm-btn btn btn-height" @click="search">搜尋</button>
		</div>
	</div>	

  <!--table -->
  <div class="content-box tableContainer">
    <p class="title"><strong>出勤情況總覽</strong></p>
    <hr />
    <vxe-table :data="tableData" class="tableInfo" emptyText="no data">
      <vxe-column
        v-for="(data, index) of tableTitle"
        :field="data.field"
        :title="data.title"
      ></vxe-column>
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
	const status = ref("")// fix select option

	const selectType = ref([]) // dynamic select option value
	const selectNumber = ref([])
	const selectName = ref([])	
	const selectStatus = ref([
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
		}			  						  				 		 // fix select option	value
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

	//=================================================== 
	const tableTitle = ref([ 	// table
		{field:"date", title:"日期"},
		{field:"grade", title:"班級"},	  		
		{field:"name", title:"姓名"},
		{field:"signin", title:"簽到"},
		{field:"signout", title:"簽退"},
		{field:"inip", title:"INIP"},	  		
	])
	const tablePage = ref()
	const chosePage = ref(1)
	const changePage = (number)=>{
		chosePage.value = number	
		search()	
	}
	const tableData = ref([])
	const search = async()=>{
		let href = "http://ec2-34-221-251-1.us-west-2.compute.amazonaws.com:8080/punch"
		try{
			let {data} = await axios.get(href, { params: { 
				group: type.value+number.value, 
				startdate: date[0], 
				stopdate: date[1], 
				name: name.value, 
				status: status.value,
				page: chosePage.value
			}})	

			tablePage.value = Number(data.data.pagination[0].totalpages)
			let axiosData = data.data.punch
			tableData.value = [] 			// 清空舊的資料再更新

			for(let i = 0; i <= axiosData.length - 1; i ++){
				tableData.value.push({ 
					date: axiosData[i].date, 
					grade: type.value+number.value, 
					name: axiosData[i].name, 
					signin: axiosData[i].intime, 
					signout: axiosData[i].outtime, 
					inip: axiosData[i].inip
				})
			} 
		}
		catch(e){
			console.log(e)
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
  	height: 80vh;
  	overflow-y: auto;
  }
}		
</style>
