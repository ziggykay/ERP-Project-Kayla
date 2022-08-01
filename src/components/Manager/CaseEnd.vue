<template>
  <!-- 已結案區 -->
  <!-- filter -->
  <div class="filter-select">
    <FilterSelect  :parent-selectArr="selectArr" :parent-title="title" @user-selectData="userData"></FilterSelect>
  </div>
  <div class="d-flex container-out" >
    <div class="content-box main-outter">
      <div class="d-flex justify-content-start p-3 border-bottom pb-0"></div>
        <div class="d-flex justify-content-evenly" v-if="unrepliedsid.length!=0">
          <div class="resbox-outter">
            <div class="content-box resbox ps-2">
              <div class="d-flex justify-content-between" >
                <div class="d-flex date-and-title w-50 justify-content-around ms-4">
                  <p class="">日期</p>
                  <p class="">姓名</p>
                  <p class=" text-ellipsis">問題</p>
                </div>
                  <div>
                    <button type="button" class="btn btn-primary confirm-btn check-res mt-2 ms-3">查看</button>
                  </div>
              </div>
                <div class="d-flex justify-content-around w-50 date-and-title-content ms-5">
                  <p class="ms-1">2022-05-05</p>
                  <p class="text-ellipsis ms-3">AAA</p>
                  <p class=" text-ellipsis">xxx</p>
                </div>
            </div>
          </div>
            <div class="content-box question-box">
              <p class="title mb-3 ps-3 fw-bold w-25 text-center">提問</p>
              <p class="q-title">xxx</p>
              <p class="title ps-3 fw-bold w-25 text-center mt-3">內容</p>
              <div class="q-content">xxx</div>
            <div>
              <p class="title ps-3 mt-3 fw-bold w-25 text-center">回覆</p>
              <div class="res-content">xxx</div>
            </div>
        </div>
      </div>
      <div v-else><p class="text-center fs-5">尚無資料</p></div>
    </div>
  </div>
</template>

<script setup>
import SystemManage from "/src/views/Manager/SystemManageView.vue";
import FilterSelect from "../baseComponents/FilterSelect.vue";
import { ref, computed, onMounted } from "vue";
import { useStore, mapActions, mapState } from "vuex";
const date = ref();
// For demo purposes assign range from the current date
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
	const title = "已結案區"
  //store
  const store = useStore()
  const unreplieds = computed(()=>  store.state.unreplieds)
  const unrepliedsid = store.getters.unrepliedsid

  //查看按鈕
  const selectData = ref(unreplieds.value[0]);
  function updateData (data) {
    selectData.value = data
    console.log(selectData.value)
  }
</script>

<style lang="scss" scoped>
.filter-select{
  width:95%
}
.container-out{
  width: 95%;
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
  // width: 97.5%;
  width: 100%;
  height: 180px;
  padding: 1rem;
  box-shadow: gray;
}
.main-outter {
  // width: 100%;
  height: 32rem;
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
    overflow-y: scroll;
  }
  .res-content {
    border: solid 1px;
    width: 22vw;
    height: 11vh;
    margin: 0 auto;
    overflow-y: scroll;
  }
}
div.resbox:hover {
  color: white;
  background: #558aba;
  transition-duration: 0.3s;
  .check-res {
    background: #22496d;
  }
  p {
    color: white;
  }
}
.text-ellipsis{
  width: 3rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
