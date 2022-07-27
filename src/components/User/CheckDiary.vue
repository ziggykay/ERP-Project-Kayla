<template>
  <router-link to="/manager/checkdiaryselect" class="back">
		<div>
			<i class="fa-solid fa-arrow-left">
			</i> 
			回列表頁
		</div>        	
  </router-link>	
  <div class="d-flex justify-content-center">
    <div class="content-box-outter">
      <div class="title border-bottom p-2 fw-bold">日誌詳情</div>
      <div class="d-flex justify-content-center">
        <div class="content-box">
          <p class="m-3">{{ user.Time }}</p>
          <div class="d-flex justify-content-evenly mt-3">
            <div>
              <h3 class="p-2 fw-bold">{{ user.Project }}</h3>
              <p>Class : {{ user.Class }}</p>
              <p>Number : {{ user.Id }}</p>
              <p>Name : {{ user.Name }}</p>
              <p>Email : {{ user.Email }}</p>
            </div>
            <div>
              <img
                class="diary-img"
                src="https://blogger.googleusercontent.com/img/a/AVvXsEhMEP7FubNdbKwB5CX1f4HqLAaycm1CTwBiUh7lky8fACIcafbV_plS5ATMh9jXEM3cFeV7PR4D5324W9e1fsqG0fChjMQfSh4WNBLmlbSxOpHYl17Y0pBqbtFUeXogQMO1fcMj1yuxF0aFoWYJtA4xc4bNeCyeX7GcQYu-oKjhUBJbnGgxbH_vy1dvGg"
                alt=""
              />
            </div>
          </div>
          <div class="d-flex justify-content-center">
            <p class="pt-0 pt-md-4 col-10">
            	{{ user.Content }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="d-flex justify-content-center">
    <div class="content-box-feeback-outter">
      <div class="title border-bottom p-2 fw-bold">企業回覆 :</div>
      <div class="d-flex justify-content-center">
        <div class="content-box-feeback m-3">
          <p class="text-center"></p>
          <textarea class="border-0 ps-1" cols="100" rows="8"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, computed, watch} from "vue"	
const props = defineProps({
  parentUser:{
    type: Object,
  },		
})
const user = ref(props.parentUser)
// console.log(user.value)

</script>

<style lang="scss" scoped>
.content-box-outter {
  margin: 1rem;
  background-color: #fff;
  width: 100%;
  height: 80vh;
  padding: 1rem;
  border-radius: 1rem;
  .title {
    color: #558aba;
  }
}
.content-box {
  margin: 1rem;
  background-color: #fff;
  width: 90%;
  height: 65vh;
  padding: 1rem;
  box-shadow: gray;
}
.diary-img {
  width: 100%;
  height: 30vh;
  background: rgb(204, 202, 202);
}
.content-box-feeback-outter {
  margin: 1rem;
  background-color: #fff;
  width: 100%;
  height: 45vh;
  padding: 1rem;
  border-radius: 1rem;
  .title {
    color: #558aba;
  }
}
.content-box-feeback {
  width: 90%;
  height: 30vh;
  border: solid 1px #558aba;
  border-radius: 1rem;
}
textarea {
  outline: none;
  resize: none;
}
</style>
