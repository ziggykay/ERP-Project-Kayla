<template>
  <div class="content-box overall-box">
    <div class="d-flex align-items-center justify-content-between">
      <div class="between mx-2">
        <p class="text-primary"><strong>系統反應管理</strong></p>
      </div>
    </div>
    <hr />
    <div class="container bg text-center">
      <div class="mx-5">
        <div class="dialogTitle mb-3">
          <input
            class="dialogTitleInput"
            v-model="title"
            type="text"
            placeholder="標題 :"
          />
        </div>
        <div class="question mb-3">
          <textarea
            class="dialogTitleText"
            v-model="content"
            type="text"
            placeholder="請輸入問題..."
          />
        </div>
        <div class="text-end my-4">
          <button
            id="send"
            @click="sendQuestion"
            class="btn btn-primary text-light"
          >
            送出
          </button>
        </div>
      </div>
    </div>
    <!-- </div> -->
  </div>
  <!-- </div> -->
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import store from "../../store";
const token = store.getters["auth/getToken"];

const title = ref("");
const content = ref("");

const sendQuestion = async () => {
  let href = `http://54.186.56.114/diary/Message`;
  let postData = {
    Title: title.value,
    Content: content.value,
  };
  try {
    let { data } = await axios.post(href, postData, {
      headers: { authorization: `Bearer ${token}` },
    });

    alert("已更新資料");
  } catch (e) {
    console.log(e);
    alert("更新失敗!");
  }
  clearForm();
};

const clearForm = () => {
  //清空v-model值
  title.value = "";
  content.value = "";
};
</script>

<style lang="scss" scoped>
.overall-box {
  width: auto;
  height: auto;
}
.dialogTitleInput {
  width: 90%;
}
.dialogTitleText {
  width: 90%;
  height: auto;
  min-height: 30vh;
}
</style>
