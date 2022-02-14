<template>
    <div>
      <div class="row g-0">
        <div class="col-6 col-lg-4">
          <div class="hero-pic" :style="{ backgroundImage: 'url('+backend+'/photos/hero-part1.jpg)', backgroundPosition: 'left top'}">
          </div>
        </div>
        <div class="col-6 col-lg-4">
          <div class="hero-pic" :style="{ backgroundImage: 'url('+backend+'/photos/hero-part2.jpg)', backgroundPosition: 'center'}">
          </div>
        </div>
        <div class="col-12 col-lg-4 bg-pink2 d-none d-lg-block">
          <div class="" :style="{height: '40%'}">
          </div>
          <div class="fw-600 fst-italic text-center">
            <p class="text-center fs-3 mb-5">Women. Essentials. Lifestyle.</p>
            <p class="text-center fs-5">Reaffirming boldness and</p>
            <p class="text-center fs-5">elegance in the everyday</p>
          </div>
        </div>
        <div class="bg-pink2 d-lg-none px-3">
          <div class="fs-4 fw-6 fst-italic mb-3 mt-4 text-center">Women. Essentials. Lifestyle.</div>
          <div class="fs-6 fw-4 fst-italic text-center">Reaffirming boldness and elegance in the everyday</div>
          <div class=" text-center my-5">
            <button class="btn btn-secondary" @click="$emit('page', {path: '/shop'})">Shop Now</button>
          </div>

          <div class="fs-3 mt-5 mb-3 text-center">Ease and elegance for women</div>
          <div class="text-center fw-3 fs-7 mb-5">Inspired by characteristics of Japanese minimalism, Mirko is all about giving women access to the barest but best essentials. We believe in first looking at what it is we truly need and deliberately choosing solutions that are simply beautiful, versatile, and long lasting so that they can be valuable space holders in our lives. </div>

          <div class="row row-cols-3 row-cols-sm-5 text-center mb-5">
            <div class="d-none d-sm-block col">
            </div>
            <div class="col">
              <img :src="backend +'/photos/mountain-icon.png'" class="icon-3">
            </div>
            <div class="col">
              <img :src="backend +'/photos/lady-icon.png'" alt="" class="icon-3">
            </div>
            <div class="col">
              <img :src="backend +'/photos/wave-icon.png'" alt="" class="icon-3">
            </div>
            <div class="d-none d-sm-block col">
            </div>
          </div>
        </div>
      </div>

      <!-- about section -->
      <div class="container py-5 d-none d-lg-block">
        <div class="text-center my-5 px-5">
          <div class="fs-3 fw-7 mt-5 mb-5text-center">Ease and elegance for women</div>
          <div class="text-center fw-5 fs-5 my-5 px-5">Inspired by characteristics of Japanese minimalism, Mirko is all about giving women access to the barest but best essentials. We believe in first looking at what it is we truly need and deliberately choosing solutions that are simply beautiful, versatile, and long lasting so that they can be valuable space holders in our lives. </div>
        </div>

        <div class="row row-cols-3 text-center py-5">
          <div class="col">
            <img :src="backend +'/photos/mountain-icon.png'" class="icon-3">
          </div>
          <div class="col">
            <img :src="backend +'/photos/lady-icon.png'" alt="" class="icon-3">
          </div>
          <div class="col">
            <img :src="backend +'/photos/wave-icon.png'" alt="" class="icon-3">
          </div>
        </div>
      </div>

      <!-- flow underwear section -->
      <div class="row row-cols-1 row-cols-md-2 g-0">
        <div class="">
          <div class="w-100" :style="{backgroundImage: 'url('+ backend + '/photos/section3.jpg)', backgroundSize: 'cover', backgroundPosition: 'top center', paddingTop: '120%', maxHeight: '100vh'}">
        </div>
        </div>
        <div class="d-flex bg-beige py-5 py-md-0">
          <div class="fst-italic text-center align-self-center flex-grow-1 py-5">
            <div class="mx-auto" :style="{maxWidth:'660px'}">
              <div class=""> <!-- word block -->
                <div class="fs-6 d-lg-none">
                  <div class="px-3"><span class="fw-7">Mirko's Flow Underwear</span> is the perfect period <span class="d-sm-none">companion designed to be your last layer of protection against leaks</span></div>
                  <div class="mx-auto px-2 d-none d-sm-block px-md-4 px-lg-2" :style="{maxWidth: '400px'}">companion designed to be your last layer of protection against leaks.</div>
                </div>
                <div class="fs-5 d-none d-lg-block">
                  <div class="px-3"><span class="fw-7">Mirko's Flow Underwear</span> is the perfect period</div>
                  <div class="mx-auto px-2 px-md-4 px-lg-2" :style="{maxWidth: '500px'}">companion designed to be your last layer of protection against leaks.</div>
                </div>
              </div>

              <div class="row row-cols-1 row-cols-sm-2 row-cols-md-1 row-cols-xl-2 g-0"> <!-- button block -->
                <div class="col text-center text-sm-end text-md-center text-xl-end mt-4 px-2">
                  <button class="btn btn-lg bg-babyblue fs-6 fw-7 rounded-5 d-lg-none" :style="{padding: '.7rem 1.5rem'}" @click="$emit('page', {path: '/product/1'})">Shop Flow Underwear</button>
                  <button class="btn btn-lg bg-babyblue fs-5 fw-7 rounded-5 d-none d-lg-inline-block" :style="{padding: '.7rem 1.5rem'}" @click="$emit('page', {path: '/product/1'})">Shop Flow Underwear</button>
                </div>
                <div class="col text-center text-sm-start text-md-center text-xl-start mt-4 px-2">
                  <button class="btn btn-lg bg-white fs-6 fw-7 rounded-5 d-lg-none" :style="{padding: '.7rem 3.8rem'}" @click="$emit('page', {path: '/learn/flow-underwear'})">Learn More</button>
                  <button class="btn btn-lg bg-white fs-5 fw-7 rounded-5 d-none d-lg-inline-block" :style="{padding: '.7rem 4.4rem'}" @click="$emit('page', {path: '/learn/flow-underwear'})">Learn More</button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <!-- mestrual cups section -->
      <section class="position-relative" >
        <div class="bgpic-cover bgpic-center-bottom" :style="{backgroundImage: 'url('+ backend +'/photos/section4.jpg)'}">
          <div class="d-sm-none" :style="{paddingTop: '80%'}"></div>
          <div class="d-none d-sm-block d-md-none" :style="{paddingTop: '65%'}"></div>
          <div class="d-none d-md-block d-lg-none" :style="{paddingTop: '80%'}"></div>
          <div class="d-none d-lg-block d-xl-none" :style="{height: '650px'}"></div>
          <div class="d-none d-xl-block d-xxl-none" :style="{height: '800px'}"></div>
          <div class="d-none d-xxl-block" :style="{height: '850px'}"></div>
        </div>
        <div class=" bg-pink2 text-center text-lg-start py-5 d-md-none"> <!-- sml to med text block -->
          <div class="fst-italic text-center mt-sm-5"> <!-- word block -->
            <div>Revolutionary. Advance. Economical.</div>
            <div>Make the switch to <span class="fw-7">Mirko Menstrual Cup.</span></div>
          </div>
          <div class="row g-0 row-cols-1 row-cols-sm-2 mb-sm-5"> <!-- button block -->
            <div class="col text-sm-end mt-4 px-2">
              <button class="btn btn-lg bg-babyblue fs-6 fw-7 rounded-5 d-lg-none" :style="{padding: '.7rem 1.5rem'}" @click="$emit('page', {path: '/product/2'})">Shop Mirko Cup</button>
              <button class="btn btn-lg bg-babyblue fs-5 fw-7 rounded-5 d-none d-lg-inline-block" :style="{padding: '.7rem 1.5rem'}" @click="$emit('page', {path: '/product/2'})">Shop Mirko Cup</button>
            </div>
            <div class="col text-sm-start mt-4 px-2">
              <button class="btn btn-lg bg-white fs-6 fw-7 rounded-5 d-lg-none" :style="{padding: '.7rem 2.5rem'}" @click="$emit('page', {path: '/learn/menstrual-cup'})">Learn More</button>
              <button class="btn btn-lg bg-white fs-5 fw-7 rounded-5 d-none d-lg-inline-block" :style="{padding: '.7rem 2.5rem'}" @click="$emit('page', {path: '/learn/menstrual-cup'})">Learn More</button>
            </div>
          </div>
        </div>

        <div class="position-absolute top-0 w-100 text-center text-lg-start d-none d-md-block"> <!-- med and up block -->
          <div class="d-none d-lg-inline-block ps-5 ms-5">
          </div>
          <div class="d-lg-inline-block ps-xl-5 ms-xl-5">
            <div class="fst-italic mt-5 pt-sm-5 px-lg-5 text-center"> <!-- word block -->
              <div class="fs-4">Revolutionary. Advance. Economical.</div>
              <div class="fs-4">Make the switch to <span class="fw-7">Mirko Menstrual Cup.</span></div>
            </div>

            <div class="row g-0 row-cols-2"> <!-- button block -->
              <div class="col mt-4 text-end">
                <button class="btn bg-babyblue fs-5 fw-7 rounded-5" :style="{padding: '.7rem 2rem'}" @click="$emit('page', {path: '/product/2'})">Shop Mirko Cup</button>
              </div>
              <div class="col mt-4 px-3 text-start">
                <button class="btn bg-white fs-5 fw-7 rounded-5" :style="{padding: '.7rem 3rem'}" @click="$emit('page', {path: '/learn/menstrual-cup'})">Learn More</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- tag phrase block on larger screens -->
      <section>
        <div class="container my-5 py-5 d-none d-md-block">
          <div class="px-5 fs-3 text-center my-5 py-5">
            With <span class="fw-7">Mirko</span>, we celebrate menstruation as a natural part of being a woman - something to fully embrace without the fear of judgement.
          </div>
        </div>
      </section>

      <!-- bundle block -->
      <!--section>
        <div class="row g-0">
          <div class="col-12 col-md-6 col-xxl-auto">
            <img class="img-fluid" :src="backend+ '/photos/section5.gif'">
          </div>
          <div class="col-12 col-md-6 col-xxl d-flex py-5 bg-beige">
            <div class="text-center align-self-center flex-grow-1 fst-italic py-5 d-lg-none">
              <div class="">
                Build your own
              </div>
              <div class="fw-7">
                Mirko Game Changer Bundle
              </div>
              <div class="">
                for a worry-free leak-free period.
              </div>
              <button class="btn bg-babyblue rounded-3 fw-7 mt-5" :style="{padding: '.7rem 2rem'}">I Want to Create A Bundle</button>
            </div>

            <div class="text-center align-self-center flex-grow-1 fst-italic py-5 fs-4 d-none d-lg-block">
              <div class="">
                Build your own
              </div>
              <div class="fw-7">
                Mirko Game Changer Bundle
              </div>
              <div class="">
                for a worry-free leak-free period.
              </div>
              <button class="btn bg-babyblue rounded-3 fw-7 mt-5 fs-5" :style="{padding: '.7rem 2rem'}">I Want to Create A Bundle</button>
            </div>
          </div>
        </div>
      </section-->

      <!-- tag phrase block on smaller screens -->
      <section>
        <div class="container my-5 py-5 d-md-none">
          <div class="px-5 fs-5 text-center my-5 py-5">
            With <span class="fw-7">Mirko</span>, we celebrate menstruation as a natural part of being a woman - something to fully embrace without the fear of judgement
          </div>
        </div>
      </section>

      <!-- featured on block -->
      <section class="bg-pink2 py-5">
        <div class="container py-5">
          <div class="text-center pb-5 px-5 fst-italic">
            <img class="featured-logo" :src="backend + '/photos/spot-logo.png'" alt=""/>
            <br><br><br><br><br>
            <div class="fs-6 d-md-none">"The sleek bikini cut and lightweight fabric would look great under a variety of bottoms, so you can feel dry and secure without having to limit your style choices."</div>
            <div class="fs-4 d-none d-md-block">"The sleek bikini cut and lightweight fabric would look great under a variety of bottoms, so you can feel dry and secure without having to limit your style choices."</div>
          </div>

          <hr class="mt-5">
          <div class="mb-5 pt-5 text-center fst-italic">
            <div class="fs-5 d-md-none">FEATURED ALSO ON</div>
            <div class="fs-3 d-none d-md-block">Featured also on</div>
          </div>

          <div class="row row-cols-3 text-center">
            <div class="col mt-5 px-4">
              <img class="featured-logo" :src="backend + '/photos/preen-logo.png'" alt=""/>
            </div>
            <div class="col mt-5 px-4">
              <img class="featured-logo" :src="backend + '/photos/cosmo-logo.png'" alt=""/>
            </div>
            <div class="col mt-5 px-4">
              <img class="featured-logo" :src="backend + '/photos/mypope-logo.png'" alt=""/>
            </div>
          </div>
        </div>
      </section>

    </div>

</template>

<script>
import urlMix from '@/mixin/urlMix.js'
export default {
  name: 'homePage',
  mixins:[urlMix],
  props:{
    backend:{}
  },
  data(){
    return{

    }
  },
  mounted(){
    this.$emit("load", true)
  },

}
</script>


<style scoped>


.icon-3{
  width: 50px;
  height: auto;
}

.hero-pic{
  background-repeat: no-repeat;
  background-size: cover;
  padding-top: 135%
}

.featured-logo{
  max-width: 140px;
  width: 100%;
  height: auto;
}

@media (min-width: 576px) {

}


@media (min-width: 768px) {

}


@media (min-width: 992px) {
  .hero-pic{
    height: calc(100vh - 101px);
    padding-top: 0
  }
  .icon-3{
    width: 85px;
  }
}


@media (min-width: 1200px) {}


@media (min-width: 1400px) {}



</style>
