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
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
