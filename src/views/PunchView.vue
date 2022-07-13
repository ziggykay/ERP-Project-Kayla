<template>
<!-- <NavbarSidebar /> -->
<div class="section">
  <div class="container-fluid">
    <div class="btn-section">
      <button class="btn confirm-btn">班級篩選</button>
      <button class="btn confirm-btn">個別學員</button>
    </div>
    <div class="content-box overall-box">
      <p class="title"><strong>以班級篩選</strong></p>
      <div class="overall d-md-flex m-3 justify-content-start">
        <div class="dropdown">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            下拉式選單
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li><a class="dropdown-item" href="#">選項一</a></li>
            <li><a class="dropdown-item" href="#">選項二</a></li>
            <li><a class="dropdown-item" href="#">選項三</a></li>
          </ul>
        </div>
        <div class="dropdown">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            下拉式選單
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li><a class="dropdown-item" href="#">選項一</a></li>
            <li><a class="dropdown-item" href="#">選項二</a></li>
            <li><a class="dropdown-item" href="#">選項三</a></li>
          </ul>
        </div>
        <div class="dropdown">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            下拉式選單
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li><a class="dropdown-item" href="#">選項一</a></li>
            <li><a class="dropdown-item" href="#">選項二</a></li>
            <li><a class="dropdown-item" href="#">選項三</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="content-box overall-box">
      <p class="title"><strong>總覽</strong></p>
      <hr/>
      <div class="overall d-md-flex m-3 justify-content-around">
        <div class="overall-item">
          <p class="label">出席率</p>
          <p class="number">400</p>
        </div>
        <div class="overall-item">
          <p class="label">遲到率</p>
          <p class="number">400</p>
        </div>
        <div class="overall-item">
          <p class="label">缺席率</p>
          <p class="number">400</p>
        </div>
        <div class="overall-item">
          <p class="label">課程總時數</p>
          <p class="number">400</p>
        </div>
      </div>
    </div>
    <div class="container-fluid d-md-flex">
      <div class="content-box piechart-box col-4">
        <p class="title"><strong>出勤狀況比例</strong></p>
        <hr/>
        <div class="piechart"></div>
      </div>
      <div class="content-box bar-chart-box col-8">
        <p class="title"><strong>出勤狀況(人數)</strong></p>
        <hr>
        <div class="scroll-box">
          <div class="video-card">video</div>
        </div>
      </div>
    </div>
  </div>
</div>

</template>

<script>
export default {
  components:{
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
      margin-right: 50px;
    }
    .number{
    font-size: 2.5rem;
    color: rgb(1, 111, 169);
    }
  }
}
.piechart-box{
  display: inline-block;
  width: auto;
  height: auto;
  .piechart{
    width: 400px;
    height: 500px;
    background-color: rgb(156, 25, 25);
  } 
}
.bar-chart-box{
  display: inline-block;
  width: auto;
  height: auto;
  max-height: 600px;
  .video-card{
    width: 400px;
    height: 300px;
    background-color: aqua;
    margin: 30px 0 30px 0;
  }
}
</style>
