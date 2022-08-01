<template>
  <div class="container text-center inner">
    <div class="py-3"><h2 class="text-primary">Logo</h2></div>
    <div class="inputs">
      <div class="d-flex justify-content-center inputWidth">
        <div class="align-self-top mx-1 access">
          <div class="text-start">
            <label for="name" class="text-primary">選擇登入身份</label>
          </div>
          <div>
            <select>
              <option>選擇身份</option>
              <option>學生</option>
              <option>管理員</option>
              <option>企業</option>
            </select>
          </div>
        </div>
        <div class="align-self-top mx-1 access">
          <div class="text-start">
            <label for="name" class="text-primary">選擇班級</label>
          </div>
          <div>
            <select>
              <option>選擇班級</option>
              <option>dv102</option>
              <option>fn102</option>
              <option>se211</option>
            </select>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center inputWidth">
        <div class="align-self-top inputPassword">
          <span>
            <div class="mt-4 text-start">
              <label for="name">姓名</label>
            </div>
            <div>
              <input v-model="name" type="name" />
            </div>
          </span>
        </div>
      </div>
      <div class="d-flex justify-content-center inputWidth">
        <div class="align-self-top inputPassword">
          <span>
            <div class="mt-4 text-start">
              <label for="passWord">密碼</label>
            </div>
            <div>
              <input v-model="password" type="password" />
            </div>
          </span>
        </div>
      </div>
    </div>
    <div class="error">{{ errMsg }}</div>
    <button class="btn btn-primary text-light my-4" @click="login">
      Login
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import store from "../store";
const router = useRouter();
const route = useRoute();
const selectType = ref([]);
const selectNumber = ref([]);
const type = ref("");
const number = ref("");
let errMsg = ref("");
// const axiosType = async () => {
//   selectType.value = []
//   selectNumber.value = []
//   type.value = ''
//   number.value = ''
//   const href = 'http://54.186.56.114/diary/Getdatalist'
//   try{
//     let {data} = await axios.post(href)
//     let type = data.data.type
//     for(let i = 0; i < type.length; i++){
//       selectType.value.push({
//         name: type[i],
//         item: type[i]
//       })
//     }
//   }catch(e){
//     errMsg.value = '伺服器發生錯誤'
//     console.error(e)
//   }
// }
// axiosType()
// const axiosNumber = async() =>{
//   // clear  option value
//   selectNumber.value = []
//   number.value = ''
//   let href = 'http://54.186.56.114/diary/Getdatalist'
//   if(type.value !== ""){
//     if(type.value === 'manager' || 'ent'){
//       console.log(type.value)
//       return
//     } else if (type.value === 'fn' || 'se' || 'dv'){
//         try{
//         let postData = {
//           type: type.value
//         }
//         let { data } = await axios.post(href, postData)
//         let number = data.data.number
//         for(let i = 0; i < number.length; i++){
//           selectNumber.value.push({
//             name: number[i],
//             item: number[i]
//           })
//         }
//       }catch(e){
//         errMsg.value = '伺服器發生錯誤'
//         console.error(e)
//       }
//     }
//   }else{
//     alert("請選擇資料")
//   }
// }
let name = ref("Albee");
let password = ref("xyIWYIuZ4IqHU");
let group = ref("");
// user:
// dv102
// Albee
// xyIWYIuZ4IqHU
// manager:
// KJH
// 8743
let nameErr = ref("");
const login = async () => {
  let href = "http://54.186.56.114/login";
  let postData = {
    group: "dv102",
    // group: 'manager',
    account: name.value,
    password: password.value,
  };
  // if(name.value == '' || password.value == '' || password.value == ''){
  //    nameErr.value = '請輸入完整資料'
  // }
  let { data } = await axios.post(href, postData);
  try {
    // 儲存Token
    store.dispatch("auth/storeToken", data.data.access_token);
    // 解密Token取得使用者資料
    const parseJwt = (token) => {
      if (!token) {
        return;
      } else {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace("-", "+").replace("_", "/");
        return JSON.parse(window.atob(base64));
      }
    };
    let { sub } = await parseJwt(data.data.access_token);
    // 儲存使用者資料
    let userData = sub;
    store.dispatch("auth/storeUserInfo", userData);
    const userStatus = store.getters["auth/getUserAccess"];

    // 導至對應頁面
    switch (userStatus) {
      case "1":
        router.push("/user/home");
        break;
      case "2":
        router.push("/manager/home");
        break;
      case "3":
        router.push("/company/home");
        break;
      default:
        router.push("/");
        break;
    }
  } catch (e) {
    console.error(e);
    errMsg.value = "抱歉，伺服器發生錯誤";
  }
};
</script>

<style lang="scss" scoped>
// body {
//   background-color: #558aba;
// }
.inner {
  margin-top: 2.5rem;
  width: 60%;
  // width: auto;
  height: auto;
  // height: 80vh;
  background: rgb(255, 255, 255);
  border-radius: 10px;
  .inputs {
    width: auto;
    label {
      font-size: 0.6rem;
    }
    .inputWidth {
      width: 100%;
      .access {
        select {
          width: 100%;
        }
      }
      .inputPassword {
        input {
          width: 100%;
        }
      }
    }
  }
}
</style>
