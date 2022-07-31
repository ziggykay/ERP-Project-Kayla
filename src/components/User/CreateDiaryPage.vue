<template>
  <div class="section">
    <div class="d-md-flex">
      <div class="content-box diary-box col">
          <p class="text-primary InfoTitle"><strong>個人資訊</strong></p>
          <hr />
          <p class="Info"><strong>Class : </strong>{{ info.Class }}</p>
          <hr />
          <p class="Info"><strong>Number : </strong>{{ info.Id }}</p>
          <hr />
          <p class="Info"><strong>Name : </strong>{{ info.Name }}</p>
          <hr />
          <p class="Info"><strong>Email : </strong>{{ info.Email }}</p>
      </div>
      <div class="container-fluid d-md-flex">
        <div class="content-box userInfo-box col d-flex">
          <div class="container-fluid p-2">
            <p class="text-primary InfoTitle"><strong>已編輯日誌</strong></p>
            <hr />
            <div v-if="isCreated" class="d-flex completeDiary">
              <div
                v-for="item of diary"
                v-bind:key="item.id"
                class="content-box-border project plates d-flex flex-column"
              >
                <div class="project-name text-center align-self-center mt-4">
                  {{ item.Project }}
                </div>
                <div class="align-self-end mt-3">
                  <span @click="editDiary(item)"
                    ><a class="edit-icon" href="#">
                      <i class="fa-solid fa-pen-to-square mx-1"></i></a
                  ></span>
                  <span @click="removeDiary(item)"
                    ><a class="edit-icon" href="#">
                      <i class="fa-solid fa-trash-can mx-1"></i></a
                  ></span>
                </div>
              </div>
            </div>
            <div v-else class="project plates">
              <div class="project-name text-center align-self-center mb-5">
                無已登打的日誌
              </div>
            </div>
            <div v-if="isCreated" class="text-end mt-2">
              <button type="button" class="btn btn-primary confirm-btn">
                確認送出
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content-box create-box col">
      <div class="container-fluid p-2 col-12">
        <p class="text-primary InfoTitle"><strong>日誌登打</strong></p>
        <hr />
        <div class="d-flex flex-wrap justify-content-between">
          <div class="work-time col-md-4">
            <label for="">工作時數</label>
            <br />
            <select id="time" v-model="Workinghour">
              <option value="">請選擇時數</option>
              <option value="0.5">0.5</option>
              <option value="1">1</option>
              <option value="1.5">1.5</option>
              <option value="2">2</option>
              <option value="2.5">2.5</option>
              <option value="3">3</option>
              <option value="3.5">3.5</option>
              <option value="4">4</option>
              <option value="4.5">4.5</option>
              <option value="5">5</option>
              <option value="5.5">5.5</option>
              <option value="6">6</option>
              <option value="6.5">6.5</option>
              <option value="7">7</option>
              <option value="7.5">7.5</option>
              <option value="8">8</option>
            </select>
          </div>
          <div class="work-time col-md-4">
            <label for="project">專案選擇</label>
            <br />
            <select id="project" v-model="Project">
              <option value="">請選擇專案</option>
              <optgroup label="專案">
                <option  v-for= "(item, index) of ProjectArr" :value="item.item">{{  item.name }}</option>
              </optgroup>
              <optgroup label="產品">
                <option  v-for= "(item, index) of ProductArr" :value="item.item">{{  item.name }}</option>
              </optgroup>
            </select>
          </div>
          <div class="work-time col-md-4">
<!--             <label for="profile_pic">上傳圖片</label>
            <br />
            <span>
              <input
                @change="getFiles"
                type="file"
                id="profile_pic"
                name="profile_pic"
                accept=".jpg, .jpeg, .png"
              />
            </span> -->
          </div>
          <br />
        </div>
        <div class="container-fluid col-12">
          <label for="">內文</label>
          <br />
          <textarea
            class="textarea"
            placeholder="請輸入內文..."
            id="textarea"
            v-model="Content"
          ></textarea>
        </div>
        <div v-if="empty" class="text-end">
          <input
            id="submit"
            type="button"
            class="btn btn-primary add-items confirm-btn"
            @click="submitDiary"
            value="+ 新增專案"
          />
        </div>
        <div v-else class="text-end">
          <input
            id="submit"
            type="button"
            class="btn btn-primary add-items confirm-btn editComplete"
            @click="editComplete"
            value="修改完成"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useStore, mapActions } from "vuex";
