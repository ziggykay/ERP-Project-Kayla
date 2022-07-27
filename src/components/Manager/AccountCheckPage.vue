<template>
	<!-- filter -->
	<div class="content-box filter-box">
		<p class="title"><strong>帳號管理</strong></p> 	  	
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
	  		<option value="">全部學生</option>
				<option v-for="(data, index) of selectName" :value="data.item">
					{{ data.name }}
				</option>	      	 	
	  	</select>			 	  	  	
		</div>  	

		<div class="d-flex mt-2 ">
	  	<button class="confirm-btn btn btn-height me-2" @click="search">搜尋</button>
			<label class="btn confirm-btn upload">
				<input style="display:none;" ref="uploadFile" v-on:change="handleFileUpload()"  accept=".csv" type="file">
				批次新增學員(上傳CSV檔)
			</label>		  		
		</div>
	  <div class="mx-5 text-end">
  </div>		
	</div>	 
 
  <div class="content-box tableContainer">
    <div class="checkBox">
      <div class="d-flex align-items-center my-3">
        <div class="text">
          <div>學號</div>
        </div>
        <div class="text">
          <div>班別</div>
        </div>
        <div class="text">
          <div>班級</div>
        </div>
        <div class="text">
          <div>姓名</div>
        </div>
        <div class="text">
          <div>查看</div>
        </div>
      </div>
      <div class="checkDiv">
        <div
          class="d-flex align-items-center my-4"
          v-for="data of usersData"
          :key="data"
        >
          <div class="text">
            <div>{{ data.id }}</div>
          </div>
          <div class="text">
            <div>{{ data.group }}</div>
          </div>
          <div class="text">
            <div>{{ data.grade }}</div>
          </div>
          <div class="text">
            <div>{{ data.name }}</div>
          </div>
          <div class="text">
            <button
              class="btn btn-primary confirm-btn"
              @click="checkUserInfo(data)"
            >
              詳細資訊
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch,  onMounted } from "vue";
import { useRouter, useRoute } from 'vue-router'
import axios from "axios";
	
  const router = useRouter()

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
//=================================================================
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
// =================================================================
// get checkpage data
	const usersData = ref([])
	const search = async()=>{
		let href = 'http://54.186.56.114:8081/account'
		let axiosData = ''
		try{
				if(name.value == ""){
					let { data } = await axios.get(href, { params: { 
						type: type.value,
						number: number.value,
					}})
					axiosData = data.data
				}
				else{
					let { data } = await axios.get(href, { params: { 
						type: type.value,
						number: number.value,
						Name: name.value
					}})			
					axiosData = data.data	
				}
				// console.log(axiosData)
			// cleart usersData
			usersData.value = []			
			for(let i = 0; i <= axiosData.length; i++){
				usersData.value.push({
					access: axiosData[i].Access,
					group: axiosData[i].Class.slice(0,2),
					grade: axiosData[i].Class.slice(2),
					email: axiosData[i].Email,
					id: axiosData[i].Id,					
					name: axiosData[i].Name,
					password: axiosData[i].Password
				})
			}
		}
		catch(e){
			console.log(e)
			// alert("請輸入正確格式資料")
		}

	}
// ========================================================================
// to checkUserInfo
function checkUserInfo(data) {
  router.push({
    name: "AccountCheckId",
    params: {
    	user: JSON.stringify(data) 
    },
  });	
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
.tableContainer {
  width: auto;
  height: auto;
}
.checkBox {
  margin-left: 5%;
}
.inner {
  .searchInput {
    height: 1rem;
    border-radius: 5px;
  }
  .checkDiv {
    width: auto;
    height: auto;

    height: 60vh;
    overflow-y: scroll;
  }
  .checkDiv button:hover {
    background-color: #22496d;
  }
  .text {
    font-size: 1rem;
    width: 25%;
  }
}
</style>
