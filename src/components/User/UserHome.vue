<template>
  <div class="container-fluid d-flex">
    <!-- 出勤 -->
    <div class="content-box punch-box col-5 d-flex">
      <p class="title"><strong>今日打卡狀態</strong></p>
      <hr />
      <p>fdfs</p>
    </div>

    <!-- 課程 -->
    <div class="content-box class-box col-5 d-flex">
      <p class="title"><strong>課程</strong></p>
      <hr />
      <div class="scroll-box">
        <div class="class-card content-box">
          <div class="class-title d-flex justify-content-between">
            <p class="title">{{ todayClass.name }}</p>
            <button
              type="button"
              class="btn confirm-btn watch-btn"
              @click="updateVideo"
            >
              觀看影片
            </button>
          </div>
          <div class="class-content container-fluid d-flex">
            <div class="percent-section col-3">
              <p class="percent-number">{{ todayClass.progress }}%</p>
              <p class="percent-desc">{{ todayClass.status }}</p>
            </div>
            <div class="bar-section col-9">
              <p class="bar-label">總時數：{{ todayClass.time }}小時</p>
              <p class="bar-label">已完成：{{ todayClass.done }}小時</p>
              <div class="progress">
                <div
                  class="progress-bar"
                  role="progressbar"
                  :style="`width: ${todayClass.progress}%`"
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div class="error" v-if="todayData == ''">沒有課程可以顯示</div>
      </div>
    </div>

    <!-- 日誌 -->
    <div class="content-box col-2 diary-box">
      <div class="">test</div>
    </div>
  </div>

  <div class="content-box job-box">
    <p class="title"><strong>推薦職缺</strong></p>
    <hr />
  </div>
  <div class="serveIcon">
    <button id="show" class="btn-primary icon" @click="systemReaction">
      <i class="fa-solid fa-envelopes-bulk text-light"></i>
    </button>
    <dialog id="infoModal">
      <div class="mx-5">
        <div class="text-primary my-4">系統反應區</div>
        <div class="dialogTitle mb-3">
          <input type="text" placeholder="標題 :" />
        </div>
        <div class="question mb-3">
          <textarea type="text" placeholder="請輸入問題..." />
        </div>
        <div class="text-end">
          <button id="close" class="btn btn-primary text-light">close</button>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";

const todayClass = ref({
  id: 2,
  name: "Jquery&Jquery extensions",
  progress: 100,
  status: "已完成",
  time: 40,
  done: 40,
});

function systemReaction() {
  let btn = document.querySelector("#show");
  let infoModal = document.querySelector("#infoModal");
  let close = document.querySelector("#close");
  btn.addEventListener("click", function () {
    infoModal.showModal();
  });
  close.addEventListener("click", function () {
    infoModal.close();
  });
}
</script>

<style lang="scss" scoped>
.serveIcon {
  position: fixed;
  margin-top: 90vh;
  margin-left: 95vw;

  .icon {
    width: 50px;
    height: 50px;
    border: 0 * 9;
    border-radius: 50%;
  }
  dialog {
    width: 50%;
    height: 50%;
    border: none;
    box-shadow: 0 2px 6px #ccc;
    border-radius: 10px;
    margin-top: 30vh;
    margin-left: 30vw;
  }
  dialog::backdrop {
    background-color: rgba(24, 24, 24, 0.228);
  }
  .dialogTitle input {
    width: 100%;
  }
  .question textarea {
    width: 100%;
    height: 20vh;
  }
}
.title {
  width: 100%;
}

.punch-box {
  hr {
    color: red;
  }
}

.class-box {
  flex-direction: column;
  width: auto;
  height: auto;
  max-height: 100vh;
  hr {
    margin: 0;
  }
}
</style>