import {ref, onMounted, reactive, watch, computed} from "vue";

const store = useStore();

// ==============================================================
const info = ref({});  //get user data 
const getUserData = async()=>{
	let href = 'http://54.186.56.114/login'
	let config = {
		headers: {
			'authorization': `Bearer ${store.state.token}`
		}
	}	
	try{
		let { data } = await axios.get(href, config)
		info.value = {
	    Class: data.data[0].Class,
	    Name: data.data[0].Name,
	    Id: data.data[0].Id,
	    Email: data.data[0].Email,		
		}
	}
	catch(e){
		console.log(e)
	}
}
getUserData()
// ============================================================================
const ProjectArr = ref([]) //get project value 
const ProductArr = ref([])
const axiosProject = async() =>{
	let href = "http://54.186.56.114/diary/Getdatalist";
	
	try{
		let { data } = await axios.get(href)
		let Project = data.data.Project.filter((item)=>{
			return item.Status == "專案"
		})
		let Product = data.data.Project.filter((item)=>{
			return item.Status == "產品"
		})		
		Project.forEach(function(item, index){
			ProjectArr.value.push({
				name: item.Project,
				item: item.Project
			})			
		})
		Product.forEach(function(item, index){
			ProductArr.value.push({
				name: item.Project,
				item: item.Project
			})			
		})		
	}
	catch(e){
		console.log(e)
	}
}
axiosProject()
// ======================================================================================
const isCreated = ref(false);
const empty = ref(true);
const Workinghour = ref("");
const Project = ref("");
const Content = ref("");
const AllProject = ref({});

const submitDiary = () => {
  // console.log(diary.value);
  if (Workinghour.value === "") {
    alert("請選擇時數!");
  } else if (Project.value === "") {
    alert("請選擇專案!");
  } else if (Content.value === "") {
    alert("請填寫日誌!");
  }
  // else if (Project.value === "") {
  //   alert("已完成此專案日誌");
  // }
  else {
    AllProject.value = {
      id: uuidv4(),
      Workinghour: Workinghour.value,
      Project: Project.value,
      Content: Content.value,
    };
    store.dispatch("updateDiary", AllProject.value);
    clearForm();
    ifCreated();
  }
};

const diary = computed(() => {
  return store.state.diary;
});

const clearForm = () => {
  Workinghour.value = "";
  Project.value = "";
  Content.value = "";
};

const removeDiary = (item) => {
  store.dispatch("deleteDiary", item);
  clearForm();
  ifCreated();
};

const editDiary = (item) => {
  console.log(item);
  empty.value = false;
  Workinghour.value = item.Workinghour;
  Project.value = item.Project;
  Content.value = item.Content;
};


const editComplete = () => {
  console.log(AllProject.value);
  for (let i = 0; i < AllProject.value.length; i++) {
    if (diary.value[i].id === diary.value.id) {
      console.log(AllProject.value[i]);
    }
  }

  empty.value = true;
  clearForm();
};

function ifCreated() {
  if (diary.value.length === 0) {
    isCreated.value = false;
  } else {
    isCreated.value = true;
  }
}











// function getFiles(e) {

//   console.log(e.target.files[0].name);
// }

</script>

<style lang="scss" scoped>
.content-box {
  height: auto;
  flex-direction: column;
  padding-right: 20px;
}
.create-box {
  width: auto;
  height: auto;
  flex-direction: column;
  padding-right: 20px;
  select {
    width: 100%;
  }
  .textarea {
    width: 100%;
    height: 120px;
    border-radius: 5px;
    .Info {
      p {
        font-size: 1rem;
      }
    }
    .project {
      height: 10vh;
      .project-name {
        font-weight: bolder;
      }
      .edit-icon {
        color: rgb(64, 64, 64);
      }
    }
  }
}
.diary-box {
  display: flex;
  flex-direction: column;
  height: auto;
  max-height: 100vh;
}
.completeDiary {
  overflow-x: scroll;
  overflow-y: hidden;
  width: 100%;
  white-space: nowrap;
  .project {
    min-width: 40%;
    display: inline-block;
  }
}
.work-time {
  font-size: 1rem;
  width: 25%;
  input {
    font-size: 0.8rem;
    width: 80%;
  }
}
.editComplete {
  background: #fa2323;
  &:hover {
    background: #e01010;
  }
}
</style>
