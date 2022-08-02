<template>
  <div class="container-fluid d-flex">
    <!-- 出勤 -->
    <div class="content-box punch-box col">
      <p class="title"><strong>今日打卡狀態</strong></p>
      <hr />
      <div class="container d-flex justify-content-around">
        <p>日期</p>
        <p>姓名</p>
        <p>簽到</p>
        <p>簽退</p>
      </div>
      <div class="container d-flex justify-content-around" v-if="punchData">
        <p v-for="data in punchData[0]">
          {{ data }}
        </p>
      </div>
      <div class="container d-flex justify-content-around" v-else>
        <p>暫無資料</p>
      </div>
    </div>

    <!-- 課程 -->
    <div class="content-box class-box col">
      <p class="title"><strong>今日課程</strong></p>
      <hr />
      <div class="" v-if="todayClass != ''">
        <div class="class-card">
          <div class="class-title d-flex justify-content-between">
            課程名稱：{{ todayClass[0].course }}
          </div>
          <div class="class-content container-fluid d-flex">
            <div class="percent-section col-3">
              <p class="percent-number mt-3">
                {{
                  (Math.floor(todayClass[0].present) /
                    todayClass[0].totalhours) *
                  100
                }}%
              </p>
              <p class="percent-desc">{{ todayClass[0].status }}</p>
            </div>
            <div class="bar-section col-9 mt-1">
              <p class="bar-label">
                總時數：{{ todayClass[0].totalhours }}小時
              </p>
              <!-- <br /> -->
              <p class="bar-label">
                已完成：{{ Math.floor(todayClass[0].present) }}小時
              </p>
              <div class="progress">
                <div
                  class="progress-bar"
                  role="progressbar"
                  :style="`width: ${
                    (Math.floor(todayClass[0].present) /
                      todayClass[0].totalhours) *
                    100
                  }%`"
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="error mx-3" v-else>沒有課程可以顯示</div>
    </div>

    <!-- 日誌 -->
    <div class="content-box diary-box col-1">
      <p class="title"><strong>日誌登打狀態</strong></p>
      <hr />
      <div class="d-flex align-items-center justify-content-center mt-3">
        <div class="text-center mt-4">
          <div
            class="mx-5"
            :class="[
              diaryMsg == '今日尚未登打' ? 'diarySign-red' : 'diarySign-green',
            ]"
          ></div>
          <br />
          <div class="mx-2">
            <p class="diaryMsg">{{ diaryMsg }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 職缺 -->
  <div class="content-box job-box">
    <p class="title"><strong>推薦職缺</strong></p>
    <hr />
    <div class="container d-flex job-wrapper" v-if="jobData.length != 0">
      <div
        class="content-box-border job-card"
        v-for="data of jobData"
        :key="data"
      >
        <p class="multiline-ellipsis">{{ data.Job }}</p>
        <hr />
        <p>工作地點：{{ data.Region }}</p>
        <p class="multiline-ellipsis">技能：{{ data.Skill }}</p>
        <a :href="data.Url">{{ data.Resource }}</a>
      </div>
    </div>
    <div v-else class="mx-3">暫無資料</div>
  </div>
  <!-- 彈出視窗-系統反應區-->
  <button id="show" class="btn-primary icon" @click="systemReaction">
    <i class="fa-solid fa-envelopes-bulk text-light"></i>
  </button>
  <teleport to="body">
    <div class="serveIcon modal-background" v-if="isDisabled">
      <div class="container bg">
        <div class="mx-5">
          <div class="">
            <div class="text-primary my-4">系統反應區</div>
            <div id="close" class="close" @click="systemReaction">X</div>
          </div>
          <div class="dialogTitle mb-3">
            <input v-model="title" type="text" placeholder="標題 :" />
          </div>
          <div class="question mb-3">
            <textarea
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
    </div>
  </teleport>
</template>

<script setup>
import { ref, onMounted } from "vue";
import store from "../../store";
import axios from "axios";
const token = store.getters["auth/getToken"];
// punch
const punchData = ref([]);

const getTodayPunch = async () => {
  let href = "http://54.186.56.114/punch";
  try {
    let { data } = await axios.get(href, {
      params: { cur: "today" },
      headers: { authorization: `Bearer ${token}` },
    });
    punchData.value = data.punch;
  } catch (e) {
    console.error(e);
  }
};
getTodayPunch();
// class
const todayClass = ref([]);
const getTodayCourse = async () => {
  let href = "http://54.186.56.114/course";
  try {
    let { data } = await axios.get(href, {
      params: {
        // cur:'today',
        startdate: "2022-05-12",
        stopdate: "2022-05-12",
      },
      headers: { authorization: `Bearer ${token}` },
    });
    todayClass.value = data.data.course;
  } catch (e) {
    console.error(e);
  }
};
getTodayCourse();
// diary
let diaryMsg = ref("暫無資料");
const getTodayDiary = async () => {
  let href = `http://54.186.56.114/diary/status`;
  try {
    let { data } = await axios.get(href, {
      headers: { authorization: `Bearer ${token}` },
    });
    diaryMsg.value = data.data.message;
  } catch (e) {
    console.error(e);
  }
};
getTodayDiary();

