<template>
  <input type="checkbox" id="menu" />
  <nav>
    <!-- <label>Logo</label> -->
    <img class="logo" src="../../../public/FORESII_logo-01.png" alt="Logo"/>
    <ul>
      <li><button class="btn confirm-btn" @click="logOut">登出</button></li>
    </ul>
    <label for="menu" class="menu-bar"><i class="fa-solid fa-bars"></i></label>
  </nav>
</template>

<script setup>
import router from '../../router';
import store from '../../store'

  function logOut () {
    store.dispatch('auth/clearData')
    router.push('/')
  }


</script>

<style lang="scss" scoped>
* {
  padding: 0px;
  margin: 0px;
  list-style: none;
  box-sizing: border-box;
}
nav {
  background-color: #fff;
  height: 80px;
  /* position: fixed; */
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
.logo{
  width: 120px;
  margin-left: 20px;
  margin-top: 10px;
  cursor: pointer;
}

.side-menu {
  /*position: fixed;*/
  background-color: #fff;
  width: 250px;
  height: 100%;
  /*margin-top: 80px;*/
}
/* .side-menu li a.dropdown {
  background-color: rgb(192, 192, 192);
} */
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
  font-size: 20px;
  margin-left: 10px;
}
.side-menu i {
  font-size: 20px;
  margin-left: 20px;
}
nav .menu-bar {
  float: right;
  display: none;
  margin-right: 20px;
  font-size: 30px;
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

	