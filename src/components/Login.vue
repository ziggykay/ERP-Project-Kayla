<template>
  <div class="container text-center">
    <div class="">
      <label for="">選擇身分</label>
      <select v-model="Class">
          <option>學生</option>
          <option>管理員</option>
          <option>企業</option>
      </select>
    </div>
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

let name = ref('WWW')
let password = ref('1202')
let group = ref('8743')

// user:
// fn211
// WWW 
// 1202

// manager:
// KJH
// 8743

let nameErr = ref('');
const login = async () => {
	let href = "http://54.186.56.114/diary/login"
	let postData = {
		Class: 'fn211',
		// Class: 'manager',
		// Class: group.value,
		Name: name.value,
		Password: password.value
	}
  // if(name.value == '' || password.value == '' || password.value == ''){
  //    nameErr.value = '請輸入完整資料'
  // }
  let {data} = await axios.post(href, postData)
  try{

    // 儲存Token
    store.dispatch('storeToken', data.data)
    // 解密Token取得使用者資料
    const parseJwt = (token)=> {
      if (!token) {
        return
      }else{
        const base64Url = token.split(".")[1]
        const base64 = base64Url.replace("-", "+").replace("_", "/")
        return JSON.parse(window.atob(base64))
      }
    }
    let { sub } = await parseJwt(data.data)

    // 儲存使用者資料
    let userData = sub
    store.dispatch('storeUserInfo', userData)
    const userStatus = store.state.userInfo[0].Access
    console.log(userStatus)

    // 導至對應頁面
    switch (userStatus) {
      case '1':
        router.push('/user/home')
        break;
      case '2':
        router.push('/manager/home')
        break;
      case '3':
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
