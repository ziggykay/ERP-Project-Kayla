<template>
  <div class="section">
    <div class="container-fluid">
      <div class="d-md-flex">
        <!-- 個人資訊 -->
        <div class="content-box userInfo-box col d-flex">
          <div v-for="data in items" class="container-fluid p-2">
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
        <!-- 已登打日誌 -->
        <div class="content-box diary-box col">
          <div class="container-fluid p-2">
            <p class="text-primary InfoTitle"><strong>已編輯日誌</strong></p>
            <hr />
            <div class="completeDiary">
              <div v-for="data in diary" class="project content-box-border">
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
      <!-- 登打日誌 -->
      <div class="content-box create-box col">
        <div class="container-fluid p-2">
          <p class="text-primary InfoTitle"><strong>日誌登打</strong></p>
          <hr />
          <div class="d-flex flex-wrap">
            <div class="work-time col-4">
              <label for=""
                >工作時數 <span class="note">以0.5h為單位</span></label
              >
              <br />
              <select>
                <option>請選擇時數</option>
                <option>0.5</option>
                <option>1</option>
                <option>1.5</option>
                <option>2</option>
                <option>2.5</option>
                <option>3</option>
                <option>3.5</option>
                <option>4</option>
                <option>4.5</option>
                <option>5</option>
                <option>5.5</option>
                <option>6</option>
                <option>6.5</option>
                <option>7</option>
                <option>7.5</option>
                <option>8</option>
              </select>
            </div>
            <div class="work-time col-4">
              <label for="">專案選擇</label>
              <br />
              <select>
                <option>請選擇專案</option>
                <option>專案</option>
                <option>產品</option>
              </select>
            </div>
            <div class="work-time col-4">
              <label for="">上傳圖片</label>
              <br />
              <input
                type="file"
                id="profile_pic"
                name="profile_pic"
                accept=".jpg, .jpeg, .png"
              />
            </div>
            <br />
            <div class="container-fluid work-time col-12">
              <label for="">內文</label>
              <br />
              <textarea class="textarea" placeholder="請輸入內文..."></textarea>
            </div>
          </div>
          <div class="text-end">
            <button type="button" class="btn btn-primary confirm-btn">
              + 新增專案
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const items = ref([
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
body {
  margin: 0;
  padding: 0;
}
.create-box {
  width: auto;
  height: auto;
  flex-direction: column;
  padding-right: 20px;
  select {
    width: 80%;
  }
  .textarea {
    width: 100%;
    height: 120px;
    border-radius: 5px;
    .Info {
      p {
        font-size: 0.8rem;
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

.userInfo-box {
  flex-direction: column;
  width: auto;
  height: auto;
  max-height: 100vh;
  hr {
    margin: 0;
  }
  p.Info {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
}
.diary-box {
  display: flex;
  flex-direction: column;
  width: auto;
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
