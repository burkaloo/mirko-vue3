<template>
    <div>
      <div class=" text-center">
        <div class="mx-auto d-md-none">
            <img class="img-fluid" style="" src="./photos/hero.jpg" alt="">
        </div>
        <div class="d-none d-md-block container mt-5">
          <div class="mx-auto">
              <img class="img-fluid" style="" src="./photos/hero.jpg" alt="">
          </div>
        </div>
      </div>


      <div class="container">
        <div class="d-flex justify-content-center mt-5 mb-5">
            <div style="width:100%; height: 1px;" class=" d-none d-md-block bg-black my-5"></div>
        </div>
        <div class="text-center">
          <h6 class="d-md-none px-3 mx-auto">
            Inspired by characteristics of Japanese minimalism, <span class="avenir-black">mirko</span> is all about going back to the bare essentials. In every woman lives the spirit of the sea - there is grace but also such depth and mystery. Through <span class="avenir-black">mirko</span>, we believe everyone can boldly express her own deep truth and highlight what it means to be beautiful in the rawest form. Our icon of the woman in kimono hereby represents every enigmatic spirit to whom this brand is dedicated.
          </h6>
          <h6 class="d-none d-md-block w-75 mx-auto">
            Inspired by characteristics of Japanese minimalism, <span class="avenir-black">mirko</span> is all about going back to the bare essentials. In every woman lives the spirit of the sea - there is grace but also such depth and mystery. Through <span class="avenir-black">mirko</span>, we believe everyone can boldly express her own deep truth and highlight what it means to be beautiful in the rawest form. Our icon of the woman in kimono hereby represents every enigmatic spirit to whom this brand is dedicated.
          </h6>
        </div>
        <div class="d-flex justify-content-center my-5">
            <div style="width:100%; height: 1px;" class="d-none d-md-block bg-black my-5"></div>
        </div>
        <div class="row row-cols-1 row-cols-sm-2">
          <div class="col px-3 px-md-5 mb-5">
            <div style="max-width:450px;" class="mx-auto">
              <img src="./photos/select-1.jpg" class="img-fluid hoverpointer"  alt="" @click="$emit('page', 'prod')">
              <div class="text-start mt-2">
                  <h5 class="ms-2 header-font">Flow Underwear</h5>
              </div>
            </div>
          </div>
          <div class="col px-3 px-md-5">
            <div style="max-width:450px;" class="mx-auto">
              <img src="./photos/select-2.jpg" class="img-fluid"  alt="">
              <div class="text-start mt-2">
                  <h5 class="ms-2 header-font">Coming Soon</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

</template>

<script>
export default {
  name: 'homePage',

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
