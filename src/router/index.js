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
import mirkoClassic from '@/views/mirkoClassic.vue'
import mirkoFlow from '@/views/mirkoFlow.vue'
import menscup from '@/views/menscup.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: homePage
  },
  {
    path: '/learn/menstrual-cup',
    name: 'menscup',
    component: menscup
  },
  {
    path: '/learn/mirko-flow',
    name: 'mirkoflow',
    component: mirkoFlow
  },
  {
    path: '/learn/mirko-classic',
    component: mirkoClassic
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
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})

export default router
