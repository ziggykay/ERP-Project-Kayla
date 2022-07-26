<template>
  <!-- 待回覆區 -->
  <!-- 問題區 -->
<div class="d-flex justify-content-center">
  <div class="content-box main-outter">
    <div class="title p-3 fw-bold">待回覆區</div>
      <div class="d-flex justify-content-start p-3 border-bottom pb-0"></div>
        <div class="d-flex justify-content-evenly" v-if="unrepliedsDateCount!==0">
          <div class="resbox-outter">
             <!-- 尚未按回覆 -->
            <div class="content-box resbox res-box-hover ps-2" v-for="data of unreplieds" >
              <div class="d-flex justify-content-between">
                <div class="d-flex date-and-title w-50 justify-content-evenly ms-3">
                  <p class="">日期</p>
                  <p class="">姓名</p>
                  <p class="">問題</p>
                </div>
                  <div v-if="tempResponse == ''">
                    <button type="button" class="btn btn-primary confirm-btn check-res-hover mt-2 ms-3"
                    @click="updateData(data)" >回覆</button>
                  </div>
                  <!-- 按了回覆改變狀態為新增結案按鈕 -->
                  <div v-else>
                    <button type="button" class="btn btn-primary confirm-btn check-res mt-2 me-1">回覆</button>
                    <button type="button" class="btn btn-primary confirm-btn case-end check-res mt-2" @click="save()">結案</button>
                  </div>
              </div>
              <div class="d-flex justify-content-between w-50 date-and-title-content ms-5">
                <p class="">{{data.LeavingTime}}</p>
                <p>{{data.Name}}</p>
                <p>{{data.Title}}</p>
              </div>
            </div>
          </div>
          <div>
          <!-- 回覆區 -->
            <div class="content-box question-box" v-if="selectData.Title!==''">
              <p class="title mb-3 ps-3 fw-bold w-25 text-center">問題</p>
              <p class="q-title">{{selectData.Title}}</p>
              <p class="title ps-3 fw-bold w-25 text-center mt-3">內容</p>
              <div class="q-content">{{selectData.question.content}}</div>
              <div>
                <p class="title ps-3 mt-3 fw-bold w-25 text-center">回覆</p>
                <textarea
                  class="q-content d-block"
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  placeholder="請輸入回覆內容..."
                  v-model="responseText">
                </textarea>
              </div>
              <div class=" text-end">
              <button type="button" class="btn btn-primary confirm-btn check-res mt-2"
                @click="changeStatus(); removeFromTemp(selectData.id)">送出</button>
              </div>
              <input type="hidden" v-for="resData of tempResponse">{{resData}}
            </div>
          </div>
        </div>
        <div v-if="unrepliedsDateCount===0"><p class="text-center fs-5">尚無待回覆問題</p></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore,mapActions } from "vuex";
import SystemManage from "/src/views/Manager/SystemManageView.vue";
const emit = defineEmits(["changeShow"]);
const isResponse = false
//store
  const store = useStore()
  const unreplieds = computed(()=> store.state.unreplieds)
  const selectData = ref(unreplieds.value[0]);
  function updateData (data) {
    selectData.value = data
    console.log(selectData.value)
  }
  const test = store.getters.unrepliedId
  const unrepliedsDateCount = store.getters.unrepliedsDate.length
  const responseText = ref("")
  const tempResponse = computed(()=> store.state.tempResponse)
  //顯示結案按鈕
  function changeStatus() {
    store.commit("addTempResponse", responseText.value);
    alert('已回覆')
  }
  //目前尚未將所有data傳送到結案區，只有將回覆的data傳過去
  function save() {
    store.commit("addResponse", responseText.value);
    alert('已結案')
  }
  //暫存區資料消失尚未完成
  function removeFromTemp(itemId){
    this.$store.dispatch('removeFromTemp', itemId)
  }

  //測試
  // onMounted(()=> {
  //   store.dispatch('loadEndMessage')
  // })
  
//data
  // const unreplieds = ref([
	//   		{
  //         id:1,
	//   			LeavingTime: '2022-07-09',
  //         Name: 'Jay',
	//   			Title: '電腦螢幕打不開',
  //         status: 'notResponsed',
  //         question: 
  //         {
  //           content: '教室冷氣故障，請問能幫忙維修嗎',
           
  //         }
	//   		},
  //       {
  //         id:2,
	//   			LeavingTime: '2022-07-13',
  //         Name: 'Jay',
	//   			Title: '教室冷氣故障',
  //         status: 'notResponsed',
  //         question: 
  //         {
  //           content: '教室冷氣故障，請問能幫忙維修嗎',
  //         }
	//   		},
	// ]);
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
.main-outter {
  width: 100%;
  height: 35rem;
}
.resbox {
  width: 34rem;
  height: 6rem;
}
.resbox-outter {
  overflow-y: scroll;
  height: 28rem;
  width: 40rem;
  .date-and-title {
    color: #558aba;
  }
  .date-and-title-content {
    font-size: xx-small;
  }
}
.question-box {
  width: 30rem;
  height: 27rem;
  .title {
    color: #558aba;
  }
  .q-title {
    border: solid 1px;
    width: 22vw;
    height: 5vh;
    margin: 0 auto;
  }
  .q-content {
    border: solid 1px;
    width: 22vw;
    height: 11vh;
    margin: 0 auto;
  }
  .res-content {
    border: solid 1px;
    width: 22vw;
    height: 11vh;
    margin: 0 auto;
  }
}
div.res-box-hover:hover {
  color: white;
  background: #558aba;
  transition-duration: 0.3s;
  .check-res-hover {
    background: #22496d;
  }
  p {
    color: white;
  }
}
.case-end {
  background: #fa2323;
  &:hover {
    background: #e01010;
  }
}
textarea {
  outline: none;
  resize: none;
}
</style>
