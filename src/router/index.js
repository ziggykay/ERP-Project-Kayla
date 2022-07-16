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
    path: '/user/punch',
    name: 'UserPunch',
    component: () => import('../views/User/UserPunchView.vue')
  },
  {
    path: '/user/learn',
    name: 'Learn',
    component: () => import('../views/User/learnView.vue')
  },
  // ========== manager-page ============== 
  {
    path: '/manager/punch',
    name: 'ManagerPunch',
    component: () => import('../views/Manager/ManagerPunchView.vue')
  },
  {
    path: '/manager/learnschedule',
    name: 'ManagerlearnSchedule',
    component: () => import('../views/Manager/ManagerLearnScheduleView.vue')
  },
  {
    path: '/manager/punchtable',
    name: 'ManagerPunchTable',
    component: () => import('../views/Manager/ManagerPunchTableView.vue')
  },  

  // ========== corporate-page ===============
  {
    path: '/manager/checkuserdiary',
    name: 'CheckUserDiary',
    component: () => import('../views/manager/CheckUserDiaryView.vue')
  },
  {
    path: '/user/checkdiary',
    name: 'CheckDiary',
    component: () => import('../views/user/CheckDiaryView.vue')
  },
  {
    path: '/user/systemresponse',
    name: 'systemresponse',
    component: () => import('../views/user/SystemResponseView.vue')
  },
  {
    path: '/manager/systemmanage',
    name: 'systemmanage',
    component: () => import('../views/manager/SystemManageView.vue')
  },
  {
    path: '/company/UserDiaryFeedback',
    name: 'UserDiaryFeedback',
    component: () => import('../views/company/UserDiaryFeedbackView.vue')
  },
  {
    path: '/company/watchuserdiary',
    name: 'watchuserdiary',
    component: () => import('../views/company/WatchUserDiaryView.vue')
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
