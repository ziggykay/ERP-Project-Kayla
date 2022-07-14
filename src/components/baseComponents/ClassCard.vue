<template>
  <div class="class-card content-box">
    <div class="class-title d-flex justify-content-between">
      <p class="title">{{ data.name }}</p>
      <button type="button" class="btn confirm-btn watch-btn" @click="showVideo(data.id)"
      >觀看影片</button>
    </div>
    <div class="class-content container-fluid d-flex">
      <div class="percent-section col-3">
        <p class="percent-number">{{ data.progress }}%</p>
        <p class="percent-desc">{{ data.status }}</p>
      </div>
      <div class="bar-section col-9">
        <p class="bar-label">
          總時數：{{ data.time }}小時
        </p>
        <p class="bar-label">
          已完成：{{ data.done }}小時
        </p>
        <div class="progress">
          <div class="progress-bar" role="progressbar" :style="`width: ${data.progress}%`" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: 'classCard',
  props:{
    parentData: Object
  },
  setup(props){
    const data = ref(props.parentData)
    function showVideo () {
      data[0].video[0]
    };

    return { data, showVideo }
  }
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
          border-color: #558ABA;
           background-color: transparent;
          .progress-bar{
          }
        }
      }
    }
  }
}
</style>