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
              <label for="name" class="text-primary">姓名</label>
            </div>
            <div>
              <input id="name" type="name" />
            </div>
          </span>
        </div>
      </div>
      <div class="d-flex justify-content-center inputWidth">
        <div class="align-self-top inputPassword">
          <span>
            <div class="mt-4 text-start">
              <label for="name" class="text-primary">密碼</label>
            </div>
            <div>
              <input id="name" type="name" />
            </div>
          </span>
        </div>
      </div>
      <!-- <div class="d-flex justify-content-center inputWidth">
        <div class="align-self-top inputPassword">
          <span>
            <div class="mt-4 text-start">
              <label for="name" class="text-primary">驗證碼</label>
            </div>
            <div>
              <input id="name" type="name" />
            </div>
          </span>
        </div>
      </div> -->
      <!-- <div class="d-flex justify-content-center mt-4 inputWidth">
        <div class="align-self-top">
          <span class="mt-4">
            <input id="name" value="AkB48" />
          </span>
          <span class="mt-4">
            <i class="fa-solid fa-rotate-left text-secondary mx-1"></i>
          </span>
          <span class="mt-4">
            <i class="fa-solid fa-volume-high text-secondary mx-1"></i>
          </span>
        </div>
      </div> -->
    </div>
    <!-- <span class="mt-4">
      <label class="mt-4 text-primary" for="">選擇登入身份</label>
      <br />
      <select>
        <option>學生</option>
        <option>管理員</option>
        <option>企業</option>
      </select>
    </span>

    <span class="mt-4">
      <label for="name">姓名</label>
      <br />
      <input id="name" type="name" />
    </span>
    <br />
    <div class="mt-4">
      <label for="passWord">密碼</label>
      <input id="passWord" type="password" />
    </div>
    <div class="mt-5">
      <label for="passWord">驗證碼</label>
      <input id="passWord" type="password" />
    </div>
    <br /> -->
    <!-- <router-link to="/home">
      <button class="btn btn-primary text-light">Login</button>
    </router-link> -->
    <button class="btn btn-primary text-light my-4" @click="toHomePage">
      Login
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const loginAuth = ref({
  access: 1,
});

const toHomePage = () => {
  // router.push('/user/home')
  switch (loginAuth.value.access) {
    case 1:
      router.push("/user/home");
      break;
    case 2:
      router.push("/manager/home");
      break;
    case 3:
      router.push("/company/home");
      break;
    default:
      router.push("/");
      break;
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
