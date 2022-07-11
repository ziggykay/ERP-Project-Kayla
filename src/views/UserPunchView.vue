<script setup>
import UserPunch from "../components/UserPunch.vue";
</script>

<template>
  <UserPunch></UserPunch>
</template>

<style scoped>
.inner {
  width: 80%;
  position: fixed;
  margin-top: 130px;
  margin-left: 300px;
  margin-right: 50px;
}
@media (max-width: 850px) {
  .inner {
    margin-left: 250px;
    margin-right: 50px;
  }
}
@media (max-width: 768px) {
  .inner {
    margin-left: 200px;
    margin-right: 50px;
  }
}
@media (max-width: 650px) {
  .inner {
    margin-left: 150px;
    margin-right: 50px;
  }
}
</style>
