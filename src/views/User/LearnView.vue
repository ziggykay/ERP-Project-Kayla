<template>
<div class="section">

  <overallVue/>
  
  <div class="container-fluid d-md-flex">
    <!-- 課程區塊 -->
    <div class="content-box class-box col d-flex">
      <p class="title"><strong>課程</strong></p>
      <hr/>
      <div class="scroll-box" >
        <div v-for="data of classData" :key="data.id">
          <ClassCard :parentData="data"/>
        </div>
      </div> 
    </div>
    <!-- 影片區塊 -->
    <div class="content-box video-box col">
      <p class="title"><strong>相關影片</strong></p>
      <hr>
      <div class="scroll-box">
        <div v-for="data of classData" :key="data.id">
          <!-- <div class="video-card">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/B-hv-N8gMjQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
          <div class="video-card">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/ze9ZWoDCI5I" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div> -->
          <div class="video-card">
            <iframe width="504" height="283.5" :src="`https://www.youtube.com/watch?v=TWyJJjvLiqs`" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
          <!-- <div class="video-card">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/ze9ZWoDCI5I" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div> -->
        </div>
      </div>
    </div>
  </div>

</div>

</template>

<script>
import ClassCard from "../../components/baseComponents/ClassCard.vue";
import { ref } from "vue";
export default {
  components:{
    ClassCard
  },
  setup(){
    const classData = ref([
      {
        id: 1,
        name: '系統服務與計算機概論',
        progress: 20,
        status: '進行中',
        time: 40,
        done: 8,
        video:{
          videoOne: 'https://www.youtube.com/watch?v=TWyJJjvLiqs',
          videoTwo: 'https://www.youtube.com/watch?v=ze9ZWoDCI5I'
        }
      },
      {
        id: 2,
        name: 'Jquery&Jquery extensions',
        progress: 100,
        status: '已完成',
        time: 40,
        done: 40,
        video:{
          videoOne: 'https://www.youtube.com/watch?v=TWyJJjvLiqs',
          videoTwo: 'https://www.youtube.com/watch?v=ze9ZWoDCI5I'
        }
      },
      {
        id: 3,
        name: 'Linux基礎到架站',
        progress: 80,
        status: '進行中',
        time: 40,
        done: 32,
        video:{
          videoOne: 'https://www.youtube.com/watch?v=TWyJJjvLiqs',
          videoTwo: 'https://www.youtube.com/watch?v=ze9ZWoDCI5I'
        }
      },
      {
        id: 4,
        name: '響應式網頁專題製作',
        progress: 80,
        status: '進行中',
        time: 40,
        done: 32,
        video:{
          videoOne: 'https://www.youtube.com/watch?v=TWyJJjvLiqs',
          videoTwo: 'https://www.youtube.com/watch?v=ze9ZWoDCI5I'
        }
      },
    ])
    return { classData }
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
  max-height: 100vh;
}
.video-box{
  display: flex;            
  flex-direction: column;  
  width: auto;
  height: auto;
  max-height: 100vh;
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
