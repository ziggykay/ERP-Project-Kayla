<template>
  <div class="container text-center inner">
    <!-- <div class="py-3"><h2 class="text-primary">Logo</h2></div> -->
    <div class="py-3"><img style="width:200px" src="../../public/FORESII_logo-01.png" alt="Logo"></div>
    <div class="inputs">
      <div class="d-flex justify-content-center inputWidth">
        <div class="align-self-top mx-1 access">
          <div class="text-start">
            <label for="name" class="text-primary">選擇登入身份</label>
          </div>
          <div>
            <select v-model="group">
              <option v-for="data of groupOption" :key="data" :value="data.item">
                {{data.name}}
              </option>
            </select>
          </div>
        </div>
        <div class="align-self-top mx-1 access">
          <div class="text-start">
            <label for="name" class="text-primary" disabled>
              選擇班級
            </label>
          </div>
          <div>
            <!-- <select v-model="grade"> -->
              <input type="text" class="isStudent" :disabled="isDisabled" v-model="group">
              <!-- <option>選擇班級</option>
              <option>dv102</option>
              <option>fn102</option>
              <option>se211</option>
            </select> -->
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
              <input v-model="name" type="name"/>
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
import { computed, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
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

const groupOption = ref([
  {
    name: "請選擇身份",
    item: ""
  },					
  {
    name: "學生",
    item: "student"
  },
  {
    name: "管理",
    item: "manager"
  },
  {
    name: "企業",
    item: "ent"
  }
])

let isDisabled = ref(true)


// user:
// dv102
// Albee
// xyIWYIuZ4IqHU

// manager:
// KJH
// 8743

// ent
// QWE公司
// 2345


let nameErr = ref("");


let confirmIdent = () => {
  console.log(group.value)
  group.value === 'student' ? isDisabled = false : isDisabled = true
}
confirmIdent()

const login = async () => {
	let href = "http://54.186.56.114/login"
	let postData = {
		// group: 'dv102',
		// group: 'manager',
		// group: 'ent',
    group: group.value,
		account: name.value,
		password: password.value
	}
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
        router.push("/company/checkdiary");
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