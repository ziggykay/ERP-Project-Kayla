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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
