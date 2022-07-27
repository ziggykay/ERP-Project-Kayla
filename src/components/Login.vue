<template>
  <div class="container text-center">
	<!-- filter -->
	<div class="content-box filter-box">
		<div class="d-flex flex-wrap">
			 <label for="">身分</label>
	  	<select class="selectInfo me-2" v-model="type" @change="axiosNumber">
	  		<option value="">請選擇班別</option>
				<option v-for="(data, index) of selectType" :value="data.item">
					{{ data.name}}
				</option>	    	 	
	  	</select>
	  	<select class="selectInfo me-2" v-model="number">
	  		<option value="">請選擇班級</option>
				<option v-for="(data, index) of selectNumber" :value="data.item">
					{{ data.name }}
				</option>	      	 	
	  	</select>		  	 	  	 	
		</div> 		 	
	</div>
    <br/>
    <div class="">
      <label for="name">姓名</label>
      <input v-model="name" type="name"/>
    </div>
    <br/>
    <div class="">
      <label for="passWord">密碼</label>
      <input v-model="passWord" type="password"/>
    </div>
<!--     <div class="">
      <label for="passWord">驗證碼</label>
      <input id="passWord" type="password"/>
    </div> -->
    <br/>
    <!-- <router-link to="/home">
      <button class="btn btn-primary text-light">Login</button>
    </router-link> -->
    <button class="btn btn-primary text-light" @click="toHomePage">Login</button>
  </div>
</template>

<script setup>

import { ref } from "vue"
import { useRouter, useRoute } from "vue-router"

const router = useRouter()
const route = useRoute()

const loginAuth = ref(
  {
    access: 1
  }
)

const toHomePage = () => {
	let href = "http://54.186.56.114:8081/login"
	let postData = {
		Class,
		Name,
		Password
	}
	axios.post("href", )
  // switch (loginAuth.value.access) {
  //   case 1:
  //     router.push('/user/home')
  //     break;
  //   case 2:
  //     router.push('/manager/home')
  //     break;
  //   case 3:
  //     router.push('/company/home')
  //     break;
  //   default:
  //     router.push('/')
  //     break;
  // }
}

</script>

<style lang="scss" scoped>
.container{
  width: auto;
  height: auto;
  background: rgb(255, 255, 255);
  
}
</style>