// job
const jobData = ref([]);
const getJob = async () => {
  let href = `http://54.186.56.114/diary/RecommandCareer`;
  try {
    let { data } = await axios.get(href, {
      headers: { authorization: `Bearer ${token}` },
    });
    console.log(data);
    jobData.value = data.data;
  } catch (e) {
    console.error(e);
  }
};
getJob();

//彈出視窗-系統反應區====================================================================

const title = ref("");
const content = ref("");

const isDisabled = ref(false);
const systemReaction = () => {
  isDisabled.value = !isDisabled.value;
};
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
};
</script>
<style lang="scss" scoped>
.inner {
  height: 90vh;
}
.filter-box {
  height: auto;
  width: auto;
  .selectInfo {
    width: 100px;
    height: 38px;
    background-color: #e9f2ff;
    border-radius: 4px;
    border: none;
    cursor: pointer;
  }
  .btn-height {
    height: 38px;
  }
}
.punch-box {
  flex-direction: column;
  width: auto;
  height: auto;
  min-height: 12rem;
  // max-height: 100%;
}
// 彈出視窗-系統反應區
.back-black {
  position: fixed;
  top: 80px;
  left: 250px;
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 80px);
  background: rgba(0, 0, 0, 0.5);
  z-index: 20;
}
.serveIcon {
  // position: absolute;
  // top: 25%;
  // left: 25%;
  background: white;
  width: 50%;
  height: 50%;
  border: none;
  box-shadow: 0 2px 6px #ccc;
  border-radius: 10px;
  z-index: 15;
  button.icon {
    width: 50px;
    height: 50px;
    border: 0 * 9;
    border-radius: 50%;
  }
  textarea {
    resize: none;
  }
  .text-primary {
    width: auto;
  }
  .dialogTitle input {
    width: 100%;
  }
  .question textarea {
    width: 100%;
    height: 20vh;
  }
  .close {
    margin-top: -50px;
    float: right;
    color: #74abdd;
    cursor: pointer;
    &:hover {
      color: #000;
    }
  }
}
.class-box {
  flex-direction: column;
  width: auto;
  height: auto;
  min-height: 12rem;
  // max-height: 100%;
  .class-card {
    width: auto;
    height: auto;
    .title {
      color: rgb(52, 52, 52);
      font-size: 1.2rem;
      margin-top: 1rem;
    }
    .watch-btn {
      height: 2.2rem;
      margin-top: 1rem;
    }
    .class-content {
      .percent-section {
        text-align: center;
        padding-top: 1rem;
        .percent-number {
          font-size: 0.8rem;
          margin-bottom: 0%;
        }
        .percent-desc {
          font-size: 0.8rem;
        }
      }
      .bar-section {
        padding-top: 1.5rem;
        .bar-label {
          display: inline;
          // margin: 1rem 1rem 0 0;
          font-size: 0.4rem;
        }
        .progress {
          margin-top: 1rem;
          border-style: solid;
          border-width: 1px;
          border-color: #74abdd;
          background-color: transparent;
          .progress-bar {
            background-color: rgb(0, 200, 236);
          }
        }
      }
    }
  }
}
.diarySign-red {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgb(224, 12, 12);
}
.diarySign-green {
  @extend .diarySign-red;
  background-color: rgb(12, 224, 40);
}
.diary-box {
  flex-direction: column;
  width: auto;
  height: auto;
  min-height: 12rem;
  // max-height: 100%;
}
.job-box {
  width: auto;
  height: auto;
  min-height: 12rem;
  .job-wrapper {
    height: auto;
    .job-card {
      height: auto;
    }
  }
}
.modal-background {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  background: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
}
.bg {
  background-color: #fff;
  height: auto;
  width: 60%;
  text-align: center;
  border-radius: 10px;
}
.icon {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  position: fixed;
  right: 5%;
  bottom: 5%;
}
.multiline-ellipsis {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
}
</style>
