<template>
<div class="section">

  <overallVue :parent-data="totalData"/>
  
  <div class="container-fluid d-md-flex">
    <!-- 課程區塊 -->
    <div class="content-box class-box col d-flex">
      <p class="title"><strong>課程</strong></p>
      <hr/>
      <div class="scroll-box" >
        <template v-if="courseData[0]">
          <div v-for="data of courseData" :key="data">
            <ClassCard :parentData="data" @show-resources="getResources"/>
          </div>
        </template> 
        <div class="error" v-else>沒有課程可以顯示</div>
      </div> 
    </div>
    <!-- 影片區塊 -->
    <div class="content-box video-box col">
      <p class="title"><strong>相關影片</strong></p>
      <hr>
      <div class="btn-wrapper">
        <button class="btn btn-primary confirm-btn video-btn" :class="{'bg-white': !isVideo, 'text-black': !isVideo}"
        @click="changeShow">顯示影片</button>
        <button class="btn btn-primary confirm-btn video-btn" :class="{'bg-white': isVideo, 'text-black': isVideo}"
        @click="changeShow">顯示文章</button>
      </div>
      <div class="scroll-box">
        <!-- 影片 -->
        <template v-if="isVideo">
          <div class="" v-if="courseResources">
            <div class="video-card" v-for="data of courseResources.video" :key="data">
                <iframe width="504" height="283.5" :src="data.url" 
                  title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                </iframe>
              <div v-if="!data.url" class="">此課程暫無影片</div>
            </div>
          </div>
          <div v-else class="error">沒有影片</div>
        </template>
        <!-- 文章 -->
        <template v-if="!isVideo">
          <div class="" v-if="courseResources">
            <div class="video-card" v-for="data of courseResources.article" :key="data">
              <a :href="data.url" class="article-link">{{ data.title }}</a>
            </div>
          </div>
          <div v-else class="error">沒有文章</div>
        </template>
      </div>
    </div>
  </div>

</div>

</template>

<script setup>
  import overallVue from "../baseComponents/Overall.vue";
  import ClassCard from "../../components/baseComponents/ClassCard.vue";
  import axios from "axios";
  import { ref, reactive, watch, defineAsyncComponent } from "vue";

  // overall 用變數
  const totalData = ref([
    {
      title: '課程總時數',
      number: '',
      color: '#558ABA'
    },
    {
      title: '課程總堂數',
      number: '',
      color: '#1AAF68'
    },
    {
      title: '已進行堂數',
      number: '',
      color: '#1AAF68'
    },
    {
      title: '完成率',
      number: '',
      color: '#1AAF68'
    }
  ])
  // 全部課程用變數
  const courseData = ref([])
  const input = ref(
    {
      "group": "fn101",
      "name": "Rossen"
    }
  )

  // 獲得全部課程
  const getCourses = async()=>{
    let {data} = await axios.get('http://54.186.56.114:8080/course', { params:{ group: "fn101", name: 'Rossen'}} )
      courseData.value = data.data.course

      // 計算 overall 用資料
      totalData.value[0].number = `${data.data.total[0].totalhours}小時`
      totalData.value[1].number = `${data.data.total[0].totalcourse}堂`
      totalData.value[2].number = `${data.data.total[0].progress}堂`
      totalData.value[3].number = `${(data.data.total[0].progress/data.data.total[0].totalcourse)*100}%`
  }
  getCourses()


  // 顯示切換
  let isVideo = ref(true)
  function changeShow(){
		isVideo.value = !isVideo.value
	}

  // 影片文章資料
  let courseResources = ref(
  )

  function getResources (resource) {
    courseResources.value = '';
    courseResources.value = resource
    // console.log(courseResources.value)
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
.btn-wrapper{
  margin: 1rem 0;
  .btn{
    margin-right: .5rem;
  }
}
.class-box{   
  flex-direction: column;  
  width: auto;
  height: auto;
  max-height: 100vh;
  hr{
    margin: 0;
  }
  .search-bar{
    min-width: 5rem;
    max-width: 15rem;
    margin-left: 1rem;
  }
}
.video-box{
  display: flex;            
  flex-direction: column;  
  width: auto;
  height: auto;
  max-height: 100vh;
  hr{
    margin: 0;
  }
  .video-card{
    // width: 400px;
    // height: 300px;
    margin: 30px 0 30px 0;
  }
}
.scroll-box{
  height: auto;
  margin: 0.5rem;
  overflow: auto;
}
</style>
