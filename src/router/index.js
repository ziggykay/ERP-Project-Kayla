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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
