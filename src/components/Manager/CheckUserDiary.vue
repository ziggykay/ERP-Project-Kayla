<template>
  <div class="d-flex justify-content-center">
    <div class="content-box-outter">
      <div class="title border-bottom p-2 fw-bold">日誌詳情</div>
      <div class="d-flex justify-content-center">
        <div class="content-box">
          <p class="">2022/06/30 17:21</p>
          <div class="d-flex justify-content-evenly mt-3">
            <div>
              <h3 class="p-2 fw-bold">A專案</h3>
              <p>Class : fn102</p>
              <p>Number : 001</p>
              <p>Name : 王小明</p>
              <p>Email : Wang@test.com</p>
            </div>
            <div>
              <img
                class="diary-img"
                src="https://blogger.googleusercontent.com/img/a/AVvXsEhMEP7FubNdbKwB5CX1f4HqLAaycm1CTwBiUh7lky8fACIcafbV_plS5ATMh9jXEM3cFeV7PR4D5324W9e1fsqG0fChjMQfSh4WNBLmlbSxOpHYl17Y0pBqbtFUeXogQMO1fcMj1yuxF0aFoWYJtA4xc4bNeCyeX7GcQYu-oKjhUBJbnGgxbH_vy1dvGg"
                alt=""
              />
            </div>
          </div>
          <div class="d-flex justify-content-center">
            <p class="pt-0 pt-md-4 col-10">
              完成粗切、頁面切換功能，下午開了座標擷取轉換案跟發想產品-貓咖地圖專案的會議，大致分工完成了，接下來就是後續的討論，一下子事情又變好多唷
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
};
</script>

<style lang="scss" scoped>
.content-box-outter {
  margin: 1rem;
  background-color: #fff;
  width: 100%;
  height: 90vh;
  padding: 1rem;
  border-radius: 1rem;
  .title {
    color: #558aba;
  }
}
.content-box {
  margin: 1rem;
  background-color: #fff;
  width: 90%;
  height: 65vh;
  padding: 1rem;
  box-shadow: gray;
}
.diary-img {
  width: 100%;
  height: 30vh;
  background: rgb(204, 202, 202);
}
.content-box-feeback-outter {
  margin: 1rem;
  background-color: #fff;
  width: 75%;
  height: 43vh;
  padding: 1rem;
  border-radius: 1rem;
  .title {
    color: #558aba;
  }
}
.content-box-feeback {
  width: 90%;
  height: 30vh;
  border: solid 1px #558aba;
  border-radius: 1rem;
}
textarea {
  outline: none;
  resize: none;
}
</style>
