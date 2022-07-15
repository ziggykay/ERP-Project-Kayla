<template>
  <!-- 待回覆區 -->
  <div class=" d-flex justify-content-center">
  <div class=" content-box main-outter">
        <div class="title p-3 fw-bold">待回覆區</div>
        <div class="d-flex justify-content-start p-3 border-bottom pb-0">
       </div>
      <div class="d-flex justify-content-evenly">
        <div class="resbox-outter">
          <div class="content-box resbox ps-2">
            <div class="d-flex justify-content-between">
              <div class="d-flex date-and-title w-50 justify-content-evenly">
              <p class="">日期</p>
              <p>姓名</p>
              <p>問題</p>
            </div>
            <div>
                <button type="button" class="btn btn-primary confirm-btn check-res mt-2 me-1">
                    回覆
                </button>
                <button type="button" class="btn btn-primary confirm-btn case-end check-res mt-2 ">
                    結案
                </button>
            </div>
            </div>
            
            <div class="d-flex justify-content-around w-75 date-and-title-content">
              <p class="ps-4">2022/07/01</p>
              <p>王阿明</p>
              <p>我是2022/06/20請假，但是系統...</p>
            </div>
          </div>
          <div class="content-box resbox res-box-hover ps-2">
            <div class="d-flex justify-content-between">
              <div class="d-flex date-and-title w-50 justify-content-evenly">
              <p class="">日期</p>
              <p>姓名</p>
              <p>問題</p>
            </div>
            <div>
                <button type="button" class="btn btn-primary confirm-btn check-res-hover mt-2 ms-3">
                 回覆
              </button>
            </div>
            </div>
            
            <div class="d-flex justify-content-around w-75 date-and-title-content">
              <p class="ps-4">2022/07/01</p>
              <p>王阿明</p>
              <p>我是2022/06/20請假，但是系統...</p>
              
            </div>
            
            
          </div>
      </div>
        <div>
          <div class="content-box question-box">
            <p class="title mb-3 ps-3 fw-bold w-25 text-center">提問</p>
            <div class="q-title text-center">日誌打錯專案名字</div>
            <div class="q-content mt-3">
              老師你好，我是前端班的王小明，我昨天日誌不小心選取到錯誤的專案，
              請問老師可以幫我開修改權限嗎
            </div>
            <div>
              <p class="title ps-3 mt-3 fw-bold w-25 text-center">回覆</p>
              <div class="res-content">
                <textarea class="border-0 ps-1" cols="39" rows="3">
                </textarea>
              </div>
              <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-primary confirm-btn check-res mt-3">
                    送出
                </button>
              </div>                            
            </div>           
          </div>
        </div>
      </div>
      
      </div>
      
</div>
</template>

<script setup>
import SystemManage from "../views/manager/SystemManageView.vue"
</script>

<style lang="scss" scoped>
.content-box {
  margin: 1rem;
  background-color: #fff;
  width: 300px;
  height: 180px;
  padding: 1rem;
  box-shadow: gray;
}
.main-outter{
    width: 100%;
    height: 90vh;
}
.resbox{
  width: 35vw;
  height: 13vh;
}
.resbox-outter{
  overflow: scroll;
  height: 60vh;
  width:40vw;
  .date-and-title{
  color: #558ABA;
  };
  .date-and-title-content{
    font-size: xx-small;
  }
}
.question-box{
  width: 30vw;
  height: 58vh;
  .title{
    color: #558ABA;
  };
  .q-title{
    border: solid 1px;
    width: 22vw;
    height: 5vh;
    margin: 0 auto
  };
  .q-content{
    border: solid 1px;
    width: 22vw; 
    height: 15vh;
    margin: 0 auto;
    overflow: scroll;
   
  };
  .res-content{
    border: solid 1px;
    width: 22vw; 
    height: 11vh;
    margin: 0 auto
  }
}
div.res-box-hover:hover{
  color:white;
  background: #558ABA;
  transition-duration: 0.3s;
  .check-res-hover{
    background: #22496D;
  }
  p{
    color: white
  }
}
.case-end{
  background: #fa2323;
  &:hover{
    background: #e01010
  }
}
textarea{
  outline: none;
  resize: none;
}
</style>