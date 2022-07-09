<script setup>

function logOut () {
  return $router.push('/login')
}

</script>
<template>
  <div class="container nav-container ">

    <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-end mb-md-0">
      <li>
        <button type="button" class="btn btn-primary confirm-btn">登出</button>
      </li>
    </ul>

    <div class="dropdown text-end">
      <ul class="dropdown-menu text-small" aria-labelledby="dropdownUser1">
        <li><hr class="dropdown-divider"></li>
        <li><button type="button" class="btn btn-primary confirm-btn" @click="logOut()">登出</button></li>
      </ul>
    </div>
  </div>
</template>
<style lang="scss" scoped >
  .nav-container{
    height: 60px;
    padding: 8px;
    background-color: #fff;
    box-shadow: 10px 5px 5px rgb(193, 191, 191);
    
    button{
      height: 2.5rem;
      width: 5rem
    }
  }
</style>