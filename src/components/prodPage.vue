<template>
    <div>
        <div class="container">
          <div class="row">
            <div class="col-12 col-lg-6 px-xl-4">
              <h1 class="header-font mb-3 d-lg-none">Flow Underwear</h1>
              <photoShow :imgs="imgs"/>
            </div>
            <div class="col-12 col-lg-6 mt-5 mt-lg-0">
              <h1 class="header-font d-none d-lg-block">Flow Underwear</h1>
              <p class="fw-bold mt-2">Designed to be your last layer of protection against leaks during flow days.</p>
              <p class="mb-1">- Smooth polyester spandex</p>
              <p class="mb-1">- Leak-proof lining (absorbs up to 8-10ml)</p>
              <p class="mb-1">- Machine-washable (note: avoid heat)</p>
              <itemSelect @addtocart="pushtitle"/>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-center my-5">
            <div style="max-width: 300px; width:100%; height: 2px;" class="bg-black my-5"></div>
        </div>

        <div class="container pb-5">
            <sizeChart/>
        </div>
        <div class="container-fluid p-4 mt-5">
          <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
            <div class="col mx-auto mt-3">
              <img class="img-fluid" src="./photos/cards-6.jpg" alt="">
            </div>
            <div class="col mx-auto mt-3">
              <img class="img-fluid" src="./photos/cards-7.jpg" alt="">
            </div>
            <div class="col mx-auto mt-3">
              <img class="img-fluid" src="./photos/cards-8.jpg" alt="">
            </div>
            <div class="col mx-auto d-lg-none d-xl-block mt-3">
              <img class="img-fluid" src="./photos/cards-9.jpg" alt="">
            </div>
          </div>
        </div>
    </div>

</template>

<script>
import img1 from "./photos/prod-1.jpg"
import img2 from "./photos/prod-2.jpg"
import img3 from "./photos/prod-3.jpg"
import img4 from "./photos/prod-4.jpg"
import img5 from "./photos/prod-5.jpg"

import sizeChart from './sizeChart.vue'
import itemSelect from './itemSelect.vue'
import photoShow from './photoShow.vue'

export default {
  name: 'prodPage',
  data(){
    return{
      imgs: [img1, img2, img3, img4, img5],
      imgfocus: 0,
    }
  },
  methods:{
    pushtitle(data){
        data.push('Flow Underwear')
        console.log(data)
        this.$emit('cartinput', data)
    }
  },
  components:{sizeChart,itemSelect,photoShow}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
