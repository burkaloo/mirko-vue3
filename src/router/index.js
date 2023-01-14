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
import mirkoPads from '@/views/mirkoPads.vue'
import blogHome from '@/views/blogHome.vue'
import blogPage from '@/views/blogPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: homePage,
    meta:{
      title: "Mirko PH | Period Essentials" 
    }
  },
  {
    path: '/learn/menstrual-cup',
    name: 'menscup',
    component: menscup,
    meta:{
      title: "Mirko | Menstral Cups" 
    }
  },
  {
    path: '/learn/mirko-flow',
    name: 'mirkoflow',
    component: mirkoFlow,
    meta:{
      title: "Mirko | Flow Period Underwear" 
    }
  },
  {
    path: '/learn/organic-pads',
    name: 'mirkopads',
    component: mirkoPads,
    meta:{
      title: "Mirko | Organic Pads" 
    }
  },
  {
    path: '/learn/mirko-classic',
    component: mirkoClassic,
    meta:{
      title: "Mirko PH | Classic Period Underwear" 
    }
  },
  {
    path: '/about',
    component: about,
    meta:{
      title: "Mirko PH | About Us" 
    }
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: checkout,
    props: true,
    meta:{
      title: "Mirko PH | Checkout" 
    }
  },
  {
    path: '/contact',
    name: 'contact',
    component: contact,
    meta:{
      title: "Mirko PH | Contact Us" 
    }
  },
  {
    path: '/help/:section',
    component: help,
    props: true,
    meta:{
      title: "Mirko PH | FAQs" 
    }
  },
  {
    path: '/help',
    component: help,
    meta:{
      title: "Mirko PH | FAQs" 
    }
  },
  {
    path: '/product/:pid',
    component: prod,
    props: true
  },
  {
    path: '/shop',
    component: shop,
    props: route => ({ linksearch: route.query.search }),
    meta:{
      title: "Mirko PH | All Products" 
    }
  },
  {
    path: '/linkto/instructions-cups',
    name: 'cupsInfo',
    component: cupsinfo,
    meta:{
      title: "Mirko PH | Links-Cups" 
    }
  },
  {
    path: '/thankyou',
    name: 'thankyou',
    component: thankyou,
    meta:{
      title: "Mirko PH | Thank You" 
    }
  },
  {
    path: '/signup',
    name: 'signup',
    component: signup,
    meta:{
      title: "Mirko PH | Signup" 
    }
  },
  {
    path: '/blog',
    name: 'blogHome',
    component: blogHome,
    meta:{
      title: "Mirko PH | Blog Home" 
    }
  },
  {
    path: '/blog/:slug',
    component: blogPage,
    name: 'blogPage',
    props: true,
    meta: (route) => ({ title: route.params.paramtitle})
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

router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // e.g., if we have `/some/deep/nested/route` and `/some`, `/deep`, and `/nested` have titles,
  // `/nested`'s will be chosen.
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if(nearestWithTitle) {
    document.title = nearestWithTitle.meta.title;
  } else if(previousNearestWithMeta) {
    document.title = previousNearestWithMeta.meta.title;
  }

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none.
  if(!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta');

    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key]);
    });

    // We use this to track which meta tags we create so we don't interfere with other ones.
    tag.setAttribute('data-vue-router-controlled', '');

    return tag;
  })
  // Add the meta tags to the document head.
  .forEach(tag => document.head.appendChild(tag));

  next();
});






export default router
