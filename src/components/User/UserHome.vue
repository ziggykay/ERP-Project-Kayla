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
      <hr/>
      <div class="" v-if="todayClass!=''">
        <div class="class-card">
          <div class="class-title d-flex justify-content-between">
            <p class="title">{{ todayClass[0].course }}</p>
          </div>
          <div class="class-content container-fluid d-flex">
            <div class="percent-section col-3">
              <p class="percent-number">{{ Math.floor(todayClass[0].present)/(todayClass[0].totalhours)*100 }}%</p>
              <p class="percent-desc">{{ todayClass[0].status }}</p>
            </div>
            <div class="bar-section col-9">
              <p class="bar-label">總時數：{{ todayClass[0].totalhours }}小時</p>
              <p class="bar-label">已完成：{{ Math.floor(todayClass[0].present) }}小時</p>
              <div class="progress">
                <div
                  class="progress-bar"
                  role="progressbar"
                  :style="`width: ${Math.floor(todayClass[0].present)/(todayClass[0].totalhours)*100 }%`"
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="error" v-else>沒有課程可以顯示</div>
    </div>

    <!-- 日誌 -->
    <div class="content-box diary-box col-1">
      <p class="title"><strong>日誌登打狀態</strong></p>
      <hr />
      <div class="container">
        <p>{{ diaryMsg }}</p>
        <div
          :class="[diaryMsg == '今日尚未登打' ? 'diarySign-red' : 'diarySign-green']"
        ></div>
      </div>
    </div>

  </div>

  <!-- 職缺 -->
  <div class="content-box job-box">
    <p class="title"><strong>推薦職缺</strong></p>
    <hr/>
    <div class="container d-flex job-wrapper">
      <div class="content-box-border job-card" v-for="data of jobData" :key="data">
        <p>{{ data.Job }}</p>
        <hr/>
        <p>工作地點：{{ data.Region }}</p>
        <p>技能：{{ data.Skill }}</p>
        <a :href="data.Url">{{data.Resource}}</a>
      </div>
    </div>
  </div>
  <!-- 彈出視窗-系統反應區-->
	<button id="show" class="btn-primary icon" @click="systemReaction">
		<i class="fa-solid fa-envelopes-bulk text-light"></i>
	</button>
	<teleport to="body">
<!-- 		<div class="back-black" v-if="isDisabled">		
		</div> -->
		  <div class="serveIcon" v-if="isDisabled">
			  <div class="mx-5">
			    <div class="">
			      <div class="text-primary my-4">系統反應區</div>
			      <div id="close" class="close" @click="systemReaction">X</div>
			    </div>
			    <div class="dialogTitle mb-3">
			      <input v-model="title" type="text" placeholder="標題 :" />
			    </div>
			    <div class="question mb-3">
			      <textarea v-model="content" type="text" placeholder="請輸入問題..." />
			    </div>
			    <div class="text-end">
			      <button id="send" @click="sendQuestion" class="btn btn-primary text-light">送出</button>
			    </div>
			  </div>
		  </div>			
		
	</teleport>	
  <!-- 彈出視窗-系統反應區 -->
<!--   <div class="serveIcon">
    <button id="show" class="btn-primary icon" @click="systemReaction">
      <i class="fa-solid fa-envelopes-bulk text-light"></i>
    </button>
    <dialog id="infoModal">
      <div class="mx-5">
        <div class="">
          <div class="text-primary my-4">系統反應區</div>
          <div id="close" class="close" :click="close">X</div>
        </div>
        <div class="dialogTitle mb-3">
          <input v-model="title" type="text" placeholder="標題 :" />
        </div>
        <div class="question mb-3">
          <textarea v-model="content" type="text" placeholder="請輸入問題..." />
        </div>
        <div class="text-end">
          <button id="send" @click="sendQuestion" class="btn btn-primary text-light">送出</button>
        </div>
      </div>
    </dialog>
  </div> -->
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

// punch
const punchData = ref([]);

