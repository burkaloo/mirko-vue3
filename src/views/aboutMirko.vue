<template>
  <div class="">
    <section class="bg-white py-5 text-center">
      <img class="img-fluid px-5" :src="backend +'/photos/aboutus-section1.jpg'" alt="">
      <div class="text-center mx-auto p-5" :style="{maxWidth: '1000px'}">
        <div class="fw-6 fs-4 fst-italic mb-5">
          OUR COMMITMENT TO EVERY WOMAN
        </div>
        <div class="">
          Mirko seeks to be an innovative leader for women’s essentials - targeting basic needs with thoughtful solutions to improve women’s overall quality of life - without all the fuss. We promise to champion this movement in our daily lives as a women-led team and ensure that our solutions remain beneficial even for the generations of ladies to come.
        </div>
      </div>
    </section>

    <section class="bg-beige">
      <div class="container py-5">
        <div class="row px-5 row-cols-1 row-cols-lg-3 mb-5 pb-5">
          <div class="col d-flex pt-5 mt-5 px-4">
            <div class="text-center">
              <img class="icon" :src="backend+ '/photos/mountain-icon.png'" alt="">
              <div class="fs-5 fw-6 fst-italic my-4">
                TRUTH
              </div>
              <div class="">
                We strive to do everything with integrity - design and produce only quality essentials, communicate with transparency and holistic care, and advocate for collective sustainability. This is our basic building block.
              </div>
            </div>
          </div>
          <div class="col d-flex pt-5 mt-5 px-4">
            <div class="text-center">
              <img class="icon" :src="backend+ '/photos/lady-icon.png'" alt="">
              <div class="fs-5 fw-6 fst-italic my-4">
                BEAUTY
              </div>
              <div class="">
                Good design includes a consideration for beauty which to us is captured in simplicity. With a minimalist approach, we leave room for women to boldly let their natural, raw beauty shine through.
              </div>
            </div>
          </div>
          <div class="col d-flex pt-5 mt-5 px-4">
            <div class="text-center">
              <img class="icon" :src="backend+ '/photos/wave-icon.png'" alt="">
              <div class="fs-5 fw-6 fst-italic my-4">
                SEA
              </div>
              <div class="">
                Taking a few steps back from our front lines, we understand the importance of first honoring the life force inside women - the ever deep, ever flowing, and every changing spirit we align with the sea. As women grow and transform, so too will our openness to changing and innovating.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-pink2 py-5">
      <div class="container py-5 my-5" :style="{maxWidth: '960px'}">
        <div class="row">
          <div class="col d-flex">
            <div class="py-5 ps-3 ps-lg-5 mt-5 pe-3 text-center">
              "We decided to start the Mirko brand because we wanted to eliminate the hassle of getting leaks at home and in public. We wanted to create something that will improve women’s quality of life, without breaking the bank. Menstruation has never been an easy topic of conversation and we felt that the lack of discussion has led to slower innovation of sustainable period products. In the process, we realized how little options we had in the local market and how limited our knowledge is on reproductive health. By creating Mirko, we hope to break this taboo and start celebrating menstruation as a natural part of being a woman. We hope that one day, all women (even men), can freely talk about periods without fear of judgement."
            </div>
            <div class="d-none d-md-block" :style="{height: '100%', paddingLeft: '25%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'contain', backgroundImage: 'url('+backend+'/photos/aboutus-section3.png)'}">

            </div>
          </div>
        </div>
      </div>

    </section>
  </div>
  <!--div class="container mt-5 pt-5">
    <h4 class="text-center fw-bold my-5">ABOUT MIRKO</h4>
    <div class="row mt-5 pt-5 px-2">
      <div class="col-12">

      </div>
      <div class="col-12 col-lg-5">
        <div class="text-center">
          <img src="https://mirkophp.navitag.net/photos/pagegraphics/about-page.jpg" alt="" class="img-fluid">
        </div>
      </div>
      <div class="col-12 mt-5  mt-lg-0 col-lg-7">
        <p>Mirko is the brainchild of two full-time working women with the desire  for hassle -free periods.</p>
        <p>With constant visits to the washroom and checking for leaks and stains, we noticed how menstruation causes inconvenience and disruption at work. This is the reason we decided to create our very first product under Mirko - the Period Panties (now Mirko’s Flow Underwear) - designed to keep women feeling secure all day long without the bulky feeling.</p>
        <p>We also discovered few options for sustainable period essentials in the Philippines and limited collective information on menstruation in contrast to western countries. This motivated our full commitment to breaking this taboo in Asian culture.</p>
      </div>
      <div class="col-12">

      </div>
    </div>

    <div class="px-2 pb-5">

      <h4 class="text-center fw-bold my-5">OUR COMMITMENT TO EVERY WOMAN</h4>
      <p class="">Mirko seeks to be an innovative leader for women’s essentials - targeting basic needs with thoughtful solutions to improve women’s overall quality of life - without all the fuss. We promise to champion this movement in our daily lives as a women-led team and ensure that our solutions remain beneficial even for the generations of ladies to come.</p>
    </div>

    <div class="row px-2 pt-0">
      <div class="col-12 col-md-6 col-lg-4 px-md-4">
        <h4 class="header-font fw-normal text-center my-5">TRUTH</h4>
        <p>We strive to do everything with integrity - design and produce only quality essentials, communicate with transparency and holistic care, and advocate for collective sustainability. This is our basic building block.</p>
      </div>
      <div class="col-12 col-md-6 col-lg-4 px-md-4">
        <h4 class="header-font fw-normal text-center my-5">BEAUTY</h4>
        <p>Good design includes a consideration for beauty which to us is captured in simplicity. With a minimalist approach, we leave room for women to boldly let their natural, raw beauty shine through.</p>
      </div>
      <div class="col-12 col-md-12 col-lg-4 px-md-5 px-lg-4">
        <h4 class="header-font fw-normal text-center my-5">SEA</h4>
        <p>Taking a few steps back from our front lines, we understand the importance of first honoring the life force inside women - the ever deep, ever flowing, and every changing spirit we align with the sea. As women grow and transform, so too will our openness to changing and innovating.</p>
      </div>
    </div>
  </div-->
</template>


<script>
export default {
  name: 'aboutMirko',
  props:{
    backend:{}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.icon{
  max-width: 86px;
  height: auto;
}
</style>
