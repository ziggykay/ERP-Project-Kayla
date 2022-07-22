<template>
  <div class="content-box overall-box">
    <div class="py-2 checkBoxInner">
      <div>
        <!-- TODO:直接套用History可能會有Bug -->
        <a href="javascript:history.back()" class="back"
          ><div><i class="fa-solid fa-arrow-left"></i> 回列表頁</div></a
        >
      </div>
      <div class="d-flex align-items-center justify-content-between">
        <div class="between mx-2">
          <p class="text-primary"><strong>學員詳細資料</strong></p>
        </div>
        <div class="between mx-2">
          <button type="button" class="my-3 btn btn-primary confirm-btn">
            <i class="fa-solid fa-pen-to-square mx-1"></i>編輯資訊
          </button>
        </div>
      </div>
      <hr />
      <div>
        <div class="mt-2 d-flex">
          <div
            class="innerTitle align-self-center mx-2 text-primary text-center"
          >
            學號
          </div>

          <input class="content-box-border mx-3" type="text" />
        </div>
        <div class="mt-2 d-flex">
          <div
            class="innerTitle align-self-center mx-2 text-primary text-center"
          >
            班別
          </div>

          <input class="content-box-border mx-3" type="text" />
        </div>
        <div class="mt-2 d-flex">
          <div
            class="innerTitle align-self-center mx-2 text-primary text-center"
          >
            班級
          </div>

          <input class="content-box-border mx-3" type="text" />
        </div>
        <div class="mt-2 d-flex">
          <div
            class="innerTitle align-self-center mx-2 text-primary text-center"
          >
            姓名
          </div>

          <input class="content-box-border mx-3" type="text" />
        </div>
        <div class="mt-2 d-flex">
          <div
            class="innerTitle align-self-center mx-2 text-primary text-center"
          >
            帳號
          </div>

          <input class="content-box-border mx-3" type="text" />
        </div>
        <div class="mt-2 d-flex">
          <div
            class="innerTitle align-self-center mx-2 text-primary text-center"
          >
            Email
          </div>

          <input class="content-box-border mx-3" type="text" />
        </div>
        <div class="mt-2 d-flex">
          <div
            class="innerTitle align-self-center mx-2 text-primary text-center"
          >
            Password
          </div>

          <input class="content-box-border mx-3" type="text" />
        </div>
      </div>
      <div class="text-end mt-3">
        <button type="button" class="m-2 btn btn-primary cancel-btn">
          <i class="fa-solid fa-trash-can"></i>
          刪除帳號
        </button>
        <button type="button" class="m-2 btn btn-primary confirm-btn">
          <i class="fa-solid fa-circle-check"></i>
          確認修改
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
</script>

<style lang="scss" scoped>
.overall-box {
  width: auto;
  height: auto;
}

.checkBoxInner {
  a {
    text-decoration: none;
    font-size: 0.8rem;
  }
  .content-box-border {
    width: 60%;
    height: auto;
  }
  .between {
    margin: 0;
    padding: 0;
  }
  .innerTitle {
    margin: 0;
    margin-left: 1rem;
    padding: 0;
    width: 15%;
  }
}
</style>
