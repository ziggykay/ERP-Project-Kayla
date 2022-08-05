<template>
  <CheckDiary :parent-user="user"></CheckDiary>
</template>

<script setup>
import CheckDiary from "../../components/User/CheckDiary.vue";

const props = defineProps({
  user:{
    type: String,
    default: JSON.stringify({}) 
  },		
})

// console.log(props.user)

// props to data
const user = JSON.parse(props.user)
</script>
<style></style>
