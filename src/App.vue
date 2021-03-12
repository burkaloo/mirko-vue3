<template>
  <div class="bg-light" id="app">
    <div>help</div>
    <navBar :docscroll="docscroll" topmargin="28"/>

    <div class="container my-5">
      <section>
      <div class="container">
        <div class="row ">
          <div class="col-12 col-lg-6">
          </div>
          <div class="col-12 col-lg-6 mt-5 mt-lg-0">
            <h1>Period Underwear</h1>
            <h2 class="mt-4 text-green font-weight-bold"><s class="pesosign"></s> {{scPrice}}</h2>
            <p class=" mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <div v-for="(vObj, vTitle) in showcase.variations" class="my-4" :key="vTitle">
              <h5 class="text-green">{{vTitle}}</h5>
              <div>
                <button v-for="(opt, optInd) in vObj.options"
                  :class="vObj.selected == optInd ? 'btn border border-pink bg-pink mx-2' : 'btn border mx-2'"
                  @click="optselect(vTitle, optInd)"
                  :key="optInd"
                >
                  {{opt}}
                </button>
              </div>
            </div>
            <div>
              <h5 class="d-inline-block">Quanty:</h5>
              <div class="d-inline-block">
                <button class="btn" @click="addqty(1, true)"> <i class="lnr lnr-circle-minus"></i> </button>
                <p class="mb-0 mx-2 d-inline-block" style="width: 22px">{{showcase.qty}}</p>
                <button class="btn" @click="addqty(1)"> <i class="lnr lnr-plus-circle"></i> </button>
              </div>
            </div>
            <div class="pt-5">
              <button class="btn btn-lg btn-block bg-pink">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </section>

      <sizeChart/>
    </div>
  </div>
</template>

<script>
import sizeChart from './components/sizeChart.vue'
import navBar from './components/navBar.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

require('./assets/styles/main.css')

export default {
  name: 'app',
  components: {
    sizeChart, navBar,
  },
  data(){
    return{
      docscroll:0,
      showcase:{
        title: "Period Underwear",
        baseprice: 250,
        qty:1,
        variations:{
        Size:{
          selected:0,
          options:['S', 'M', 'L', 'XL'],
          pricediff:[0, 0, 0, 0],
          stock:[7,7,7,7]
        },
        "Pack Assortment":{
          selected:0,
          options:["Singles", "Pack of 3"],
          pricediff:[0, 425],
          stock:[6,10]
        }
      }
      }
    }
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll)
  },
  beforeUmount() {
    window.removeEventListener("scroll", this.onScroll)
  },
  methods:{
    onScroll() {
      this.docscroll = document.documentElement.scrollTop
    },
    addqty(num, nega = false){
      if(nega){
        if(this.showcase.qty > 1){
          this.showcase.qty -= num
        }
      } else{
        //add
        this.showcase.qty += num
      }
    },
    optselect(vTitle, optInd){
      this.showcase.variations[vTitle].selected = optInd
    }
  },
  computed:{
    scItemPrice(){
      let base = this.showcase.baseprice
      let opts = Object.values(this.showcase.variations)
      for (var i = 0; i < opts.length; i++) {
        base += opts[i].pricediff[opts[i].selected]
      }
      return base
    },
    scPrice(){
      return this.scItemPrice * this.showcase.qty
    },
  }
}
</script>
