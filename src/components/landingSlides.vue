<template>
  <div>
    <div class="d-lg-none" :style="{width: '100vw', height: 'calc(100vh - 66px)'}">
      <!-- Slide 1-->
      <div v-if="slide == 1" class="bg-pink2 h-100 w-100">
        <div class="bg-pink2 d-flex" :style="{height: '35%'}">
          <div class="align-self-center text-center flex-grow-1">
            <h4 class="font-didot py-5">Women. Essentials. Lifestyle.</h4>
            <p class="px-5">Reaffirming boldness and elegance in the everyday.</p>
          </div>
        </div>
        <img :src="backend + '/photos/landingpage-header.png'" alt="" :style="{height:'65%', width: '100%', objectFit: 'contain', objectPosition: 'bottom'}">
      </div>
      
      <!-- Slide 2-->
      <div v-if="slide == 2" class="bg-beige h-100 w-100" >
        <div class="d-flex" :style="{height: '40%'}">
          <div class="align-self-center text-center flex-grow-1">
            <p class="px-3">Mix and match your period essentials for maximum comfort and confidence.</p>
            <router-link to="/product/1" class="btn bg-babyblue mx-2 fw-6 px-4 py-2 rounded-5 mt-3">Shop Period Underwear</router-link>
            <router-link to="/product/2" class="btn bg-babyblue mx-2 fw-6 px-4 py-2 rounded-5 mt-3">Shop Menstral Cups</router-link>
          </div>
        </div>
        <img :src="backend + '/photos/landingpage-header2.png'" alt="" :style="{height:'60%', width: '100%', objectFit: 'contain', objectPosition: 'bottom'}">
      </div>
    </div>

    <div class="d-none d-lg-block" :style="{width: '100vw', height: '50vw', maxHeight: '600px'}">
      <!-- Slide 1-->
      <div v-if="slide == 1" class="bg-pink2 h-100 w-100">
        
        <div class="container d-flex h-100">
          <div class="w-50 h-100 text-end">
            <img :src="backend + '/photos/landingpage-header.png'" alt="" class="" :style="{height:'100%', width: 'auto'}"/>
          </div>
          <div class="w-50 h-100 d-flex">
            <div class="align-self-center text-center flex-grow-1">
              <h4 class="font-didot pb-3">Women. Essentials. Lifestyle.</h4>
              <div class="px-5 pb-0">Reaffirming boldness and</div>
              <div class="px-5 pb-0">elegance in the everyday.</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Slide 2-->
      <div v-if="slide == 2" class="bg-beige h-100 w-100" >
        <div class="container d-flex h-100">
          <div class="w-50 h-100">
            <img :src="backend + '/photos/landingpage-header2.png'" alt="" class="" :style="{height:'100%', width: 'auto'}"/>
          </div>
          <div class="d-flex w-50 h-100">
            <div class="flex-grow-1 text-center align-self-center">
              <h5 class="font-didot">Mix and match your period essentials for</h5>
              <h5 class="font-didot">maximum comfort and confidence.</h5>
              <div class="d-flex justify-content-center pt-5">
                <router-link to="/product/1" class="btn bg-babyblue mx-2 fw-6 px-4 py-2 rounded-5">Shop Period Underwear</router-link>
                <router-link to="/product/2" class="btn bg-babyblue mx-2 fw-6 px-4 py-2 rounded-5">Shop Menstral Cups</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>


<script>

export default {
  name: "landingSlides",
  props:{
    backend:{},
    slide:{default: 1}
  },
  data(){
    return {

    }
  }
}
</script>