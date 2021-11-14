import { createRouter, createWebHistory } from 'vue-router'
import about from '@/views/aboutMirko.vue'
import checkout from '@/views/checkout.vue'
import contact from '@/views/contactUs.vue'
import help from '@/views/helpPage.vue'
import shop from '@/views/shopPage.vue'
import homePage from '@/views/homePage.vue'
import prod from '@/views/prodPage.vue'
import cupsinfo from '@/views/cupsInfo.vue'
import thankyou from '@/views/thankyou.vue'
import signup from '@/views/signup.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: homePage
  },
  {
    path: '/about',
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
    path: '/help/:section',
    component: help,
    props: true
  },
  {
    path: '/help',
    component: help,
  },
  {
    path: '/product/:pid',
    component: prod,
    props: true
  },
  {
    path: '/shop',
    component: shop,
    props: route => ({ linksearch: route.query.search })
  },
  {
    path: '/linkto/instructions-cups',
    name: 'cupsInfo',
    component: cupsinfo
  },
  {
    path: '/thankyou',
    name: 'thankyou',
    component: thankyou
  },
  {
    path: '/signup',
    name: 'signup',
    component: signup
  },
  {
     path: '/:pathMatch(.*)*',
     redirect: '/'
   }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
