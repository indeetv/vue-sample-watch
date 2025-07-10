import { createRouter, createWebHistory } from 'vue-router';
import { useLoggedInStore } from '@/store/loggedIn.ts'
import login from '@/pages/login.vue'; 
import brands from '@/pages/brands.vue';
import projects from '@/pages/projects.vue'
import videos from '@/pages/videos.vue'
import viewing_room from '@/pages/viewing_room.vue'

const routes = [
  {
    path : '/login', 
    name : 'login',
    component : login
  },
  {
    path : '/brands',
    name : 'brands',
    component : brands
  },
  {
    path : '/project',
    name : 'project',
    component : projects
  },
  {
    path : '/videos',
    name : 'videos',
    component : videos
  },
  {
    path : '/viewing_room',
    name : 'viewing room',
    component : viewing_room
  },
  // Redirect to login page
  {
    path : '/',
    redirect : '/login'
  },
  // Catch all other routes and redirect to /brands
  {
    path: '/:pathMatch(.*)*', 
    redirect: '/brands'
  }
];

export const router = createRouter({
  history : createWebHistory(), 
  routes
});

router.beforeEach(async (to, _from, next) => {
  const loggedInStore = useLoggedInStore();

  await loggedInStore.getLoginState();

  if (loggedInStore.loggedIn || to.name === 'login') {
    next();
  } else {
    next('/login');
  }
});

export default router;
