<template>
  <div class="container text-center">
	<!-- filter -->
	<!-- <div class="content-box filter-box">
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
	</div> -->
    <br/>
    <div class="">
      <label for="name">姓名</label>
      <input v-model="name" type="name"/>
    </div>
    <br/>
    <div class="">
      <label for="passWord">密碼</label>
      <input v-model="password" type="password"/>
    </div>
    <br/>
    <button class="btn btn-primary text-light" @click="login">登入</button>
    <div class="">{{name}}</div>
    <div class="">{{password}}</div>
    <div class="">{{nameErr}}</div>
  </div>
</template>

<script setup>

import { ref } from "vue"
import { useRouter, useRoute } from "vue-router"
import axios from "axios"
import store from "../store";

const router = useRouter()
const route = useRoute()

// const loginAuth = ref(
//   {
//     access: 1
//   }
// )

let name = ref('Jeff')
let password = ref('jeff123')
let group = ref('')
// dv102
// Jeff 
// jeff123
let nameErr = ref('');

const login = async () => {
	let href = "http://54.186.56.114:8081/login"
	let postData = {
		Class: 'dv102',
		// Class: group.value,
		Name: name.value,
		Password: password.value
	}
  // if(name.value == '' || password.value == '' || password.value == ''){
  //    nameErr.value = '請輸入完整資料'
  // }

  let {data} = await axios.post(href, postData)
  try{
  	console.log(data)
    store.dispatch('storeToken', data.data)

    // 解密Token
    const parseJwt = (token)=> {
      if (!token) {
        return
      }else{
        const base64Url = token.split(".")[1]
        const base64 = base64Url.replace("-", "+").replace("_", "/")
        return JSON.parse(window.atob(base64))
      }
    }

    // 儲存使用者資料
    let { sub } = parseJwt(data.data)
    let userData = sub
    store.dispatch('storeUserInfo', userData)
    console.log(store.state.userInfo)

    // 導入頁面
    switch (userData.Access) {
      case "1":
        router.push('/user/home')
        break;
      case "2":
        router.push('/manager/home')
        break;
      case "3":
        router.push('/company/home')
        break;
      default:
        router.push('/')
        break;
    }
  }catch{
    console.error();
  }

}

</script>

<style lang="scss" scoped>
.container{
  width: auto;
  height: auto;
  background: rgb(255, 255, 255);
  
}
</style>
