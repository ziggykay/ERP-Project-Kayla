<!-- <template>
  <p class="text-primary InfoTitle"><strong>日誌登打</strong></p>
  <hr />
  <div class="d-flex flex-wrap justify-content-between">
    <div class="work-time col-md-4">
      <label for="">工作時數</label>
      <br />
      <select id="time" v-model="workinghour">
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
        <optgroup label="專案">
          <option value="">A專案</option>
          <option value="">B專案</option>
          <option value="">C專案</option>
        </optgroup>

        <optgroup label="產品">
          <option value="">A產品</option>
          <option value="">B產品</option>
          <option value="">C產品</option>
        </optgroup>
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
      v-model="Content"
    ></textarea>
  </div>
  <div class="text-end">
    <input
      id="submit"
      type="submit"
      class="btn btn-primary add-items confirm-btn"
      @click="submitDiary"
      value="+ 新增專案"
    />
  </div>
</template>

<script setup>
import axios from "axios";
import { useStore, mapActions } from "vuex";
import { ref, onMounted, reactive, watch, defineAsyncComponent } from "vue";

const store = useStore();

const workinghour = ref("");
const Project = ref("");
const Content = ref("");
const AllProject = ref([]);
const submitDiary = () => {
  AllProject.value.push({
    workinghour: workinghour.value,
    Project: Project.value,
    Content: Content.value,
  });
  store.dispatch("updateDiary", Project.value);
  if_else();
  console.log(AllProject.value);
};
const removeDiary = () => {
  store.dispatch("deleteDiary", Project.value);
};
function if_else() {
  if (AllProject === "") {
    isCreated.value = false;
  } else {
    isCreated.value = true;
  }
}
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
</style> -->
