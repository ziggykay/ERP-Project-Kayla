<template>
  <NavbarSidebar/>
  <!-- <MainSection/> -->
</template>

<script setup>
import NavbarSidebar from "../components/baseComponents/NavbarSidebar.vue";
// import MainSection from "../components/MainSection.vue";
</script>

<style lang="scss" scoped>
.inner {
  position: fixed;
  margin-top: 130px;
  margin-left: 300px;
  margin-right: 50px;
  background-color: #fff;
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
