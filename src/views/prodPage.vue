<template>
    <div>
      <div class="container mt-5">
        <div class="row">
          <div class="col-12 col-lg-6 col-xl-5 px-xl-4">
            <h1 class="header-font mb-3 d-lg-none">{{inview.title}}</h1>
            <photoShow :imgs="inview.imgs"/>
          </div>
          <div class="col-12 col-lg-6 col-xl-7 mt-5 mt-lg-0">
            <div class="">
              <h1 class="header-font d-none d-lg-block">{{inview.title}}</h1>
              <p class="avenir-black mt-2">{{inview.tagline}}</p>
              <p v-for="(point, pInd) in inview.points" class="mb-1" :key="pInd" v-html="point"></p>
            </div>
          </div>
          <div class="col-12 ps-lg-5">
            <div class="ps-lg-5">
              <itemSelect
                :baseprice="inview.baseprice"
                :variations="inview.variations"
                @addtocart="pushtitle"
                @optclick="optselect"
                @priceupdate="priceupdate"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center my-5">
          <div style="max-width: 300px; width:100%; height: 2px;" class="bg-black my-5"></div>
      </div>
      <div class="container pb-5">
          <sizeChart
            :title="inview.chart.title"
            :header="inview.chart.header"
            :body="inview.chart.body"
          />
      </div>
      <div class="container-fluid p-4 mt-5">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
          <div v-for="(card, cInd) in inview.cards" :key="cInd" class="col mx-auto mt-3">
            <img class="img-fluid" :src="card" alt="">
          </div>
        </div>
      </div>
    </div>

</template>

<script>

import sizeChart from '@/components/sizeChart.vue'
import itemSelect from '@/components/itemSelect.vue'
import photoShow from '@/components/photoShow.vue'
import productsjson from '@/assets/json/products.json'

export default {
  name: 'prodPage',
  components:{sizeChart,itemSelect,photoShow},
  props:{
    pid: {},
  },
  data(){
    return {
      prodlist: null,
      price: 0
    }
  },
  created(){
    this.prodlist = productsjson
  },
  methods:{
    pushtitle(data){
        data.push('Flow Underwear')
        //console.log(data)
        this.$emit('cartinput', data)
    },
    optselect(data){
      this.inview.variations[data[0]].selected = data[1]
    },
    priceupdate(data){
      this.price = data
    }
  },
  computed:{
    inview(){
      return this.prodlist[this.pid]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>




</style>
