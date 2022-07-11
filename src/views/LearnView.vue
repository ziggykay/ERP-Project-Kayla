<template>
<!-- <NavbarSidebar /> -->
<div class="section">
  <div class="container-fluid">
  <div class="content-box overall-box">
    <p class="title"><strong>總覽</strong></p>
    <hr/>
    <div class="overall d-md-flex justify-content-around">
      <div class="overall-item">
        <p>課程總時數</p>
        <p class="number">400</p>
      </div>
      <div class="overall-item">
        <p>課程總時數</p>
        <p class="number">400</p>
      </div>
      <div class="overall-item">
        <p>課程總時數</p>
        <p class="number">400</p>
      </div>
      <div class="overall-item">
        <p>課程總時數</p>
        <p class="number">400</p>
      </div>
    </div>
  </div>
  <div class="container-fluid d-md-flex">
    <!-- 課程區塊 -->
    <div class="content-box class-box">
      <p class="title"><strong>課程</strong></p>
      <hr/>
      <div class="class-card content-box">
        <p class="title">JavaScript</p>
        <button type="btn" class="btn confirm-btn watch-btn">觀看影片</button>
        <div class="percent">
          60
        </div>
        <div class="bar-section">
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
    <div class="content-box video-box">
      <p class="title"><strong>相關影片</strong></p>
      <div class="video-card">video</div>
    </div>
  </div>
</div>
</div>


</template>

<script>
// import NavbarSidebar from "../components/NavbarSidebar.vue";
export default {
  components:{
    // NavbarSidebar
  }
}
</script>

<style scoped>
.overall-box{
  width: auto;
}
.overall-item{
  width: 100px;
}
.number{
  font-size: 2.5rem;
  color: blue;
}
.class-box{
  display: inline-block;
  width: auto;
  height: auto;
}
.class-card{
  width: 500px;
  height: auto;
}
.class-card .title{
  
}
.watch-btn{
  float: right;
}
.video-box{
  display: inline-block;
  width: auto;
  height: auto;
}
.video-card{
  width: 400px;
  height: 300px;
  background-color: aqua;
  margin: 30px 0 30px 0;
}
</style>
