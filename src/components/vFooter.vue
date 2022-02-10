<template>
  <section class="bg-grey">
    <div class="container py-3">
      <div class="row">
        <div class="col-12 d-sm-none">
          <div v-for="(row, ind)  in links_smallest" :key="ind" class="d-flex justify-content-center mb-3">
            <div v-for="item in row" :key="item" class="footer-links">
              <span class="hoverpointer" @click="itemcallback(item)">
                {{item}}
              </span>
            </div>
          </div>
        </div>

        <div class="col-12 d-none d-sm-block d-md-none">
          <div v-for="(row, ind)  in links_small" :key="'sm'+ind" class="d-flex justify-content-center mb-3">
            <div v-for="item in row" :key="item" class="footer-links">
              <span class="hoverpointer" @click="itemcallback(item)">
                {{item}}
              </span>
            </div>
          </div>
        </div>

        <div class="col-12 d-none d-md-block">
          <div v-for="(row, ind)  in links_med" :key="'md'+ind" class="d-flex justify-content-center mb-3">
            <div v-for="item in row" :key="item" class="footer-links">
              <span class="hoverpointer" @click="itemcallback(item)">
                {{item}}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="px-3 py-2 fw-6 text-center">
      Mirko PH™ 2022
    </div>
  </section>
</template>

<script>

import urlMix from '@/mixin/urlMix.js'

export default {
  name: 'vFooter',
  mixins:[urlMix],
  data(){
    return{
      links: ["Home" ,"Shop", "About Us", "FAQs"]
    }
  },
  methods:{
    itemcallback(item){
      switch (item) {
        case 'Home':
        this.$router.push({path:'/'})
          break;
        case 'Shop':
        this.$router.push({path:'/shop'})
          break;
        case 'About Us':
        this.$router.push({path:'/about'})
          break;
        case 'FAQs':
        this.$router.push({path:'/help'})
          break;
        default:
          console.log(item)
      }
    }
  },
  computed:{
    links_smallest(){
      let ret = [], i,j, chunk = 3;
      for (i = 0,j = this.links.length; i < j; i += chunk) {
          ret.push(this.links.slice(i, i + chunk))
      }
      return ret
    },
    links_small(){
      let ret = [], i,j, chunk = 4;
      for (i = 0,j = this.links.length; i < j; i += chunk) {
          ret.push(this.links.slice(i, i + chunk))
      }
      return ret
    },
    links_med(){
      return [this.links]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.footer-links{
  border-right: solid 2px;
  min-width: 100px;
  text-align: center;
}

.footer-links:last-child{
  border: none !important;
}

</style>
