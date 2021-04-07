import { createRouter, createWebHistory } from 'vue-router'
import about from '../views/aboutMirko.vue'
import homePage from '../views/homePage.vue'

const routes = [
  {
    path: '/home',
    name: 'home',
    component: homePage
  },
  {
    path: '/about',
    name: 'about',
    component: about
  },
  {
    path: '/instructions/cups',
    redirect: '/about'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
