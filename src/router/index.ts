import { createRouter, createWebHistory } from 'vue-router';
import login from '@/pages/login.vue'; 

const routes = [
  {
    path: '/login', 
    name: 'login',
    component: login
  },
  {
    path:'/project',
    name:'project'
  },
  {
    path:'/videos',
    name:'videos'
  },

  // Redirect to login page
  {
    path: '/',
    redirect: '/login'
  }
];

const router = createRouter({
  history: createWebHistory(), 
  routes
});

export default router;
