<template>
  <div class="inner">
    <UserInfoPage />
  </div>
  {{user}}
</template>

<script setup>
import UserInfoPage from "../../components/Manager/UserInfoPage.vue";

	const props = defineProps({
		user: { 
			type: Array
		}
	})

	// props to data
	console.log(props.user)	
</script>

<style scoped></style>
