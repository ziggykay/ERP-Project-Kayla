<template>
  <div class="container-fluid">
    <div class="row">

      <!-- 出勤 -->
      <div class="content-box punch-box col">
        <p class="title"><strong>今日打卡狀態</strong></p>
        <hr/>
        <div class="container d-flex justify-content-around">
          <p>日期</p>
          <p>姓名</p>
          <p>簽到</p>
          <p>簽退</p>
        </div>
        <div class="container d-flex justify-content-around" v-if="punchData[0]">
        	<p v-for="data in punchData[0]">
        		{{data}}
        	</p>
        </div>
        <div class="container d-flex justify-content-around" v-else>
        	<p>
        		沒有資料
        	</p>
        </div>        
      </div>

      <!-- 課程 -->
      <div class="content-box class-box col">
        <p class="title"><strong>今日課程</strong></p>
        <hr/>
        <div class="class-card">
          <div class="class-title d-flex justify-content-between">
            <p class="title">{{ todayClass.name }}</p>
            <button type="button" class="btn confirm-btn watch-btn" @click="updateVideo"
            >觀看影片</button>
          </div>
          <div class="class-content container-fluid d-flex">
            <div class="percent-section col-3">
              <p class="percent-number">{{ todayClass.progress }}%</p>
              <p class="percent-desc">{{ todayClass.status }}</p>
            </div>
            <div class="bar-section col-9">
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
        <div class="error" v-if="todayClass == ''">沒有課程可以顯示</div>
      </div>

      <!-- 日誌 -->
      <div class="content-box diary-box col-2">
        <p class="title"><strong>日誌登打狀態</strong></p>
        <hr/>
        <div class="container">
          <p>{{ diaryMsg }}</p>
          <div :class="[ diaryData == 0 ? 'diarySign-red' : 'diarySign-green' ]"></div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- 職缺 -->
  <div class="content-box job-box">
    <p class="title"><strong>推薦職缺</strong></p>
    <hr>
    <div class="container">
      <div class="content-box-border job-card">
        <p></p>
        <hr/>
        <p></p>
      </div>
    </div>
  </div>

</template>

<script setup>
import {ref, onMounted} from "vue"
import axios from "axios"

// punch
const punchData = ref([])

const doAxios = async()=>{
	// get axios data
	let href = "http://localhost:80/api/punch"
	let startdate = new Date(2022, 2, 19).toISOString().split('T')[0] 
	let stopdate = new Date(2022, 2, 19).toISOString().split('T')[0]
	let group = 'fn101'
	let name = 'Rossen' 
	
	let {data} = await axios.get(href, { params: { group, startdate, stopdate, name}})
	console.log(data.data.punch[0])

	punchData.value.push({
    date: data.data.punch[0].classdate,
    name: data.data.punch[0].student,
    in: data.data.punch[0].intime,
    out: data.data.punch[0].outtime,
  })

}	
	doAxios();






// class
const todayClass = ref({
  id: 2,
  name: 'Jquery&Jquery extensions',
  progress: 100,
  status: '已完成',
  time: 40,
  done: 40,
})

// diary
const diaryMsg = ref('尚未登打日誌')
const diaryData = ref(1)

// job
const jobData = ref([
  {
    title: '前端工程師',
    skillSet:[
      'JavaScript', 'BootStrap', 'Node.JS'
    ],
    location: '台北',
    platform: '104'
  },

])


</script>

<style lang="scss" scoped>

.title{
  width: auto;
}
.punch-box{

}
.class-box{   
  flex-direction: column;
  width:  auto;
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
}
</style>
