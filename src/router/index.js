import { createRouter, createWebHistory } from 'vue-router';

const routes = [

  {
    path: '/',
    name: 'Login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/home',
    name: 'UserPunch',
    component: () => import('../views/UserPunchView.vue')
  },
  {
    path: '/learn',
    name: 'Learn',
    component: () => import('../views/LearnView.vue')
  },
  {
    path: '/userpunch',
    name: 'UserPunch',
    component: () => import('../views/PunchView.vue')
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
