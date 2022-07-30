<!-- <template>
  <div
    v-for="(item, index) of store.state.diary"
    :key="index"
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
      <span @click="removeDiary(index)"
        ><a class="edit-icon" href="#">
          <i class="fa-solid fa-trash-can mx-1"></i></a
      ></span>
    </div>
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
.create-box {
  width: auto;
  height: auto;
  flex-direction: column;
  padding-right: 20px;
  select {
    width: 100%;
  }
  .textarea {
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
</style> -->
