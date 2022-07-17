<template>
  <div class="container-fluid px-5 pt-3">
    <div class="inner">
      <div class="content-box checkBox mt-3">
        <div class="py-2 checkBoxInner">
          <div>
            <a href="javascript:history.back()" class="back"
              ><div><i class="fa-solid fa-arrow-left"></i> 回列表頁</div></a
            >
          </div>
          <div class="d-flex align-items-center justify-content-between">
            <div class="between mx-2">
              <p class="text-primary"><strong>學員詳細資料</strong></p>
            </div>
            <div class="between mx-2">
              <button type="button" class="my-3 btn btn-primary confirm-btn">
                <i class="fa-solid fa-pen-to-square mx-1"></i>編輯資訊
              </button>
            </div>
          </div>
          <hr />
          <div>
            <div class="mt-3 d-flex">
              <div class="innerTitle">
                <p class="mx-5 text-primary">學號</p>
              </div>

              <input class="content-box-border mx-3" type="text" />
            </div>
            <div class="mt-3 d-flex">
              <div class="innerTitle">
                <p class="mx-5 text-primary">班別</p>
              </div>

              <input class="content-box-border mx-3" type="text" />
            </div>
            <div class="mt-3 d-flex">
              <div class="innerTitle">
                <p class="mx-5 text-primary">班級</p>
              </div>

              <input class="content-box-border mx-3" type="text" />
            </div>
            <div class="mt-3 d-flex">
              <div class="innerTitle">
                <p class="mx-5 text-primary">姓名</p>
              </div>

              <input class="content-box-border mx-3" type="text" />
            </div>
            <div class="mt-3 d-flex">
              <div class="innerTitle">
                <p class="mx-5 text-primary">帳號</p>
              </div>

              <input class="content-box-border mx-3" type="text" />
            </div>
            <div class="mt-3 d-flex">
              <div class="innerTitle">
                <p class="mx-5 text-primary">Email</p>
              </div>

              <input class="content-box-border mx-3" type="text" />
            </div>
            <div class="mt-3 d-flex">
              <div class="innerTitle">
                <p class="mx-5 text-primary">Password</p>
              </div>

              <input class="content-box-border mx-3" type="text" />
            </div>
          </div>
          <div class="text-end mt-3">
            <button type="button" class="m-2 btn btn-primary cancel-btn">
              <i class="fa-solid fa-trash-can"></i>
              刪除帳號
            </button>
            <button type="button" class="m-2 btn btn-primary confirm-btn">
              <i class="fa-solid fa-circle-check"></i>
              確認修改
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const date = ref();
// For demo purposes assign range from the current date
onMounted(() => {
  const startDate = new Date();
  const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
  date.value = [startDate, endDate];
  return Date;
});
</script>

<style lang="scss" scoped>
* {
  margin: auto;
  padding: auto;
}
.inner {
  width: 100%;
  height: 90vh;

  .checkBox {
    width: 100%;
    height: 80vh;

    .checkBoxInner {
      height: 55vh;
      a {
        text-decoration: none;
        font-size: 0.8rem;
      }
      .between {
        margin: 0;
        padding: 0;
      }
      input {
        height: 45px;
        width: 50%;
        border-radius: 5px;
      }
      .innerTitle {
        margin: 0;
        padding: 0;
        width: 15%;
      }
    }
  }
}
</style>
