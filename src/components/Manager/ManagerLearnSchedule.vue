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
  <!-- chart -->
  <div class="content-box overall-box chartContainer" >
		<v-chart class="chartHeight" :option="barchart" autoresize />  	
  </div> 

</template>
<script setup>
	import VChart from "vue-echarts";
	import	{ref, watch, onMounted} from "vue"
	import axios from 'axios'
	import store from "../../store"
	
	
	// date
	const date = ref("");
	onMounted(() => {
    const startDate = new Date(2021, 11, 16);
    const endDate = new Date(2022, 4, 27)
    date.value = [startDate, endDate]	
	})
	//  set date to yyyy-mm-dd
	watch(date, (newVal, oldVal) => {
		for(let i = 0; i <= date.value.length - 1; i++){
			date.value[i] = newVal[i].toISOString().split('T')[0] 
		}
	});

	// dynamic select option
	const type = ref("")
	const number = ref("")
	const name = ref("") 


	// dynamic select option value have three function
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
	const selectType = ref([])
	const selectNumber = ref([])
	const selectName = ref([])	

	const axiosType = async() =>{
		// clear  option valeu
		selectType.value = []
		selectNumber.value = []
		selectName.value = []
		type.value = ''
		number.value = ''
		name.value = ''		
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
		selectName.value = []
		number.value = ''
		name.value = ''		
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

	const axiosName = async() =>{
		// clear  option valeu
		selectName.value = []
		name.value = ''		
		let href = 'http://54.186.56.114/diary/Getdatalist'
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
	
	const barchart = ref({
    title: {
      text: '學員學習進度表',
			textStyle: {
			  color: '#558ABA'
			},
				subtext: '', 
    },
    tooltip: {},
    legend: {
    	left: "right",
    },
    yAxis: {
      data: [],
      nameTextStyle: {
      	fontWeight: "bolder"
      }
    },
    xAxis: {
			nameTextStyle: {
      	fontWeight: "bolder"
      }
    },
	  series: [
	    {
	    	name: '課程時數',
	      data: [],
	      type: 'bar',
	      stack: 'x',
	      itemStyle: {
					color: '#558ABA'
	      },
	    },
	    {
	    	name: '學生學習時數',
	      data: [],
	      type: 'bar',
	      stack: 'x',
	      itemStyle: {
					color: '#FF6A3C'
	      },			      
	    }
	  ],	  		
	})	 
  //search bar chart axios data
	const search = async()=>{
		let href = "http://54.186.56.114/course"
		let config = {
		  headers:{
		  	'authorization': `Bearer ${store.state.token}`
		  },
		  params: {
				group: type.value+number.value,
				name: name.value,				 
				startdate: date.value[0], 
				stopdate: date.value[1] 		  	
		  },
		}		
		let axiosData = ''		
		try{
			let { data } = await axios.get(href, config)			
			axiosData = data.data.course			

			// 清空舊的資料再更新
			barchart.value.yAxis.data = [];
			barchart.value.series[0].data = [];
			barchart.value.series[1].data = []			
			for(let i = 0; i <= axiosData.length - 1; i++){
				barchart.value.yAxis.data.push(axiosData[i].course)
				barchart.value.series[0].data.push(axiosData[i].totalhours)
				barchart.value.series[1].data.push(axiosData[i].present)
			}
		}
		catch(e){
			console.log(e)
			alert("沒有該筆資料")
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
	.overall-box{
	  width: auto;
	  height: auto;
	}		
	.chartContainer{
		height: 100vh;
		.chartHeight{
			height: 100%
		}
	}			
</style>

	