const getTodayPunch = async () => {
  let href = "http://54.186.56.114:8080/punch";
  let group = 'dv102';
  let name = 'Jeff';

  let { data } = await axios.get(href, { params: {
    group: group,
    cur: 'today',
    name: name
  }});
  punchData.value = data.punch
};
getTodayPunch();

// class
const todayClass = ref([]);

const getTodayCourse = async () => {
  let group = 'fn101'
  let name = 'Rossen'
  let href = 'http://54.186.56.114:8080/course'
  let { data } = await axios.get(href, {params:{
    group: group,
    // cur:'today',
    startdate: '2022-01-12',
    stopdate: '2022-01-12',
    name: name
  }})
  todayClass.value = data.data.course
}
getTodayCourse()

// diary
let name = ref('Jeff')
let group = ref('dv102')

let diaryMsg = ref("尚未登打日誌");

const getTodayDiary = async () => {
  let href = `http://54.186.56.114:8081/status/${group.value}/${name}`
  let { data } = await axios.get(href)
  diaryMsg.value = data.data.message
}
getTodayDiary()

// job
const jobData = ref([
  {
    "Job": "網頁前端工程師",
    "Region": "台北市",
    "Resource": "104人力銀行",
    "Skill": "GIT,VISUAL STUDIO,HTML,JAVASCRIPT,CSS,SASS,REACTJS,VUEJS",
    "Url": "https://www.104.com.tw/job/7f8cc?jobsource=jolist_c_relevance"
  },
  {
    "Job": "資深雲端系統工程師",
    "Region": "台北市",
    "Resource": "104人力銀行",
    "Skill": "LINUX,SHELL,MYSQL,AWS",
    "Url": "https://www.104.com.tw/job/7idlx?jobsource=jolist_a_relevance"
  }
]);

const getJob = async () => {
  let href = `http://54.186.56.114:8081/RecommandCareer/${group.value}/${name}`
  let { data } = await axios.get(href)
  // console.log(data)
}
getJob()

const title = ref('')
const content = ref('')

//彈出視窗-系統反應區==================================================================== 
const isDisabled = ref(false)
const systemReaction = () => {
	isDisabled.value = !isDisabled.value
  // let btn = document.querySelector("#show");
  // let infoModal = document.querySelector("#infoModal");
  // let send = document.querySelector("#send");
  // let close = document.querySelector("#close");
  // btn.addEventListener("click", function () {
  //   infoModal.showModal();
  // });
  // send.addEventListener("click", function () {
  //   infoModal.close();
  // });
  // close.addEventListener("click", function () {
  //   infoModal.close();
  // });
}

// let infoModal = document.querySelector("#infoModal");

// const close = () => {
//   infoModal.close()
// }

const sendQuestion = async () => {
  // let { data } = await axios.post(
  //   `http://54.186.56.114:8081/Message/${group}/${name}`,
  //   {
  //     Title,
  //     Content,
  //     Access
  //   }
  // )
}



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
// 彈出視窗-系統反應區
.back-black{
	position: fixed;
	top: 80px;
	left: 250px;
	width: 100%;
	height: 100%;
	min-height: calc(100vh - 80px); 
	background:rgba(0, 0, 0, 0.5);
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
  textarea{
    resize: none;
  }
  .text-primary{
    width: auto;
  }
  .dialogTitle input {
    width: 100%;
  }
  .question textarea {
    width: 100%;
    height: 20vh;
  }
  .close{
    margin-top: -50px;
    float: right;
    color: #74abdd;
    cursor: pointer;
    &:hover{
      color: #000;
    }
  }
}
.class-box {
  flex-direction: column;
  width: auto;
  height: auto;
  max-height: 100%;
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
          font-size: 1.8rem;
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
          margin: 1rem 1rem 0 0;
          font-size: 0.8rem;
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
.job-box {
  width: auto;
  height: auto;
  .job-wrapper{
    height: auto;
    .job-card{
      height: auto;
    }
  }
}
</style>
