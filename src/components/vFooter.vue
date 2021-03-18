<template>
  <div>
  <div class="bg-pink my-5">
    <br><br>
  </div>
  <div class="container">
    <div class="row row-cols-xl-3">
      <div class="col-12 col-md-6 order-md-3">
        <img src="./photos/b-mnl.png" class="b-mnl" alt="">
        <h4>★★★★★</h4>
        <p class="fw-bold mt-4">
          “Mirko’s period underwear is such a great find! The fit is perfect, snug, with good support, but it doesn’t feel tight nor restrictive. The design is like a bodysuit, it hugs the hips, keeps the sanitary napkin in place, and so is ideal to prevent leakage. It’s very comfortable!”
        </p>
      </div>
      <div class="col-6 col-md-3 mt-4 order-md-1">
        <h5 class="header-font">
          Mirko Social Accounts
        </h5>
        <div class="d-flex mt-4">
          <a href="https://www.facebook.com/MirkoPH/" target="_blank" class="d-block m-1"><img class="thumb-sm d-inline me-3" src="./photos/fb-icon.png" alt=""></a>
          <a href="https://instagram.com/mirko_ph?igshid=1ec8afvt815sh" target="_blank" class="d-block m-1"><img class="thumb-sm d-inline" src="./photos/ig-icon.png" alt=""></a>
        </div>
      </div>
      <div class="col-6 col-md-3 mt-4 order-md-2">
        <h5 class="header-font mb-4">Quick Links</h5>
        <p class="hoverpointer" @click="$emit('page', 'about')">About Mirko</p>
        <p class="hoverpointer" @click="$emit('page', 'help')">Help</p>
        <p class="hoverpointer" @click="$emit('page', 'contact')">Contact Us</p>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'vFooter',

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

p{
  font-size: 13px;
}

h5{
  font-size: 16px;
}

.b-mnl{
  width: 45%;
  height: auto;
}
</style>
