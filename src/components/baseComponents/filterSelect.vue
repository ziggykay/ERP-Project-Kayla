<template>
	<div class="content-box filter-box">
  	<p class="title"><strong>parent.title</strong></p> 	  	
		<hr/>
		<div class="d-flex flex-wrap">
	  	<select class="selectInfo me-2" v-for="(item, index) of parentSelectArr" v-model="item.selected">
				<option v-for="(innerItem, index) of item.data" :value="innerItem.item">
					{{ innerItem.name }}
				</option>	      	 	
	  	</select>	
		</div>  	

		<div class="d-flex mt-2 flex-wrap">
    	<Datepicker class="datepicker mb-2 me-2 w-auto" v-model="date" range/>
    	<button class="confirm-btn btn btn-height">搜尋</button>
    	<button class="confirm-btn btn btn-height ms-auto ">匯出此頁</button>	  		  			
		</div>
	</div>
</template>

<script type="text/javascript">
	import {ref, onMounted, computed} from "vue"
	
	export default {
	  name:'filterStudnet',
	  props: {
	    parentSelectArr: Array
	  },	   
	  setup(props){
	  	// props data
	  	const parentSelectArr  = ref(props.parentSelectArr)
	  	// date
	  	const date = ref("");
	  	onMounted(() => {
		    const startDate = new Date();
		    const endDate = new Date(new Date().setDate(startDate.getDate() + 7))
		    date.value = [startDate, endDate]	
	  	})
	  	return { parentSelectArr, date }
	  }
	} 
</script>

<style lang="scss" scoped>
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

	