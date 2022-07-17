<template>
  <div class="container-fluid px-5 pt-3">
    <div class="inner d-flex flex-wrap">
      <div class="col-4">
        <div class="box1 m-1">
          <div class="content-box">
            <div class="container-fluid p-2 Info">
              <span class="text-primary InfoTitle"
                ><strong>個人資訊</strong></span
              >
              <hr />
              <p><strong>Class : </strong>FN102</p>
              <hr />
              <p><strong>Number : </strong>001</p>
              <hr />
              <p><strong>Name : </strong>王小明</p>
              <hr />
              <p><strong>Email : </strong>Wang@test.com</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-8">
        <div class="box2 m-1">
          <div class="content-box">
            <div class="container-fluid p-2">
              <p class="text-primary InfoTitle"><strong>已編輯日誌</strong></p>
              <hr />
              <div class="d-flex">
                <div class="project content-box-border">
                  <div class="project-name text-center">A專案</div>
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
                <div class="project content-box-border">
                  <div class="project-name text-center">B產品</div>
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
              <div class="text-end">
                <button type="button" class="btn btn-primary confirm-btn">
                  確認送出
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="box3 m-1 createDiary">
          <div class="content-box">
            <div class="container-fluid p-2">
              <div class="row">
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
                    <textarea
                      class="textarea"
                      placeholder="請輸入內文..."
                    ></textarea>
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
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
body {
  margin: auto;
  padding: auto;
}
.inner {
  width: 100%;
  height: 100%;
}
.content-box {
  width: 100%;
  height: 20rem;
}
.createDiary {
  select {
    width: 80%;
  }
  .textarea {
    width: 100%;
    height: 120px;
    border-radius: 5px;
  }
}
</style>
