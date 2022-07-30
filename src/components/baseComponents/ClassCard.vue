<template>
  <div class="class-card content-box">
    <div class="class-title d-flex justify-content-between">
      <p class="title">{{ classData.course }}</p>
      <!-- <button type="button" class="btn confirm-btn watch-btn"
       @click="updateVideo">網路資源</button> -->
      <button type="button" class="btn confirm-btn watch-btn"
       @click="getResources">網路資源</button>
    </div>
    <div class="class-content container-fluid d-flex">
      <div class="percent-section col-3">
        <p class="percent-number">{{ progress }}%</p>
        <p class="percent-desc">{{ status }}</p>
      </div>
      <div class="bar-section col-9">
        <p class="bar-label">
          總時數：{{ classData.totalhours }}小時
        </p>
        <p class="bar-label">
          已完成：{{ Math.floor(classData.present) }}小時
        </p>
        <div class="progress">
          <div class="progress-bar" role="progressbar" :style="`width: ${progress}%`" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import axios from "axios"
  import { ref, onMounted, defineEmits } from "vue"

  const props = defineProps({
    parentData: Object
  })

  const classData = ref(props.parentData)
  let progress = Math.floor((classData.value.present/classData.value.totalhours)*100)
  let status = ref('')
  const define = () => {
    progress === 100 ? status.value = '已完成' : status.value = '進行中' 
  }
  define()

  const classResources = ref([])

  const getResources = () =>{
    axios.post("http://54.186.56.114:8080/course", 
      {
        // course:"php",
        course:classData.value.course,
        group:"fn101"
      }
    ).then(res => {
      classResources.value = res.data.data
      sendData()
    })
  }

  const emit = defineEmits(['showResources'])
  
  const sendData = () =>{
    emit('showResources', classResources.value)
  }

</script>


<style lang="scss" scoped>
.class-box{   
  flex-direction: column;  
  width: auto;
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
</style>