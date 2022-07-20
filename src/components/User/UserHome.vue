<template>
  <div class="container-fluid">
    <div class="row">

      <!-- 出勤 -->
      <div class="content-box punch-box">
        <p class="title"><strong>今日打卡狀態</strong></p>
        <hr/>
        <div class="punch-card" v-if="punchData">
          <div class="container d-flex justify-content-around">
            <p>日期</p>
            <p>姓名</p>
            <p>簽到</p>
            <p>簽退</p>
          </div>
          <div class="container d-flex justify-content-around">
            <p>{{punchData.date}}</p>
            <p>{{punchData.name}}</p>
            <p>{{punchData.in}}</p>
            <p>{{punchData.out}}</p>
          </div>
        </div>
        <div class="error" v-else>本日無出勤資料</div>

      </div>

      <!-- 課程 -->
      <div class="content-box class-box ">
        <p class="title"><strong>今日課程</strong></p>
        <hr/>
        <div class="class-card" v-if="todayClass">
          <div class="class-title d-flex justify-content-between">
            <p class="title">{{ todayClass.name }}</p>
          </div>
          <div class="class-content container-fluid d-flex">
            <div class="percent-section">
              <p class="percent-number">{{ todayClass.progress }}%</p>
              <p class="percent-desc">{{ todayClass.status }}</p>
            </div>
            <div class="bar-section">
              <p class="bar-label">
                總時數：{{ todayClass.time }}小時
              </p>
              <p class="bar-label">
                已完成：{{ todayClass.done }}小時
              </p>
              <div class="progress">
                <div class="progress-bar" role="progressbar" :style="`width: ${todayClass.progress}%`" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="error" v-else><span>本日無課程可以顯示</span></div>
      </div>

      <!-- 日誌 -->
      <div class="content-box diary-box col-2">
        <p class="title"><strong>今日日誌登打狀態</strong></p>
        <hr/>
        <div class="container">
          <p>{{ diaryMsg }}</p>
          <div :class="[ diaryData == 0 ? 'diarySign-red' : 'diarySign-green' ]"></div>
        </div>
        <button class="btn confirm-btn" @click="change">test</button>
      </div>
    </div>
  </div>
  
  <!-- 職缺 -->
  <div class="content-box job-box">
    <p class="title"><strong>推薦職缺</strong></p>
    <hr>
    <div class="container" v-for="data in jobData" :key="data">
      <div class="content-box-border job-card">
        <p>{{ data.title }}</p>
        <hr/>
        <p>技能：<span v-for="skill in data.skillSet" :key="skill">{{skill}}, </span></p>
        <p>工作地點：{{data.location}}</p>
        <p>平台：{{data.platform}}</p>
        <button class="btn confirm-btn" @click="jobDetail(data.url)">詳細資訊</button>
      </div>
  </div>

  </div>


</template>

<script setup>
  import {watch, ref, onMounted} from "vue"
  import axios from "axios"


  // punch
  const punchData = ref({})
  const getPunchData = async()=>{
      // date: '20220718',
      // name: '王小明',
      // in: '08:55',
      // out: '16:37',  	
  	// let { data } = axios.get("/punch)
  }

  // class
  const todayClass = ref(
    {
      id: 2,
      name: 'Jquery&Jquery extensions',
      progress: 100,
      status: '已完成',
      time: 40,
      done: 40,
    }
  )

  // diary
  const diaryMsg = ref('尚未登打日誌')
  const diaryData = ref(0)

  // 更改日誌區顯示內容
  const changeDiaryStatus = () => {
    diaryData.value == 1 ? diaryMsg.value = '日誌已登打' : diaryMsg.value = '尚未登打日誌' 
  }

  // TODO:測試 watch 功能用，串接API後刪除
  const change = () => {
    if(diaryData.value == 0){
      diaryData.value = 1
    }else{
      diaryData.value = 0
    }
  }
  //

  onMounted(
    changeDiaryStatus
  )

  watch(
    diaryData, changeDiaryStatus
  )

  // job
  const jobData = ref([
    {
      title: '前端工程師',
      skillSet:[
        'JavaScript', 'BootStrap', 'Node.JS', 'HTML'
      ],
      location: '台北',
      platform: '104',
      url: 'https://google.com.tw'
    },
  ])

  // 開新分頁至對應平台
  const jobDetail = (url) => {
    // location.assign(url)
    window.open(url)
  }

</script>

<style lang="scss" scoped>

.title{
  width: auto;
}
.punch-box{
  height: auto;
  width: auto;
  .punch-card{
    width: 100%;
    p{
      margin: 0 1rem 0 1rem;
    }
  }
}
.class-box{   
  flex-direction: column;
  height: auto;
  max-height: 100%;
  .class-card{
    width: auto;
    height: auto;
    .title{
      color: rgb(52, 52, 52);
      font-size: 1.2rem;
      margin-top: 1rem;
    }
    .watch-btn{
      height: 2.2rem;
      width: fit-content;
      margin-top: 1rem;
    }
    .class-content{
      .percent-section{
        text-align: center;
        padding-top: 1rem; 
        .percent-number{
          font-size: 1.8rem;
          margin-bottom: 0%;
        }
        .percent-desc{
          font-size: 0.8rem;
        }
      }
      .bar-section{
        padding-top: 1.5rem;
        .bar-label{
          display: inline;
          margin: 1rem 1rem 0 0;
          font-size: 0.8rem;
        }
        .progress{
          margin-top: 1rem;
          border-style: solid;
          border-width: 1px;
          border-color: #74abdd;
          background-color: transparent;
          .progress-bar{
            background-color: rgb(0, 200, 236);
          }
        }
      }
    }
  }
}
.diary-box {
  height: auto;
}
.diarySign-red{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgb(224, 12, 12);
}
.diarySign-green{
  @extend .diarySign-red;
  background-color: rgb(12, 224, 40);
}
.job-box{
  width:  auto;
  height: auto;
  max-height: 100%;

  .job-card{
    height: auto;
  }
}
.error{
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
