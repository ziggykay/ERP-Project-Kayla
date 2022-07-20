<template>
<div class="section">

  <overallVue :parent-data="allClassData"/>
  
  <div class="container-fluid d-md-flex">
    <!-- 課程區塊 -->
    <div class="content-box class-box col d-flex">
      <p class="title"><strong>課程</strong></p>
      <hr/>
      <div class="scroll-box" >
        <!-- <div v-for="data of classData" :key="data.id"> -->
          <template v-if="courseData[0]">
            <div v-for="data of courseData" :key="data">
              <ClassCard :parentData="data" @show-video="getVideo"/>
            </div>
          </template> 

        <!-- <div class="error" v-if="classData == ''">沒有課程可以顯示</div> -->
        <div class="error" v-else>沒有課程可以顯示</div>
      </div> 
    </div>
    <!-- 影片區塊 -->
    <div class="content-box video-box col">
      <p class="title"><strong>相關影片</strong></p>
      <hr>ß
      <div class="scroll-box">
        <template v-if="videoData">
          <div class="video-card" v-for="data of videoData" :key="data">
            <iframe width="504" height="283.5" :src="data.src" 
              title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
            </iframe>
          </div>  
        </template>
        <div class="error" v-else>沒有影片</div>
      </div>
    </div>
  </div>

  <button class="btn" @click="logData">test</button>
</div>

</template>

<script setup>
  import overallVue from "../baseComponents/Overall.vue";
  import ClassCard from "../../components/baseComponents/ClassCard.vue";
  import axios from "axios";
  import { ref, reactive, watch, defineAsyncComponent } from "vue";
  
  // const AsyncComp = defineAsyncComponent(() => {
  //   import ClassCard from "../../components/baseComponents/ClassCard.vue";
  // })


  const courseData = ref([])
  const input = ref(
    {
      "group": "fn101",
      "name": "Rossen"
    }
  )

  const test = async()=>{
    let {data} = await axios.get('http://54.186.56.114:8080/course', { params:{ group: "fn101", name: 'Rossen'}} )
      courseData.value = data.data.course

      console.log(data.data)
  }
  test()



  const allClassData = ref([
    {
      title: "課程總時數",
      number: 400,
      color: "#558ABA"
    },
    {
      title: "課程總堂數",
      number: "5%",
      color: "#1AAF68"
    },
    {
      title: "已進行堂數",
      number: "5堂",
      color: "#1AAF68"
    },
    {
      title: "完成率",
      number: 50,
      color: "#1AAF68"
    }
  ]);

  const classData = ref([
    {
      id: 1,
      name: '系統服務與計算機概論',
      progress: 20,
      status: '進行中',
      time: 40,
      done: 8,
      video: [
        {
          src: 'https://www.youtube.com/embed/TWyJJjvLiqs'
        },
        {
          src: 'https://www.youtube.com/embed/0jeTAEQziv4'
        },
        {
          src: 'https://www.youtube.com/embed/AKqwkjcyRGY'
        }
      ]
    },
    {
      id: 2,
      name: 'Jquery&Jquery extensions',
      progress: 100,
      status: '已完成',
      time: 40,
      done: 40,
      video: [
        {
          src: 'https://www.youtube.com/embed/MbjObHmDbZo&t'
        },
        {
          src: 'https://www.youtube.com/embed/rBLuvEwIF5E'
        }
      ]
    },
    {
      id: 3,
      name: 'Linux基礎到架站',
      progress: 80,
      status: '進行中',
      time: 40,
      done: 32,
      video: [
        {
          src: 'https://www.youtube.com/embed/TWyJJjvLiqs'
        },
        {
          src: 'https://www.youtube.com/embed/rBLuvEwIF5E'
        }
      ]
    },
    {
      id: 4,
      name: '響應式網頁專題製作',
      progress: 80,
      status: '進行中',
      time: 40,
      done: 32,
      video: [
        {
          src: 'https://www.youtube.com/embed/TWyJJjvLiqs'
        },
        {
          src: 'https://www.youtube.com/embed/rBLuvEwIF5E'
        }
      ]
    },
    {
      id: 5,
      name: '響應式網頁專題製作',
      progress: 100,
      status: '已完成',
      time: 40,
      done: 40,
      video: [
        {
          src: 'https://www.youtube.com/embed/TWyJJjvLiqs'
        },
        {
          src: 'https://www.youtube.com/embed/rBLuvEwIF5E'
        }
      ]
    },
  ])

  let videoData = ref(
    // classData.value[0].video
  )

  function getVideo (vid) {
    // videoData.value = '';
    // videoData.value = vid
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
  hr{
    margin: 0;
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
