<script setup>
import Navbar from "./components/baseComponents/Navbar.vue";
import Sidebar from "./components/baseComponents/Sidebar.vue";

import store from "./store"
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const token = store.getters['auth/getToken']

const noToken = () => {
	if(token === ''){
		router.push('/')		
	}
}
noToken()

const tokenExpired = () => {
	return 
}

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
