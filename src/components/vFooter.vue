<template>
  <div class="wrapper">
    <div class="options">
      <div class="container ">
        <div class="row text-center">
          <div class="col-0 col-lg-3 col-xl">
            <span></span>
          </div>
          <div class="col-4 col-sm-2 col-lg-1 col-xl-2">
            <span class="hoverpointer" @click="$emit('page', {path:'/about'})">About</span>
          </div>
          <div class="col-4 col-sm-2 col-lg-1 col-xl-2 hoverpointer">
            <span class="hoverpointer" @click="$emit('page', {path:'/help'})">FAQ</span>
          </div>
          <div class="col-4 col-sm-3 col-lg-2 col-xl-2">
            <span class="hoverpointer" @click="$emit('page', {path:'/help'})">
              Return Policy</span>
          </div>
          <div class="col-7 col-sm-3 col-lg-2 col-xl-2 mt-4 mt-sm-0">
            <span class="hoverpointer" @click="$emit('page', {path:'/contact'})">
              Contact Us
            </span>
          </div>
          <div class="col-5 col-sm-2 col-lg-1 col-xl-2 mt-4 mt-sm-0 d-flex">
            <img src="https://mirkophp.navitag.net/photos/pagegraphics/fb-icon.png" class="mx-1 img-fluid icon hoverpointer" alt="" @click="redirect('https://www.facebook.com/MirkoPH')">
            <img src="https://mirkophp.navitag.net/photos/pagegraphics/ig-icon.png" class="mx-1 img-fluid icon hoverpointer" alt="" @click="redirect('https://www.instagram.com/mirko_ph')">
          </div>
          <div class="col-0 col-lg-2 col-xl">
            <span></span>
          </div>
        </div>
      </div>
    </div>

    <div class="main hoverpointer" :style="{paddingTop:'12%', height: heightpx, backgroundImage: 'url(' + require('@/assets/photos/footer.png') + ')' }"></div>
  </div>
</template>

<script>

export default {
  name: 'vFooter',
  data(){
    return{
      height: 0
    }
  },
  mounted(){
    this.updateheight()
    window.addEventListener('resize', this.updateheight);
  },
  methods:{
    updateheight(){
      this.height = window.innerWidth *.35
    },
    redirect(url){
      window.location.href = url
    }
  },
  computed:{
    heightpx(){
      return this.height.toString() + 'px'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main{
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: cover;
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 0;
  right:0;
}

.options{
  padding-bottom: 20vw;
  position: relative;
  z-index: 2;
}

.wrapper{
  position: relative;
  margin-top: 15vw;
}

.icon{
  max-width: 25px;
  max-height: 25px;
}

</style>
