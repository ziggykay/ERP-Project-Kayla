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
    path: '/user/creatediary',
    name: 'CreateDiary',
    component: () => import('../views/User/CreateDiaryView.vue')
  },
  {
    path: '/user/checkdiaryselect',
    name: 'CheckDiarySelect',
    component: () => import('../views/User/CheckDiarySelectView.vue')
  },
  {
    path: '/user/systemresponse',
    name: ' SystemResponse',
    component: () => import('../views/User/SystemResponseView.vue')
  },
  {
    path: '/user/checkselfdiary',
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
  {
    path: '/manager/checkdiaryselect',
    name: 'CheckDiarySelectManager',
    component: () => import('../views/Manager/CheckDiarySelectView.vue')
  },
  {
    path: '/manager/checkdiary',
    name: 'CheckDiary',
    component: () => import('../views/Manager/CheckUserDiaryView.vue')
  },
  // TODO:路由調整？
  {
    path: '/manager/accountcheck',
    name: 'AccountCheck',
    component: () => import('../views/Manager/AccountCheckView.vue')
  },
  {
    path: '/manager/accountcheck/:id',
    name: 'AccountCheckId',
    component: () => import('../views/Manager/UserInfoView.vue')
  },
  // {
  //   path: '/manager/userinfo',
  //   name: 'UserInfo',
  //   component: () => import('../views/Manager/UserInfoView.vue')
  // },
  //
  {
    path: '/manager/systemmanage',
    name: 'SystemManage',
    component: () => import('../views/Manager/SystemManageView.vue')
  },
  // ========== company-page ===============
  {
    path: '/company/checkdiary',
    name: 'CheckDiary',
    component: () => import('../views/Company/CheckDiaryView.vue')
  },
  {
    path: '/company/userdiaryfeedback',
    name: 'UserDiaryFeedback',
    component: () => import('../components/Company/UserDiaryFeedback.vue')
  },
  {
    path: '/company/watchuserdiary',
    name: 'WatchUserDiary',
    component: () => import('../components/Company/WatchUserDiary.vue')
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
