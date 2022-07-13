<template>
<<<<<<< HEAD
=======
<div class="container">
>>>>>>> main
  <div class="side-menu">
    <li>
      <a href="#"><i class="fa-solid fa-house"></i><span>首頁</span> </a>
    </li>
    <li>
      <a href="#"
        ><i class="fa-solid fa-chart-column"></i><span>出勤紀錄</span>
      </a>
    </li>
    <li>
      <a href="#"><i class="fa-solid fa-chalkboard-user"></i>
        <span>學習紀錄</span>
      </a>
    </li>
    <!-- <li>
      <a href="#"><i class="fa-solid fa-book-open"></i><span>日誌</span></a>
    </li> -->
    <li class="mb-1">
      <a
        class="collapsed"
        data-bs-toggle="collapse"
        data-bs-target="#orders-collapse"
        aria-expanded="false"
        ><i class="fa-solid fa-book-open"></i><span>日誌</span></a
      >
      <button
        class="btn btn-toggle align-items-center collapsed"
        data-bs-toggle="collapse"
        data-bs-target="#orders-collapse"
        aria-expanded="false"
      >
        日誌
      </button>
      <div class="collapse" id="orders-collapse">
        <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
          <a
            class="btn align-items-center sub-btn dropdown"
            data-bs-toggle="collapse"
            data-bs-target="#dashboard-collapse"
            aria-expanded="false"
          >
            查看日誌
          </a>
          <a
            class="btn align-items-center sub-btn dropdown"
            data-bs-toggle="collapse"
            data-bs-target="#dashboard-collapse"
            aria-expanded="false"
          >
            日誌登打率
          </a>
        </ul>
      </div>
    </li>

    <!-- 111 -->
    <li>
      <a href="#"
        ><i class="fa-solid fa-envelope"></i><span>查看問題回覆</span>
      </a>
    </li>
    <li>
      <a href="#" class="Logout"><span>Logout</span></a>
    </li>
  </div>	
<<<<<<< HEAD
=======
</div>
>>>>>>> main
</template>
<script type="text/javascript">
	export default {
	  name:'SideBar',
<<<<<<< HEAD
	  data(){
	    return{
	    }
	  },
	  computed:{
	  },	  
	  mounted(){
	  },	  
	  methods: {
	  }
=======
>>>>>>> main
	} 
</script>

<style scoped>
body {
  height: 100vh;
  background-color: #e4ecf0;
}
a {
  text-decoration: none;
}
<<<<<<< HEAD
nav {
  background-color: #fff;
  height: 80px;
  /*position: fixed;*/
  width: 100%;
  border-bottom: #757575 0.5px solid;
}
label {
  line-height: 80px;
  font-size: 50px;
  color: #558aba;
  font-weight: 600;
  margin-left: 50px;
  cursor: pointer;
}
nav ul {
  float: right;
  margin-right: 20px;
}
nav ul li {
  line-height: 80px;
  margin: 0 10px;
}
nav ul li a {
  color: white;
  font-size: 20px;
  padding: 6px 15px;
  font-weight: 600;
  background-color: #558aba;
  border-radius: 5px;
}
nav ul li a:hover {
  color: white;
  background-color: #22496d;
}
.side-menu {
  /*position: fixed;*/
=======
.container{
  width: auto;
  height: 100;
}
.side-menu {
>>>>>>> main
  background-color: #fff;
  width: 250px;
  /* min-height: auto; */
  height: 100%;
  /*margin-top: 80px;*/
}
.side-menu li a.dropdown:hover {
  background-color: rgb(118, 118, 118);
}
.side-menu a {
  padding: 10px;
  display: block;
  line-height: 60px;
  transition: 0.5s;
  color: rgb(52, 52, 52);
}
.side-menu a:hover {
  background-color: #558aba;
  padding-left: 20px;
  color: #fff;
}
.side-menu span {
  font-size: 14px;
  margin-left: 10px;
}
.side-menu i {
  font-size: 20px;
  margin-left: 20px;
}
#menu {
  display: none;
}
.side-menu .Logout {
  display: none;
}
@media (max-width: 850px) {
  .side-menu a span {
    display: none;
  }
  .side-menu a i {
    display: block;
    line-height: 80px;
    text-align: center;
    margin-left: 0;
    font-size: 25px;
  }
  .side-menu {
    width: 200px;
  }
}
@media (max-width: 768px) {
  .side-menu {
    width: 150px;
  }
}
@media (max-width: 650px) {
  nav ul {
    display: none;
  }
  .side-menu {
    width: 100%;
    text-align: center;
    left: 100%;
    background-color: rgba(255, 255, 255, 0.5);
    transition: all 0.5s;
  }
  .side-menu a span {
    display: block;
  }
  .side-menu a i {
    display: none;
  }
  .side-menu .Logout {
    display: block;
  }
  nav .menu-bar {
    display: block;
  }
}
#menu:checked ~ .side-menu {
  left: 0;
}
</style>

	