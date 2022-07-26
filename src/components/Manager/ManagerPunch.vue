<template>
	<!--change button  -->
	<div class="boxContainer">
  	<button class="confirm-btn btn me-3 shadow "  :class="{'bg-white': !isGrade, 'text-black': !isGrade}" @click="changeShow('ManagerPunchGroup')">各別班級</button>
  	<button class="confirm-btn btn me-3 shadow"  :class="{'bg-white': isGrade, 'text-black': isGrade}" @click="changeShow('ManagerPunchStudent')">個別學員</button>
	</div>
 <!-- <component :is="currentView"></component> -->

 <template v-if="isGrade">
 	<ManagerPunchGroup></ManagerPunchGroup>
 </template>
 <template v-else>
 	<ManagerPunchStudent></ManagerPunchStudent>
 </template>
</template>

<script setup>
	import ManagerPunchGroup from "./ManagerPunchGroup.vue"
	import ManagerPunchStudent from "./ManagerPunchStudent.vue"	
	import {ref, onMounted, computed, watch} from "vue"
	// changeComponent
	const isGrade = ref(true)
	const currentView = ref("ManagerPunchGroup")

	function changeShow(val){
		isGrade.value = !isGrade.value
		currentView.value = val
	}	
</script>

<style lang="scss" scoped>
	.boxContainer{
		margin: 1rem;
	}	
	.overall-box{
	  width: auto;
	  height: auto;

	}

	.check-info{
  	border-radius: 4px;
  	cursor: pointer;		
	}		
	.chartContainer{
		height: 70vh;
		.chartHeight{
			height: 100%
		}
	}		
	.bar-width{
		width: 40%
	}
	.pie-width{
		width: 60%;
	}
</style>

	