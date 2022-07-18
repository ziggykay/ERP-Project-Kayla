<template>
  <div class="content-box filter-box">
    <p class="title">
      <strong>{{ parentTitle }}</strong>
    </p>
    <hr />
    <div class="d-flex flex-wrap">
      <select
        class="selectInfo me-2"
        v-for="(item, index) of parentSelectArr"
        v-model="item.selected"
      >
        <option v-for="(innerItem, index) of item.data" :value="innerItem.item">
          {{ innerItem.name }}
        </option>
      </select>
      <slot name="bar"></slot>
    </div>
    <div class="d-flex mt-2 flex-wrap">
      <Datepicker class="datepicker mb-2 me-2 w-auto" v-model="date" range />
      <button class="confirm-btn btn btn-height">搜尋</button>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
//props
const props = defineProps({
  parentSelectArr: Array,
  parentTitle: String,
});

// data
const parentSelectArr = ref(props.parentSelectArr);
const parentTitle = ref(props.parentTitle);

// date
const date = ref("");
onMounted(() => {
  const startDate = new Date();
  const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
  date.value = [startDate, endDate];
});

onMounted(async () => {
  let { data } = await axios.get("http://localhost:80/api/testApi");
  console.log(data);
});
</script>

<style lang="scss" scoped>
.filter-box {
  height: auto;
  width: auto;
  .selectInfo {
    width: 100px;
    height: 38px;
    background-color: #e9f2ff;
    border-radius: 4px;
    border: none;
    cursor: pointer;
  }
  .btn-height {
    height: 38px;
  }
}
</style>
