<template>
  <FilterSelect :parent-selectArr="selectArr" :parent-title="title">
    <div class="mx-5 text-end">
      <button type="button" class="btn btn-primary confirm-btn">
        批次新增學員
      </button>
    </div>
  </FilterSelect>
  <div class="content-box tableContainer">
    <div class="checkBox">
      <div class="d-flex align-items-center my-3">
        <div class="text">
          <div>學號</div>
        </div>
        <div class="text">
          <div>班別</div>
        </div>
        <div class="text">
          <div>班級</div>
        </div>
        <div class="text">
          <div>姓名</div>
        </div>
        <div class="text">
          <div>查看</div>
        </div>
      </div>
      <div class="checkDiv">
        <div
          class="d-flex align-items-center my-4"
          v-for="data of usersData"
          :key="data"
        >
          <div class="text">
            <div>{{ data.id }}</div>
          </div>
          <div class="text">
            <div>{{ data.class }}</div>
          </div>
          <div class="text">
            <div>{{ data.grade }}</div>
          </div>
          <div class="text">
            <div>{{ data.name }}</div>
          </div>
          <div class="text">
            <button
              class="btn btn-primary confirm-btn"
              @click="checkUserInfo(data.id)"
            >
              詳細資訊
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import FilterSelect from "../baseComponents/filterSelect.vue";
import { ref, watch } from "vue";
import router from "../../router";
import axios from "axios";

// data
// selectOption
const title = ref("帳號管理");
const selectArr = ref([
  {
    selected: "class",
    data: [
      {
        name: "班級",
        item: "class",
      },
      {
        name: "前端班",
        item: "fn",
      },
      {
        name: "數據班",
        item: "se",
      },
      {
        name: "雲端班",
        item: "dv",
      },
    ],
  },
  {
    selected: "grade",
    data: [
      {
        name: "班別",
        item: "grade",
      },
      {
        name: "102",
        item: "102",
      },
      {
        name: "103",
        item: "103",
      },
      {
        name: "211",
        item: "211",
      },
    ],
  },
]);
const usersData = ref([
  {
    id: 1,
    class: "前端班",
    grade: "101",
    name: "王小明",
  },
  {
    id: 2,
    class: "前端班",
    grade: "101",
    name: "王中明",
  },
  {
    id: 3,
    class: "前端班",
    grade: "101",
    name: "王大明",
  },
  {
    id: 4,
    class: "前端班",
    grade: "101",
    name: "王巨明",
  },
  {
    id: 5,
    class: "前端班",
    grade: "101",
    name: "王小明",
  },
  {
    id: 6,
    class: "前端班",
    grade: "101",
    name: "王中明",
  },
  {
    id: 7,
    class: "前端班",
    grade: "101",
    name: "王大明",
  },
  {
    id: 8,
    class: "前端班",
    grade: "101",
    name: "王巨明",
  },
]);

function checkUserInfo(id) {
  this.router.push(`/manager/accountcheck/${id}`);
}
</script>

<style lang="scss" scoped>
.tableContainer {
  width: auto;
  height: auto;
}
.checkBox {
  margin-left: 5%;
}
.inner {
  .searchInput {
    height: 1rem;
    border-radius: 5px;
  }
  .checkDiv {
    width: auto;
    height: auto;

    height: 60vh;
    overflow-y: scroll;
  }
  .checkDiv button:hover {
    background-color: #22496d;
  }
  .text {
    font-size: 1rem;
    width: 25%;
  }
}
</style>
