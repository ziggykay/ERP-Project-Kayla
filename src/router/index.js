import { createRouter, createWebHistory } from 'vue-router';

const routes = [

  {
    path: '/',
    name: 'Login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/user/punch',
    name: 'UserPunch',
    component: () => import('../views/UserPunchView.vue')
  },
  {
    path: '/user/learn',
    name: 'Learn',
    component: () => import('../views/LearnView.vue')
  },
  {
    path: '/userpunch',
    name: 'UserPunch',
    component: () => import('../views/PunchView.vue')
  },
  {
    path: '/manager/attendanceinfo',
    name: 'ManagerAttendanceInfo',
    component: () => import('../views/ManagerAttendanceInfoView.vue')
  },   
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
