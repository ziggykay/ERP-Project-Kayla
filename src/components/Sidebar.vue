<script setup>

</script>
<template>
<div class="p-3 bg-white sidebar" style="width: 280px;">
    <a href="/" class="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom">
      <span class="title">LOGO</span>
    </a>
    <ul class="list-unstyled ps-0">
      <li class="mb-1">
        <button class="btn align-items-center collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="false">
          首頁
        </button>
      </li>
      <li class="mb-1">
        <button class="btn align-items-center collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
          出勤紀錄
        </button>
      </li>
      <li class="mb-1">
        <button class="btn align-items-center collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
          學習進度
        </button>
      </li>
      <li class="mb-1">
        <button class="btn btn-toggle align-items-center  collapsed" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
          日誌
        </button>
        <div class="collapse" id="orders-collapse">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <button class="btn align-items-center sub-btn" 
             data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
              查看日誌
            </button>
            <button class="btn align-items-center sub-btn"
             data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
              日誌登打率
            </button>
          </ul>
        </div>
      </li>
      <li class="mb-1">
        <button class="btn align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
          查看問題回覆
        </button>
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
.sidebar{
  height: 100vh;
  background-color: #fff;
  .title{
    color: #558ABA;
    font-size: x-large;
  }
  .btn{
    width: 180px;
    height: 50px;
    text-align: left;
    &:before{
      // TODO:預計要放 icon 
      content: url();
    }
    &:hover{
      color: #fff;
      background-color: #558ABA;
    }
  }
  .sub-btn{
    background-color: rgb(242, 242, 242);
    padding-left: 30px ;
    &:before{
      content: '';
    }
  }
  .btn-toggle{
    &:after {
      // TODO:預計替換此 icon
      content: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='rgba%280,0,0,.5%29' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 14l6-6-6-6'/%3e%3c/svg%3e");
    }
  }
}
</style>