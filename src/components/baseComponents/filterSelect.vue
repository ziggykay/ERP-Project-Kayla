<template>
	<div class="content-box filter-box">
  	<p class="title"><strong>{{title}}</strong></p> 	  	
		<hr/>
		<div class="d-flex flex-wrap">
	  	<select class="selectInfo me-2" v-for="(item, index) of selectArr" v-model="selectModelArr[index]">
				<option v-for="(innerItem, index) of item" :value="innerItem.item">
					{{ innerItem.name }}
				</option>	      	 	
	  	</select>
	  	<slot name="bar"></slot>
		</div>  	
		<div class="d-flex mt-2 flex-wrap">
    	<Datepicker class="datepicker mb-2 me-2 w-auto" v-model="date" range/>
    	<!-- <button class="confirm-btn btn btn-height">搜尋</button> -->
    	<slot></slot>	  
		</div>
	</div>
</template>

<script setup>
	import {ref, onMounted, watch, computed} from "vue"
	//props 
	const props = defineProps({
	  parentSelectArr: Array,
	  parentTitle: String
	})

	// props to data
	const selectArr = ref(props.parentSelectArr)
	const title = ref(props.parentTitle)
	
	//selectModelArr
	const selectModelArr = ref([]) 
	for(let i = 0; i <= selectArr.value.length - 1; i++){
		selectModelArr.value.push(selectArr.value[i][0].item)
	}

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

	//emit userSelectData to parent component
	const emit = defineEmits(['userSelectData'])

  watch([date, selectModelArr], ([newA, newB], [prevA, prevB]) => {
		emit('userSelectData', [newA, newB])
  },{deep: true});

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
</style>
