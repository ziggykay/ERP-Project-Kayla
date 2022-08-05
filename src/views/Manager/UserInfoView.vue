<template>
	<div class="inner">
		<keep-alive>		
	    <UserInfoPage :parent-user="user"/>
	  </keep-alive>
	 </div>		
</template>

<script setup>
import UserInfoPage from "../../components/Manager/UserInfoPage.vue";

	const props = defineProps({
	  user:{
	    type: String,
	    default: JSON.stringify({}) 
	  },		
	})

	// props to data
	const user = JSON.parse(props.user)
</script>

<style scoped></style>
