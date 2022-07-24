<template>

	<!-- filter -->
	<div class="content-box filter-box">
  	<p class="title"><strong>{{title}}</strong></p> 	  	
		<hr/>
		<div class="d-flex flex-wrap">
	  	<select class="selectInfo me-2" v-for="item of selectArr" :key="item" v-model="item.selected">
				<option v-for="innerItem of item.data" :key="innerItem" :value="innerItem.item">
					{{ innerItem.name }}
				</option>	      	 	
	  	</select>
		</div>  	
		<div class="d-flex mt-2 flex-wrap">
			<label class="btn confirm-btn upload">
				<input style="display:none;" ref="uploadFile" v-on:change="handleFileUpload()"  accept=".csv" type="file">
				上傳CSV檔
			</label>	
		</div>
	</div>

   <!--table -->
  <div class="content-box tableContainer">
  	<p class="title"><strong>課程清單</strong></p>  	  	
		<hr/>
	  <vxe-table :data="tableData" class="tableInfo" emptyText="no data">
	    <vxe-column v-for="data of tableTitle " :key="data" :field="data.field" :title="data.title"></vxe-column>
	  </vxe-table>
  </div> 
</template>
<script setup>
	import FilterSelect from "../baseComponents/FilterSelect.vue";
	import	{ref, watch} from "vue"
	import axios from "axios"
	
	// data
	// selectOption
	const selectArr = ref([
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
			selected: "101",
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
			selected: "",
			data: [
	  		{
	  			name: "選擇月份",
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
	  		}	  			  			  					 		
			]	  			
		},		  		  		
	]);	  	 
	const title = ref("課表資訊");
	
  const uploadFile = ref(null)
  const handleFileUpload = async() => {
		const formData = new FormData();

	 	// debugger;
	  // console.log("selected file",uploadFile.value.files[0])
	  //Upload to server
	  formData.append('group', selectArr.value[0].selected+selectArr.value[1].selected)
	  formData.append('file', uploadFile.value.files[0])

	  const href = 'http://ec2-34-221-251-1.us-west-2.compute.amazonaws.com:8080/curriculum'
		const headers = {
		  'Content-Type': 'multipart/form-data'
		}
		try{
		let {data} = await axios.post(href, formData, {headers})
			console.log(data.data)
		}
		catch(e){
			// alert(e.response.data.message)
			console.log(e)

		}

  }	

	// table
	const tableTitle = ref([
		{field:"course", title:"課程名稱"},
		{field:"date", title:"課程日期"},	  		
		{field:"classroom", title:"課程教室"},
		{field:"hours", title:"課程時數"},
		{field:"part", title:"課程時段"},
	])
	const tableData = ref([])



	const curriculum = async(group, month) => {
	 	let { data } = await axios.get('http://ec2-34-221-251-1.us-west-2.compute.amazonaws.com:8080/curriculum', { 
			params: { group, month} 
		})
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
		 // console.log(tableData.value)
	}
	curriculum((selectArr.value[0].selected+selectArr.value[1].selected), selectArr.value[2].selected)

	
  watch(selectArr, (newA, prevA) => {
  	curriculum((newA[0].selected+newA[1].selected), newA[2].selected)
  },{deep: true});	

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
	.filter-box{
		height: auto;
		width: auto;
	  .selectInfo{
	  	width: 100px;
	  	height: 38px;
	  	background-color: #E9F2FF;
	  	border-radius: 4px;
	  	border: none;
	  	cursor: pointer;
	  };		
	  .btn-height{
	  	height: 38px;
	  }
	}
</style>
