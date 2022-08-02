<template>
  <!-- filter -->
	<div class="content-box filter-box">
		<p class="title"><strong>查看日誌</strong></p> 	  	
		<hr/>
		<div class="d-flex flex-wrap">	 
	  	<select class="selectInfo me-2" v-model="projectType" @change="axiosProject">
	  		<option value="">請選擇類型</option>
				<option v-for="(data, index) of selectProjectType" :value="data.item">
					{{ data.name }}
				</option>	      	 	
	  	</select>		  	 
	  	<select class="selectInfo me-2" v-model="project">
	  		<option value="">請選擇專案</option>
				<option v-for="(data, index) of selectProjct" :value="data.item">
					{{ data.name }}
				</option>	      	 	
	  	</select>
	    <div class="py-1">
	      <input class="mx-1" type="checkbox" id="checkbox" v-model="checked"/><span>企業已回覆</span>
	    </div>	  		  		 	  	  	
		</div> 		 	
		<div class="d-flex mt-2 flex-wrap">
	  	<Datepicker class="datepicker mb-2 me-2 w-auto" v-model="date" range/>
	  	<button class="confirm-btn btn btn-height" @click="search">搜尋</button>
		</div>
	</div>


  <!-- chart -->
  <div class="content-box overall-box">
    <div class="py-2 checkBoxInner">
      <div v-for="(data, index) of changeData" class="content-box-border checkDiv d-flex">
        <div class="d-flex bigText">
          <div class="text align-self-center">
            <div>
              <p>日期</p>
              <p class="single-ellipsis">{{ data.Time }}</p>
            </div>
          </div>
          <div class="text align-self-center">
            <p>姓名</p>
            <p>{{ data.Name }}</p>
          </div>
          <div class="text align-self-center">
            <p>內文</p>

            <p class="single-ellipsis">{{ data.Content }}</p>
          </div>
        </div>
        <div class="align-self-center">
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
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRouter, useRoute } from 'vue-router'
import store from  "../../store";
import axios from "axios"


const token = store.getters["auth/getToken"]
const router = useRouter()

const date = ref(""); 	// date
onMounted(() => {
  const startDate = new Date(2022, 6, 2);
  const endDate = new Date(2022, 6, 31)
  date.value = [startDate, endDate]	
})
watch(date, (newVal, oldVal) => { //  set date to yyyy-mm-dd
	for(let i = 0; i <= date.value.length - 1; i++){
		date.value[i] = newVal[i].toISOString().split('T')[0] 
	}
});

const project = ref("")// dynamic select option
// const type = store.state.userInfo[0].Class.slice(0,2) // fix select option
// const number = store.state.userInfo[0].Class.slice(2)
// const name = store.state.userInfo[0].Name
const projectType = ref("")


const selectProjct = ref([])// dynamic select option value
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
	}				 		 // fix select option	value //fix slect option value //fix select option value
]);
const selectProjectType = ref([
	{
		name: "專案",
		item: "專案"
	},					
	{
		name: "產品",
		item: "產品"
	},
])		

const axiosProject = async() =>{
	let href = "http://54.186.56.114/diary/Getdatalist";
	selectProjct.value = [];
	project.value = ''
	
	try{
		let { data } = await axios.get(href, {headers:{'authorization': `Bearer ${token}`}})
		let filterProject = data.data.Project.filter((item)=>{
			return item.Status == projectType.value
		})
		filterProject.forEach(function(item, index){
			selectProjct.value.push({
				name: item.Project,
				item: item.Project
			})			
		})
	}
	catch(e){
		console.log(e)
	}
}

// ======================================================================
// diary data
const diaryData = ref([])
const changeData = ref([]) //企業回復狀態陣列
const checked = ref(false) //企業回復狀態判斷
const search = async() =>{
	let href = 'http://54.186.56.114/diary/ReadDiaryLog'
	let postData = {
		date_from: date.value[0],
		date_to: date.value[1],
		project: project.value,
	}
	try{
		diaryData.value = []
		let { data } = await axios.post(href, postData, {headers: {'authorization': `Bearer ${token}`}})
		// console.log(data)
		data.data.forEach(function(item, index){
			diaryData.value.push(item)
		})
		changeData.value = diaryData.value
	}
	catch(e){
		console.log(e)
		alert("資料錯誤")
	}
}


// entReply
watch(checked, (newVal, oldVal) => { //  set date to yyyy-mm-dd
	if(newVal == true){
		changeData.value =  diaryData.value.filter((item)=>{
		 	return item.Ent_reply !== null
		})
	}
	else{
		changeData.value = diaryData.value
	} 
});

// =========================================================
// to  /user/checkSelfDiary"
function checkUserInfo(data) {
  router.push({
    name: "CheckSelfDiary",
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
.overall-box {
  width: auto;
  height: auto;
}

.checkDiv {
  width: 60vw;
  height: auto;
  p {
    margin-bottom: 0;
  }
}
.checkDiv:hover {
  background-color: #558aba;
  .checkBtn {
    background-color: #22496d;
  }
  .text {
    color: #fff;
  }
}
.bigText {
  width: 80%;
  height: 10%;
}
.text {
  width: 30%;
}
.checkBoxInner {
  overflow-y: scroll;
  height: 55vh;
}
.single-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
