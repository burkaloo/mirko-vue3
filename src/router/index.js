import { createRouter, createWebHistory } from 'vue-router'
import about from '@/views/aboutMirko.vue'
import checkout from '@/views/checkout.vue'
import contact from '@/views/contactUs.vue'
import help from '@/views/helpPage.vue'
import homePage from '@/views/homePage.vue'
import prod from '@/views/prodPage.vue'
import cupsinfo from '@/views/cupsInfo.vue'
import thanks from '@/views/thanks.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: homePage
  },
  {
    path: '/about',
    name: 'about',
    component: about
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: checkout,
    props: true
  },
  {
    path: '/contact',
    name: 'contact',
    component: contact
  },
  {
    path: '/help',
    name: 'help',
    component: help
  },
  {
    path: '/product/flowunderwear',
    name: 'prod',
    component: prod
  },
  {
    path: '/linkto/instructions-cups',
    name: 'cupsInfo',
    component: cupsinfo
  },
  {
    path: '/thankyou',
    name: 'thanks',
    component: thanks
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
