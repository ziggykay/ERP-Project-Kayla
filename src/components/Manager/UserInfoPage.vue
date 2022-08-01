<template>
  <div class="content-box overall-box">
    <div class="py-2 checkBoxInner">
      <div>
        <router-link to="/manager/accountcheck" class="back">
					<div>
						<i class="fa-solid fa-arrow-left">
						</i> 
						回列表頁
					</div>        	
        </router-link>
      </div>
      <div class="d-flex align-items-center justify-content-between">
        <div class="between mx-2">
          <p class="text-primary"><strong>學員詳細資料</strong></p>
        </div>
        <div class="between mx-2">
          <button type="button" class="my-3 btn btn-primary confirm-btn" @click="editUser">
            <i class="fa-solid fa-pen-to-square mx-1"></i>編輯資訊
          </button>
        </div>
      </div>
      <hr />
      <div>
        <div class="mt-2 d-flex">
          <div
            class="innerTitle align-self-center mx-2 text-primary text-center"
          >
            班別
          </div>

          <input class="content-box-border mx-3" type="text" v-model="group" :disabled="disableStatus"/>
        </div>
        <div class="mt-2 d-flex">
          <div
            class="innerTitle align-self-center mx-2 text-primary text-center"
          >
            班級
          </div>

          <input class="content-box-border mx-3" type="text" v-model="grade" :disabled="disableStatus"/>
        </div>
        <div class="mt-2 d-flex">
          <div
            class="innerTitle align-self-center mx-2 text-primary text-center"
          >
            姓名
          </div>

          <input class="content-box-border mx-3" type="text" v-model="name" :disabled="disableStatus"/>
        </div>
        <div class="mt-2 d-flex">
          <div
            class="innerTitle align-self-center mx-2 text-primary text-center"
          >
            Email
          </div>

          <input class="content-box-border mx-3" type="text" v-model="email" :disabled="disableStatus"/>
        </div>
        <div class="mt-2 d-flex">
          <div
            class="innerTitle align-self-center mx-2 text-primary text-center"
          >
            Password
          </div>

          <input class="content-box-border mx-3" type="text" v-model="password" :disabled="disableStatus"/>
        </div>
      </div>
      <div class="text-end mt-3">
        <button type="button" class="m-2 btn btn-primary cancel-btn"  @click="delUser">
          <i class="fa-solid fa-trash-can"></i>
          刪除帳號
        </button>
        <button type="button" class="m-2 btn btn-primary confirm-btn" @click="submitEdit">
          <i class="fa-solid fa-circle-check"></i>
          確認修改
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from 'vue-router'
import axios from "axios"
import store from "../../store"

const token = store.getters["auth/getToken"]
const router = useRouter()
const props = defineProps({
  parentUser:{
    type: Object,
  },		
})
const user = ref(props.parentUser)
// console.log(user.value)
// =======================================================
const id = ref(user.value.id) //v-model
const group = ref(user.value.group)
const grade = ref(user.value.grade)
const name = ref(user.value.name)
const email = ref(user.value.email)
const password = ref(user.value.password)

const disableStatus = ref(true)
const editUser = async()=>{ //editUser
	disableStatus.value = !disableStatus.value
}

const submitEdit = async()=>{
	let href = 'http://54.186.56.114/diary/account'
	let postData = {
		Email: email.value,
		Id: id.value,
		Name: name.value,
		Password: password.value,
		number: grade.value,
		type: group.value
	}
	try{
		disableStatus.value = !disableStatus.value
		let { data } = await axios.patch(href, postData, { headers:{'authorization': `Bearer ${token}`}})
		alert("資料更新成功")		
	}
	catch(e){
		console.log(e)
		alert("資料更新失敗")
	}
}
const delUser = async()=>{
	let href = 'http://54.186.56.114/diary/account'
	let yes = confirm('確定要刪除該使用者嗎？！');
	let config = {
	  headers:{
	  	'authorization': `Bearer ${token}`
	  },
	  data: {
	  	Name: name.value,
			number: grade.value,
			type: group.value
		},
	}	
	if(yes){
		try{
			let { data } = await axios.delete(href, config)
			alert("已刪除該筆資料!")
			router.push('/manager/accountcheck')
		}
		catch(e){
			alert("刪除失敗!")
			console.log(e)
		}		
	}	
}

</script>

<style lang="scss" scoped>
.overall-box {
  width: auto;
  height: auto;
}

.checkBoxInner {
  a {
    text-decoration: none;
    font-size: 0.8rem;
  }
  .content-box-border {
    width: 60%;
    height: auto;
  }
  .between {
    margin: 0;
    padding: 0;
  }
  .innerTitle {
    margin: 0;
    margin-left: 1rem;
    padding: 0;
    width: 15%;
  }
}
</style>
