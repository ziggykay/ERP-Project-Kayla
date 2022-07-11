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
    path: '/test',
    name: 'test',
    component: () => import('../views/TestView.vue')
  },  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
