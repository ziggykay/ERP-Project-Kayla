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
            <div class="completeDiary">
              <div
                v-for="data in diary"
                class="project plates content-box-border"
              >
                <div class="project-name text-center">{{ data.project }}</div>
                <div class="text-end">
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
            <div class="text-end mt-2">
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
        <div class="d-flex flex-wrap">
          <div class="work-time col-md-4">
            <label for=""
              >工作時數 <span class="note">以0.5h為單位</span></label
            >
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
            <select id="project">
              <option value="">請選擇專案類型</option>
              <option value="專案">專案</option>
              <option value="產品">產品</option>
            </select>
          </div>
          <div class="work-time col-md-4">
            <label for="profile_pic">上傳圖片</label>
            <br />
            <input
              type="file"
              id="profile_pic"
              name="profile_pic"
              accept=".jpg, .jpeg, .png"
            />
          </div>
          <br />
        </div>
        <div class="container-fluid work-time col-12">
          <label for="">內文</label>
          <br />
          <textarea
            v-model.trim="textarea"
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
            @click="addProject"
            value="+ 新增專案"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import overallVue from "../baseComponents/Overall.vue";
import ClassCard from "../../components/baseComponents/ClassCard.vue";
import axios from "axios";
import { ref, onMounted, reactive, watch, defineAsyncComponent } from "vue";

const info = ref([
  {
    Class: "fn102",
    Name: "Jessie",
    Id: 13,
    Email: "nini880219.gmail.com",
  },
]);
const diary = ref([
  {
    project: "A專案",
  },
  {
    project: "B專案",
  },
  {
    project: "C產品",
  },
]);
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

// .userInfo-box {
//   flex-direction: column;
//   width: auto;
//   height: auto;
//   max-height: 100vh;
//   hr {
//     margin: 0;
//   }
//   p.Info {
//     margin-top: 1rem;
//     margin-bottom: 1rem;
//   }
// }
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
    display: inline-block;
  }
}
</style>
