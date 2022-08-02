<template>
  <!-- 待回覆區 -->
  <!-- 問題區 -->
  <div class="d-flex container-out">
    <div class="content-box main-outter">
      <div class="title p-3 fw-bold border-bottom">待回覆區</div>
      <div
        class="d-flex justify-content-between"
        v-if="unrepliedsid.length != 0"
      >
        <div class="resbox-outter">
          <!-- 尚未按回覆 -->
          <div
            class="content-box resbox res-box-hover ps-2"
            v-for="(data, index) of unreplieds"
            :key="index"
          >
            <div class="d-flex justify-content-between">
              <div
                class="d-flex date-and-title w-50 justify-content-around ms-4"
              >
                <p class="">日期</p>
                <p class="">姓名</p>
                <p class="">問題</p>
              </div>
              <div v-if="data.status == 0">
                <button
                  type="button"
                  class="btn btn-primary confirm-btn check-res-hover mt-2 ms-3"
                  @click="updateData(data)"
                >
                  回覆
                </button>
              </div>
              <!-- 按了回覆改變狀態會新增結案按鈕 -->
              <div v-if="data.status == 1">
                <button
                  type="button"
                  class="btn btn-primary confirm-btn check-res-hover mt-2 ms-3 me-2"
                  @click="
                    {
                      responseToTemp: [updateData(data), checkHasRes(data)];
                    }
                  "
                >
                  查看
                </button>
                <button
                  type="button"
                  class="btn btn-primary confirm-btn case-end check-res mt-2"
                  @click="endCase(data)"
                >
                  結案
                </button>
              </div>
            </div>
            <div
              class="d-flex justify-content-around w-50 date-and-title-content ms-5"
            >
              <p class="text-ellipsis ms-1">{{ data.LeavingTime }}</p>
              <p class="text-ellipsis ms-3">{{ data.Name }}</p>
              <p class="text-ellipsis">{{ data.Title }}</p>
            </div>
          </div>
        </div>
        <!-- 回覆區 -->
        <div class="content-box question-box">
          <p class="title fw-bold text-start">問題</p>
          <p class="q-title">{{ selectData.Title }}</p>
          <p class="title fw-bold text-start mt-2">內容</p>
          <div class="q-content">{{ selectData.content }}</div>
          <p class="title ps-3 mt-2 fw-bold text-start">回覆</p>
          <textarea
            class="q-content d-block"
            cols="50"
            rows="3"
            placeholder="請輸入回覆內容..."
            v-model="selectData.responseBox"
          >
          </textarea>
          <div class="text-end">
            <button
              type="button"
              class="btn btn-primary confirm-btn check-res mt-3"
              @click="send(selectData)"
              v-if="selectData.responseBox !== ''"
            >
              送出
            </button>
          </div>
        </div>
      </div>
      <div v-else><p class="text-center fs-5">尚無資料</p></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import SystemManage from "/src/views/Manager/SystemManageView.vue";
const emit = defineEmits(["changeShow"]);
//store
const store = useStore();
const unreplieds = computed(() => store.state.unreplieds);
const unrepliedsid = store.getters.unrepliedsid;
const unrepliedsLength = store.getters.unrepliedsLength;
//從暫存區消失
function endCase(data) {
  store.dispatch("toggleDel", data);
  alert("已結案");
}
//按送出後回覆按鈕的功能
function checkHasRes(data) {
  store.dispatch("toggleHasRes", data);
}
//送出按鈕
function send(selectData) {
  store.dispatch("toggleHasRes", selectData);
  alert("已回覆");
}
//動態切換顯示資料
const selectData = ref(unreplieds.value[0]);
function updateData(data) {
  selectData.value = data;
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
  width: 100%;
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
  height: auto;
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
  width: 70%;
  height: auto;
  .title {
    color: #558aba;
  }
  .q-title {
    border: solid 1px;
    width: 100%;
    height: auto;
    margin: 0 auto;
  }
  .q-content {
    border: solid 1px;
    width: 100%;
    height: 5rem;
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
