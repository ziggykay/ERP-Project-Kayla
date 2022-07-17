import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  // ========= login-page ===========
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/LoginView.vue')
  },

  // ============= user-page ==============
  {
    path: '/user/home',
    name: 'UserHome',
    component: () => import('../views/User/UserHomeView.vue')
  },
  {
    path: '/user/punch',
    name: 'UserPunch',
    component: () => import('../views/User/UserPunchView.vue')
  },
  {
    path: '/user/learn',
    name: 'Learn',
    component: () => import('../views/User/UserLearnView.vue')
  },
  {
    path: '/user/createDiary',
    name: 'CreateDiary',
    component: () => import('../views/User/CreateDiaryView.vue')
  },
  {
    path: '/user/checkDiarySelect',
    name: 'CheckDiarySelect',
    component: () => import('../views/User/CheckDiarySelectView.vue')
  },
  {
    path: '/user/systemResponse',
    name: ' SystemResponse',
    component: () => import('../views/User/SystemResponseView.vue')
  },
  {
    path: '/user/checkSelfDiary',
    name: 'CheckSelfDiary',
    component: () => import('../views/User/CheckSelfDiaryView.vue')
  },
  // ========== manager-page ============== 
  {
    path: '/manager/home',
    name: 'ManagerHome',
    component: () => import('../views/Manager/ManagerHomeView.vue')
  },
  {
    path: '/manager/punch',
    name: 'ManagerPunch',
    component: () => import('../views/Manager/ManagerPunchView.vue')
  },
  {
    path: '/manager/learnschedule',
    name: 'ManagerLearnSchedule',
    component: () => import('../views/Manager/ManagerLearnScheduleView.vue')
  },
  {
    path: '/manager/punchtable',
    name: 'ManagerPunchTable',
    component: () => import('../views/Manager/ManagerPunchTableView.vue')
  },
  {
    path: '/manager/studentleave',
    name: 'StudentLeave',
    component: () => import('../views/Manager/ManagerLeaveView.vue')
  },
  {
    path: '/manager/curriculum',
    name: 'curriculum',
    component: () => import('../views/Manager/ManagerCurriculumView.vue')
  },
  
  // ========== corporate-page ===============
  {
    path: '/corporate/home',
    name: 'CorporateHome',
    component: () => import('../views//Corporate/CorporateHomeView.vue')
    path: '/manager/checkDiarySelect',
    name: 'CheckDiarySelectManager',
    component: () => import('../views/Manager/CheckDiarySelectView.vue')
  },
  {
    path: '/manager/checkDiary',
    name: 'CheckDiary',
    component: () => import('../views/Manager/CheckUserDiaryView.vue')
  },
  {
    path: '/manager/accountCheck',
    name: 'AccountCheck',
    component: () => import('../views/Manager/AccountCheckView.vue')
  },
  {
    path: '/manager/userInfo',
    name: 'UserInfo',
    component: () => import('../views/Manager/UserInfoView.vue')
  },
  {
    path: '/manager/systemManage',
    name: 'SystemManage',
    component: () => import('../views/Manager/SystemManageView.vue')
  },
  // ========== company-page ===============
  {
    path: '/company/checkDiary',
    name: 'CheckDiary',
    component: () => import('../views/Company/CheckDiaryView.vue')
  },
  {
    path: '/company/userDiaryFeedback',
    name: 'UserDiaryFeedback',
    component: () => import('../components/Company/UserDiaryFeedback.vue')
  },
  {
    path: '/company/watchUserDiary',
    name: 'WatchUserDiary',
    component: () => import('../components/Company/WatchUserDiary.vue')
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
