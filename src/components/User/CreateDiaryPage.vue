<template>
  <div class="section">
    <div class="d-md-flex">
      <div class="content-box diary-box col">
        <div v-for="data in info" class="container p-2">
          <p class="text-primary InfoTitle"><strong>個人資訊</strong></p>
          <hr />
          <p class="Info"><strong>Class : </strong>{{ data.Class }}</p>
          <hr />
          <p class="Info"><strong>Number : </strong>{{ data.Id }}</p>
          <hr />
          <p class="Info"><strong>Name : </strong>{{ data.Name }}</p>
          <hr />
          <p class="Info"><strong>Email : </strong>{{ data.Email }}</p>
        </div>
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
                <option value="A專案">A專案</option>
                <option value="B專案">B專案</option>
                <option value="C專案">C專案</option>
              </optgroup>
              <optgroup label="產品">
                <option value="A產品">A產品</option>
                <option value="B產品">B產品</option>
                <option value="C產品">C產品</option>
              </optgroup>
            </select>
          </div>
          <div class="work-time col-md-4">
            <label for="profile_pic">上傳圖片</label>
            <br />
            <span>
              <input
                @change="getFiles"
                type="file"
                id="profile_pic"
                name="profile_pic"
                accept=".jpg, .jpeg, .png"
              />
            </span>
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
            type="submit"
            class="btn btn-primary add-items confirm-btn"
            @click="submitDiary"
            value="+ 新增專案"
          />
        </div>
        <div v-else class="text-end">
          <input
            id="submit"
            type="submit"
            class="btn btn-primary add-items confirm-btn editComplete"
            @click="editComplete"
            value="修改完成"
          />
        </div>
        <!-- <div class="text-end">
          <input
            id="submit"
            type="submit"
            class="btn btn-primary add-items confirm-btn"
            @click="test"
            value="測試"
          />
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useStore, mapActions } from "vuex";
import {
  ref,
  onMounted,
  reactive,
  watch,
  defineAsyncComponent,
  computed,
} from "vue";
const isCreated = ref(false);
const empty = ref(true);
const store = useStore();
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

const info = ref([
  {
    Class: "fn102",
    Name: "Jessie",
    Id: 13,
    Email: "nini880219@gmail.com",
  },
]);

const editComplete = () => {
  console.log(AllProject.value);
  for (let i = 0; i < AllProject.value.length; i++) {
    if (diary.value[i].id === diary.value.id) {
      console.log(AllProject.value[i]);
    }
  }

  empty.value = true;
  clearForm();

  // Workinghour.value = item.Workinghour;
  // Project.value = item.Project;
  // Content.value = item.Content;
};
// const test = () => {
// console.log(diary.value.length);
// for (let i = 0; i < AllProject.value.length; i++) {
//   if (state.diary[i].id === status.id) {
//     state.diary.splice(i, 1);
//   }
// }
// console.log(AllProject.value.Project);
// };

function ifCreated() {
  if (diary.value.length === 0) {
    isCreated.value = false;
  } else {
    isCreated.value = true;
  }
}
function getFiles(e) {
  // console.log(e.target.files[0]);
  console.log(e.target.files[0].name);
}

// function onFileChange(e) {
//   var files = e.target.files || e.dataTransfer.files;
//   if (!files.length) return;
//   this.createImage(files[0]);
// }

// function formEmpty() {
//   console.log(diary.value.Project);
//   if (diary.value.Project === undefined) {
//     alert("請選擇專案!");
//   }
//   else {
//     isCreated.value = true;
//   }
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
