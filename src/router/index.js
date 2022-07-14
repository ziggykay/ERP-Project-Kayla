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
<<<<<<< HEAD
    component: () => import('../views/User/LearnView.vue')
  },
  {
    path: '/manager/userpunch',
    name: 'Punch',
    component: () => import('../views/Manager/PunchView.vue')
=======
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
>>>>>>> ryan
  },
  {
<<<<<<< HEAD
    path: '/manager/attendanceinfo',
    name: 'ManagerAttendanceInfo',
    component: () => import('../views/Manager/ManagerAttendanceInfoView.vue')
  },
=======
    path: '/manager/punchtable',
    name: 'ManagerPunchTable',
    component: () => import('../views/Manager/ManagerPunchTableView.vue')
  },  

>>>>>>> ryan
  // ========== corporate-page ===============
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
