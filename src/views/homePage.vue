<template>
    <div>
      <div class=" text-center">
        <div class="mx-auto d-md-none">
            <img class="img-fluid" style="" src="../assets/photos/hero.jpg" alt="">
        </div>
        <div class="d-none d-md-block container mt-5">
          <div class="mx-auto">
              <img class="img-fluid" style="" src="../assets/photos/hero.jpg" alt="">
          </div>
        </div>
      </div>

      <div class="container">
        <div class="d-flex justify-content-center mt-5 mb-5">
            <div style="width:100%; height: 1px;" class=" d-none d-md-block bg-black my-5"></div>
        </div>

        <div class="text-center">
          <h4 class="fw-bold">THE ESSENTIALS</h4>
        </div>

        <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3">
          <div v-for="(feat, fInd) in featured" class="col p-3" :key="fInd">
            <div class="border p-2 hoverpointer" @click="featuredlink(feat.id)">
              <img :src="feat.thumb" class="img-fluid" alt="">
              <p class="text-center mt-4" >{{feat.name}}</p>
              <h5 class="text-center mt-3">PHP {{feat.price}}</h5>
            </div>
          </div>
          <div class="col p-3 d-none d-sm-block d-lg-none">
            <div class="border p-2 h-100">
              <img src="https://mirkophp.navitag.net/photos/pagegraphics/comming-soon.jpg" class="img-fluid" alt="">
              <h5 class="text-center mt-4">Comming Soon</h5>
              <h5 class="text-center mt-3"></h5>
            </div>
          </div>
        </div>

        <div class="d-flex justify-content-center my-5">
            <div style="width:100%; height: 1px;" class="d-none d-md-block bg-black my-5"></div>
        </div>

        <br><br>

        <div class=" text-center">
          <h4>Ease and elegance for women</h4>
          <p>Inspired by characteristics of Japanese minimalism, Mirko is all about giving women access to the barest but best essentials. We believe in first looking at what it is we truly need and deliberately choosing solutions that are simply beautiful, versatile, and long lasting so that they can be valuable space holders in our lives. </p>
          <p class="hoverpointer" @click="$emit('page', {path: '/about'})">Learn More</p>
        </div>

        <br><br><br>

        <div class="row row-cols-1 row-cols-sm-3 row-cols-md-4">
          <div class="col-sm-12 col-md mt-5 mt-md-3 px-2">
            <h4 class="text-center mt-sm-5">AS SEEN ON</h4>
          </div>
          <div class="col mt-5 px-4">
            <img src="https://mirkophp.navitag.net/photos/pagegraphics/Preen.png" class="img-fluid hoverpointer" alt="" @click="newtab('https://preen.ph/98534/not-ready-for-menstrual-cups-give-period-panties-a-try')">
          </div>
          <div class="col mt-5 px-4">
            <img src="https://mirkophp.navitag.net/photos/pagegraphics/Cosmopolitan.png" class="img-fluid hoverpointer" alt="" @click="newtab('https://www.cosmo.ph/health/i-tried-period-panties-for-the-first-time-a955-20180310')">
          </div>
          <div class="col mt-5 px-4">
            <img src="https://mirkophp.navitag.net/photos/pagegraphics/MyPopePH.png" class="img-fluid hoverpointer" alt="" @click="newtab('https://www.mypope.com.ph/3-sustainable-alternatives-to-menstrual-pads/')">
          </div>
        </div>

        <div class="row">
          <div class="col">
            <img src="" class="img-fluid" alt="">
          </div>

        </div>

      </div>
    </div>

</template>

<script>
import urlMix from '@/mixin/urlMix.js'
const axios = require('axios');
export default {
  name: 'homePage',
  mixins:[urlMix],
  props:{
    backend:{}
  },
  data(){
    return{
      featured:[]
    }
  },
  created(){
  },
  mounted(){
    this.$emit("load", true)
    let comp = this
    axios.post(
      this.backend,
      {statement: "getfeatured"}
    ).then(function(res){
      if(res.data.status == "success"){
        res.data.response.forEach((prod) => {
          let featobj = {
            id: prod.id,
            thumb: prod.thumb
          }
          if(prod.name != null || prod.optindex != null){
            let opts = JSON.parse(prod.options)
            let pricediffs = JSON.parse(prod.pricediff)
            featobj.name = prod.title + " - " + opts[parseInt(prod.optindex) -1]
            featobj.price = parseInt(prod.baseprice) + pricediffs[parseInt(prod.optindex) - 1]
          } else {
            featobj.name = prod.title
            featobj.price = prod.baseprice
          }

          comp.featured.push(featobj)
        });
        comp.$emit("load", false)
      }

    })
  },
  methods:{
    featuredlink(pid){
      //this.$router.push(page)
      this.$emit('page', {path: `/product/${pid}` })
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
