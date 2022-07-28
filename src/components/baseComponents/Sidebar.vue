<template>
<div class="container">
  <div class="side-menu">
    <li v-for="data of currentSidebar" :key="data">
    <!-- <li v-for="data of userSideBarData" :key="data"> -->
    	<template v-if="!data.subTitleArr">
    		<router-link :to="data.href" :class="[$route.path == data.href ? 'active' : '' ]">
          <i class="fa-solid" :class="data.iconCss"></i><span>{{ data.title }}</span>
        </router-link>
    	</template>
    	<template v-else>
      <a
        class="collapsed"
        data-bs-toggle="collapse"
        data-bs-target="#orders-collapse"
        aria-expanded="false"
        ><i class="fa-solid" :class="data.iconCss"></i><span>{{ data.title }}</span></a>
      <div class="collapse" id="orders-collapse">
        <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
          <router-link 
          	v-for="subData of data.subTitleArr" :key="subData"
            :class="[$route.path == subData.href ? 'active' : '' ]"
            class="btn align-items-center sub-btn dropdown"
            data-bs-target="#dashboard-collapse"
            aria-expanded="false"
            :to="subData.href"
          >
          {{ subData.subTitle }}
          </router-link>
        </ul>
      </div>
    	</template>

    </li>
  </div>	
</div>
</template>

<script setup>
	import { onMounted, ref, watch } from 'vue'
	
	//props 
	const props = defineProps({
		parentSideData: Array
	})

	// data
	const parentSideData = ref(props.parentSideData);

  // User
	const userSideBarData = ref([
		{
			title: '首頁',
			href: "/user/home", 
			iconCss: 'fa-house'
		},
		{
			title: '出勤紀錄',
			href: "/user/punch" ,
			iconCss: 'fa-chart-column'
		},
		{
			title: '學習紀錄',
			href: "/user/learn",
			iconCss: 'fa-chalkboard-user'
		},	 
		{
			title: '日誌',
			href: "/log",
			iconCss: 'fa-book-open',
			subTitleArr: [
				{
					subTitle: '登打日誌',
					href: "/user/creatediary",
				},
				{
					subTitle: '查看日誌',
					href: "/user/checkdiaryselect"
				},	  				
			]
		},	
		{
			title: '查看問題回覆',
			href: "/user/systemresponse",
			iconCss: 'fa-envelope'
		}	  		 		  		 		
	])

  // Manager
  const managerSideBarData = ref([
    {
      title: '首頁',
      href: "/manager/home", 
      iconCss: 'fa-house'
    },
    {
      title: '學員出勤紀錄',
      href: "/manager/punch" ,
      iconCss: 'fa-chart-column',
      subTitleArr: [
        {
          subTitle: '出勤圖表',
          href: "/manager/punch",
        },
        {
          subTitle: '出勤表格',
          href: "/manager/punchtable"
        },	  				
        {
          subTitle: '學習進度圖表',
          href: "/manager/learnschedule"
        },	  				
      ]      
    },
    {
      title: '查看學員日誌',
      href: "/manager/checkdiaryselect",
      iconCss: 'fa-chalkboard-user'
    },
    {
      title: '學員資訊',
      href: "/manager/curriculum",
      iconCss: 'fa-book-open',
      subTitleArr: [
        {
          subTitle: '課表資訊',
          href: "/manager/curriculum",
        },
        {
          subTitle: '請假資訊',
          href: "/manager/studentleave"
        },	  								
      ]     
    },
    {
      title: '帳號權限管理',
      href: "/manager/accountcheck",
      iconCss: 'fa-envelope'
    },
    {
      title: '系統反應管理',
      href: "/manager/systemmanage",
      iconCss: 'fa-envelope'
    }
  ])

  // Company
	const companySideBarData = ref([
		{
			title: '查看學員日誌',
			href: "/company/checkdiary", 
			iconCss: 'fa-house'
		},
		{
			title: '系統反應管理',
			href: "/company/userdiaryfeedback",
			iconCss: 'fa-chart-column'
		},
		{
			title: '查看問題回覆',
			href: "/company/userdiaryfeedback",
			iconCss: 'fa-chalkboard-user'
		}		 		  		 		
	])

  // 模擬使用者權限
  const currentSidebar = ref()
  const userStatus = ref(
    {
      access: 2,
    }
  )
  const changeSidebar = () => {
    switch (userStatus.value.access) {
      case 1 :
        currentSidebar.value = userSideBarData.value
        break;
      case 2 :
        currentSidebar.value = managerSideBarData.value
        break;
      case 3 :
        currentSidebar.value = companySideBarData.value
        break; 
      default:
        currentSidebar.value = ''
        break;
    }
  }

  // watch(
    // userStatus, changeSidebar
  // )

  onMounted(()=>{
    changeSidebar()
  })
  //


</script>

<style lang="scss" scoped>
body {
  height: 100vh;
  background-color: #e4ecf0;
}
a {
  text-decoration: none;
}
.container{
  width: auto;
  height: 100;
}
.side-menu {
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
.active{
  background-color: #558aba;
  padding-left: 20px;
  i{
    color: #fff;
  }
  span{
    color: #fff;
  }
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

	