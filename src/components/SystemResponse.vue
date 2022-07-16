<template>
  <div class=" d-flex justify-content-center ">
  <div class=" content-box main-outter">
        <div class="title p-3 fw-bold">查看問題回覆</div>
        <div class="d-flex justify-content-start p-3 border-bottom pb-5">
        <!-- 日期選擇套件 Vue3-Datepicker -->
  	<select class="me-3 selectInfo">
	    <option>本日</option>
	    <option>本月</option>  		
  	</select>
  	<Datepicker class="w-25 dateInfo datepicker dp__theme_light" v-model="date" range/>	
      <div class="ms-2">
        <button type="button" class="btn btn-primary confirm-btn">
            搜索
        </button>
      </div>
      </div>
      <div class="d-flex justify-content-evenly">
        <div class="resbox-outter">
          <div class="content-box resbox ps-2">
            <div class="d-flex date-and-title justify-content-around">
              <p class="">日期</p>
              <p>標題</p>
              <button type="button" class="btn btn-primary confirm-btn check-res mt-2 ms-5">
                 查看回覆
              </button>
            </div>
            <div class="d-flex justify-content-evenly w-75 date-and-title-content">
              <p class="pe-4">2022/07/01</p>
              <p>XXXXXXXXXXX</p>
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
              <div class="res-content"></div>              
            </div>
            


          </div>
        </div>
      </div>
      
      </div>
      
</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const date = ref();
// For demo purposes assign range from the current date
onMounted(() => {
  const startDate = new Date();
  const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
  date.value = [startDate, endDate];
  return Date;
});
</script>

<style lang="scss" scoped>
.selectInfo{
  width: 70px;
  height: 38px;
  background-color: #E9F2FF;
  border-radius: 4px;
  border: none;
  cursor: pointer;
};
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
  height: 55vh;
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
div.resbox:hover{
  color:white;
  background: #558ABA;
  transition-duration: 0.3s;
  .check-res{
    background: #22496D;
  }
  p{
    color: white
  }
}

</style>