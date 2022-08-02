<template>
  <!-- filter -->
  <div class="content-box filter-box">
		<p class="title"><strong>查看問題回覆</strong></p> 	  	
		<hr/>
	  <div class="d-flex mt-2 flex-wrap">
		  <Datepicker class="datepicker mb-2 me-2 w-auto" v-model="date" range/>
		    <button class="confirm-btn btn btn-height" @click="search">搜尋</button>
		</div>
	</div>	
  <div class="d-flex container-out">
    <div class="content-box main-outter">
      <div class="d-flex justify-content-start p-3"></div>
      <div
        class="d-flex justify-content-evenly"
        v-if="unrepliedsid.length != 0"
      >
        <div class="resbox-outter">
          <!-- 尚未按回覆 -->
          <div class="content-box resbox res-box-hover ps-2">
            <div class="d-flex justify-content-between">
              <div
                class="d-flex date-and-title w-50 justify-content-around ms-4"
              >
                <p class="">日期</p>
                <p class="">問題</p>
              </div>
                <button type="button" class="btn btn-primary confirm-btn check-res-hover mt-2 ms-3"
                @click="updateData()" >查看</button>
            </div>
            <div
              class="d-flex justify-content-around w-50 date-and-title-content ms-5"
            >
              <p class="text-ellipsis ms-5">XXX</p>
              <p class="text-ellipsis ms-5">XXX</p>
            </div>
          </div>
        </div>
        <!-- 回覆區 -->
        <div class="content-box question-box">
          <p class="title fw-bold text-start">問題</p>
          <p class="q-title">XXX</p>
          <p class="title fw-bold text-start mt-2">內容</p>
          <div class="q-content">XXX</div>
          <div>
            <p class="title ps-3 mt-2 fw-bold text-start">回覆</p>
            <div class="q-content d-block">XXX</div>
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
	const title = "查看問題回覆"
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
.container-out {
  width: 100%;
}
.content-box {
  margin: 1rem;
  background-color: #fff;
  // width: 300px;
  width: 97%;
  height: 180px;
  padding: 1rem;
  box-shadow: gray;
}
.main-outter {
  // width: 100%;
  // width: auto;
  height: auto;
}
.resbox {
  width: auto;
  height: 6rem;
}
.resbox-outter {
  overflow-y: scroll;
  height: 28rem;
  width: 100%;
  .date-and-title {
    color: #558aba;
  }
  .date-and-title-content {
    font-size: xx-small;
  }
}
.question-box {
  width:70%;
  height: auto;
  .title {
    color: #558aba;
  }
  .q-title {
    border: solid 1px;
    width:100%;
    min-width: 350px;
    height: auto;
    margin: 0 auto;
  }
  .q-content {
    border: solid 1px;
    width:100%;
    min-width: 350px;
    height: 5rem;
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
.text-ellipsis {
  width: 6rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>