<template>
<FilterSelect :parent-selectArr="selectArr" :parent-title="title" @user-selectData="userData"></FilterSelect>
<div class="d-flex justify-content-center">
  <div class="content-box main-outter">
      <div class="d-flex justify-content-start p-3 border-bottom pb-0"></div>
        <div class="d-flex justify-content-evenly" v-if="unrepliedsid.length!=0">
          <div class="resbox-outter">
            <!-- 查看回覆 -->
            <div class="content-box resbox res-box-hover ps-2" v-for="(data,index) of unreplieds" :key="index" >
              <div class="d-flex justify-content-between">
                <div class="d-flex date-and-title w-50 justify-content-start ms-3">
                  <p class="me-5">日期</p>
                  <p class="ms-5">問題</p>
                </div>
                  <div v-if="data.status == 0">
                    <button type="button" class="btn btn-primary confirm-btn check-res-hover mt-2 ms-3"
                    @click="{responseToTemp: [updateData(data),]}" >查看回覆</button>
                  </div>
              </div>
              <div class="d-flex justify-content-start date-and-title-content ms-5">
                <p class="me-5 text-ellipsis">{{data.LeavingTime}}</p>
                <p class="ms-2 text-ellipsis">{{data.Title}}</p>
              </div>
            </div>
          </div>
          <div>
          <!-- 查看回覆區 -->
            <div class="content-box question-box">
              <p class="title mb-3 ps-3 fw-bold w-25 text-center">問題</p>
              <p class="q-title">{{selectData.Title}}</p>
              <p class="title ps-3 fw-bold w-25 text-center mt-3">內容</p>
              <div class="q-content">{{selectData.content}}</div>
              <div>
                <p class="title ps-3 mt-3 fw-bold w-25 text-center">回覆</p>
                <div class="res-content">
                <p ></p>
              </div>
              </div>
            </div>
          </div>
        </div>
      <div v-else><p class="text-center fs-5">尚無資料</p></div>
    </div>
  </div>
</template>

<script setup>
import FilterSelect from "../baseComponents/filterSelect.vue";
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import SystemManage from "/src/views/Manager/SystemManageView.vue";
const date = ref();


//篩選
onMounted(() => {
  const startDate = new Date();
  const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
  date.value = [startDate, endDate];
  return Date;
});

// filter-data
	const selectArr = ref([
		[
			{
				name: "今日",
				item: "today"
			},
			{
				name: "本月",
				item: "month"
			}				 		
		]
	]);
	const title = "查看問題回覆"
const emit = defineEmits(["changeShow"]);
//store
  const store = useStore()
  const unreplieds = computed(()=>  store.state.unreplieds)
  const unrepliedsid = store.getters.unrepliedsid
  const unrepliedsLength = store.getters.unrepliedsLength
  console.log(unrepliedsLength)
  //動態切換顯示資料
  const selectData = ref(unreplieds.value[0]);
  function updateData (data) {
    selectData.value = data;
  }
</script>

<style lang="scss" scoped>
.filter-select{
  width:100%
}
.selectInfo {
  width: 70px;
  height: 38px;
  background-color: #e9f2ff;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}
.content-box {
  margin: 1rem;
  background-color: #fff;
  width: 97.5%;
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
.text-ellipsis{
  width: 5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>