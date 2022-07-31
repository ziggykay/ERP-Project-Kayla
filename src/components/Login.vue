<template>
  <div class="container text-center">
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
    <div class="err">{{ errMsg }}</div>
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

// user:
// fn211
// WWW 
const selectType = ref([])
const selectNumber = ref([])
const type = ref('')
const number = ref('')

let errMsg = ref('')


let name = ref('KJH')
let password = ref('8743')
let group = ref('')

// user:
// fn211
// WWW
// 1202

// manager:
// KJH
// 8743

let nameErr = ref('');

const login = async () => {
	let href = "http://54.186.56.114/login"
	let postData = {
		// group: 'dv102',
		group: 'manager',
		// Class: group.value,
		account: name.value,
		password: password.value
	}
  // if(name.value == '' || password.value == '' || password.value == ''){
  //    nameErr.value = '請輸入完整資料'
  // }
  let {data} = await axios.post(href, postData)
  console.log(data)
  if(data.message == 'failure'){
    console.error(data.data)
    errMsg.value = data.data
    return
  } else if (data.message == 'success'){
    try{
      // 儲存Token
      store.dispatch('storeToken', data.data.access_token)
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
      let { sub } = await parseJwt(data.data.access_token)

      // 儲存使用者資料
      let userData = sub
      store.dispatch('storeUserInfo', userData)
      console.log(store.state.userInfo)
      const userStatus = store.state.userInfo[0].Access
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
    }catch(e){
      console.error(e);
      errMsg.value = '抱歉，伺服器發生錯誤'
    }
  }
}
  

</script>

<style lang="scss" scoped>
.container{
  width: auto;
  height: auto;
  background: rgb(255, 255, 255);
}
.err{
  color: red;
}
</style>
