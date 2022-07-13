<template>
<!-- <NavbarSidebar /> -->
<div class="section">
  <overallVue/>
  <!-- <div class="container-fluid">
    <div class="content-box overall-box">
      <p class="title"><strong>總覽</strong></p>
      <hr/>
      <div class="overall d-md-flex m-3 justify-content-around">
        <div class="overall-item">
          <p class="label">課程總時數</p>
          <p class="number">400</p>
        </div>
        <div class="overall-item">
          <p class="label">課程總時數</p>
          <p class="number">400</p>
        </div>
        <div class="overall-item">
          <p class="label">課程總時數</p>
          <p class="number">400</p>
        </div>
        <div class="overall-item">
          <p class="label">課程總時數</p>
          <p class="number">400</p>
        </div>
    </div>
  </div> -->
  <div class="container-fluid d-md-flex">
    <!-- 課程區塊 -->
    <div class="content-box class-box col d-flex">
      <p class="title"><strong>課程</strong></p>
      <hr/>
      <div class="scroll-box">
        <div class="class-card content-box">
          <div class="class-title d-flex justify-content-between">
            <p class="title">JavaScript</p>
            <button type="btn" class="btn confirm-btn watch-btn">觀看影片</button>
          </div>
          <div class="class-content container-fluid d-flex">
            <div class="percent-section col-3">
              <p class="percent-number">60%</p>
              <p class="percent-desc">進行中</p>
            </div>
            <div class="bar-section col-9">
              <p class="bar-label">
                總時數：40小時
              </p>
              <p class="bar-label">
                已完成：10小時
              </p>
              <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 影片區塊 -->
    <div class="content-box video-box col">
      <p class="title"><strong>相關影片</strong></p>
      <hr>
      <div class="scroll-box">
        <div class="video-card">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/B-hv-N8gMjQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <div class="video-card">video</div>
      </div>
    </div>
  </div>
</div>
</div>

</template>

<script>
import overallVue from '../components/baseComponents/overall.vue'
import { ref } from "vue"
export default {
  components: overallVue,
  setup(){
    const classData = ref([
      {
        title: "出席率",
        number: "98%",
        color: "#558ABA"
      },
      {
        title: "遲到率",
        number: "5%",
        color: "#1AAF68"
      },
      {
        title: "遲到次數",
        number: "2天",
        color: "#1AAF68"
      },
      {
        title: "遲到時數",
        number: "2.5天",
        color: "#1AAF68"
      }
    ])
  }

}
</script>

<style lang="scss" scoped>
.overall-box{
  width: auto;
  height: auto;
  .overall-item{
    width: 100px;
    .label{
      margin-right: 10px;
    }
    .number{
    font-size: 2.5rem;
    color: rgb(1, 111, 169);
    }
  }
}
.class-box{   
  flex-direction: column;  
  width: auto;
  height: auto;
  // max-height: 600px;
  max-height: 100%;
  .class-card{
    width: auto;
    height: auto;
    .title{
      font-size: 1.5rem;
    }
    .watch-btn{
      height: 2.2rem;
    }
    .class-content{
      .percent-section{
        text-align: center;
        padding-top: 1rem; 
        .percent-number{
          font-size: 1.5rem;
        }
        .percent-desc{
          font-size: 0.8rem;
        }
      }
    .bar-section{
    //  background-color: rgb(42, 173, 144);
    padding-top: 1rem;
      .bar-label{
      display: inline;
      margin: 1rem 0 0 0;
      }
      .progress{
        margin-top: 1rem;
      }
    }
  }
    .watch-btn{
    float: right;
    }
  }
}
.video-box{
  // display: inline-block;
  display: flex;            
  flex-direction: column;  
  width: auto;
  height: auto;
  max-height: 100vh;
  // max-height: 600px;
  .video-card{
    width: 400px;
    height: 300px;
    background-color: aqua;
    margin: 30px 0 30px 0;
  }
}
.scroll-box{
  height: auto;
  margin: 0.5rem;
  overflow: auto;
}
</style>
