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
    component: () => import('../views/UserPunchView.vue')
  },
  {
    path: '/user/learn',
    name: 'Learn',
    component: () => import('../views/learnView.vue')
  },
  {
    path: '/userpunch',
    name: 'Punch',
    component: () => import('../views/PunchView.vue')
  },
  // ========== manager-page ==============
  {
    path: '/manager/attendanceinfo',
    name: 'ManagerAttendanceInfo',
    component: () => import('../views/ManagerAttendanceInfoView.vue')
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
