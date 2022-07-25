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
            <!-- <div class=""> -->
            <div v-if="isCreated" class="d-flex completeDiary">
              <div
                v-for="(item, i) of store.state.diary"
                :key="i"
                class="content-box-border project plates d-flex flex-column"
              >
                <div class="project-name text-center align-self-center mt-4">
                  {{ item }}
                </div>
                <div class="align-self-end mt-3">
                  <span
                    ><a class="edit-icon" href="#">
                      <i class="fa-solid fa-pen-to-square mx-1"></i></a
                  ></span>
                  <span
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
            <!-- </div> -->
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
            <select id="time">
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
              <option value="">請選擇專案類型</option>
              <option value="專案">專案</option>
              <option value="產品">產品</option>
            </select>
          </div>
          <div class="work-time col-md-4">
            <label for="profile_pic">上傳圖片</label>
            <br />
            <span
              ><input
                type="file"
                id="profile_pic"
                name="profile_pic"
                accept=".jpg, .jpeg, .png"
            /></span>
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
          ></textarea>
        </div>
        <div class="text-end">
          <input
            id="submit"
            type="submit"
            class="btn btn-primary add-items confirm-btn"
            @click="
              $store.dispatch('updateDiary', Project);
              addProject();
            "
            value="+ 新增專案"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useStore, mapActions } from "vuex";
import { ref, onMounted, reactive, watch, defineAsyncComponent } from "vue";

const isCreated = ref(false);

const Project = ref("");
const store = useStore();
const info = ref([
  {
    Class: "fn102",
    Name: "Jessie",
    Id: 13,
    Email: "nini880219.gmail.com",
  },
]);

function addProject() {
  if (Project === "") {
    this.isCreated = false;
  } else {
    this.isCreated = true;
  }
}
// addProject();
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
</style>
