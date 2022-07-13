<script setup>

// import LoginView from "./views/LoginView.vue";
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/Sidebar.vue";
</script>

<template>
	<Navbar v-if="$route.path !== '/'"></Navbar>
	<div class="container-fluid d-flex">
		<Sidebar v-if="$route.path !== '/'"></Sidebar>
		<div class="container-fluid m-3">
  		<router-view/>		
  	</div>
	</div>

</template>

<style scoped>

</style>
