<template>
  <div class="container text-center">
    <div class="">
      <label for="">選擇身分</label>
      <select>
          <option>學生</option>
          <option>管理員</option>
          <option>企業</option>
      </select>
    </div>
    <br/>
    <div class="">
      <label for="name">姓名</label>
      <input id="name" type="name"/>
    </div>
    <br/>
    <div class="">
      <label for="passWord">密碼</label>
      <input id="passWord" type="password"/>
    </div>
    <div class="">
      <label for="passWord">驗證碼</label>
      <input id="passWord" type="password"/>
    </div>
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
  // router.push('/user/home')
  switch (loginAuth.value.access) {
    case 1:
      router.push('/user/home')
      break;
    case 2:
      router.push('/manager/home')
      break;
    case 3:
      router.push('/company/home')
      break;
    default:
      router.push('/')
      break;
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
