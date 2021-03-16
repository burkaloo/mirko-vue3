<template>
  <div :style="'height:'+ spacer+'px;'">
    <nav class="navbar navbar-expand-sm navbar-light bg-pink navbar-fixed " :style="'top:'+totalTopmargin+ 'px;'">
      <div class="container">
        <div class="navbar-brand">
          <img src="./photos/mirko-logo.png" class="border border-black p-2" :style="navphoto" @click="$emit('page','home')">
        </div>

        <div v-if="open" class="w-100 cover" :style="'top:' + totalSpace +'px; height: calc(100vh - ' + totalSpace +'px);'" @click="close"></div>
        <div class="navbar-toggler hoverpointer border-0" @click="opennav">
          <span class="navbar-toggler-icon"></span>
        </div>

        <div v-show="open" :class="collapseClass" :style="'top: '+totalSpace+'px;'">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item ms-0 ms-sm-4 hoverpointer my-2 my-sm-0" @click="page('home')">
              <img src="./photos/home-icon.jpg" alt="" :style="navphoto" >
              <span class="d-inline d-sm-none ms-3">Home</span>
            </li>
            <li class="nav-item ms-0 ms-sm-4 hoverpointer my-2 my-sm-0" @click="page('cart')">
              <img src="./photos/cart-icon.png" class="p-2" alt="" :style="navphoto">
              <span class="d-inline d-sm-none ms-3">Cart</span>
              <span v-show="cartcount > 0" class="badge bg-secondary cart-badge">{{cartcount}}</span>
            </li>
            <li class="nav-item ms-0 ms-sm-4 hoverpointer my-2 my-sm-0" @click="page('prod')">
              <img src="./photos/bag-icon.png" class="p-2" alt="" :style="navphoto">
              <span class="d-inline d-sm-none ms-3">Shop Flow underwear</span>
            </li>
            <li class="nav-item ms-0 ms-sm-4 hoverpointer my-2 my-sm-0">
            <div class="dropdown">
              <div type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src="./photos/help-icon.png" alt="" :style="navphoto" class=" p-2 dropdown-toggle" >
                  <span class="d-inline d-sm-none ms-3">Customer Support</span>
              </div>
              <ul class="dropdown-menu dropdown-menu-sm-end bg-pink border-0 pe-3 pe-sm-0" aria-labelledby="dropdownMenuButton1">
                <li><div class="dropdown-item" @click="page('prod')">How it Works</div></li>
                <li><div class="dropdown-item" @click="page('about')">Our Commitment</div></li>
                <li><div class="dropdown-item" @click="page('help')">FAQ's</div></li>
              </ul>
            </div>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>


<script>
export default {
  name: 'navBar',
  props:{
    docscroll: Number,
    topmargin: Number,
    spacer: Number,
    logo: String,
    logoh:String,
    cartcount: Number
  },
  data(){
    return {
      open: false,
    }
  },
  watch:{
  },
  methods:{
    opennav(){
      this.open = !this.open
    },
    close(){
      this.open = false
    },
    page(page){
      this.close()
      this.$emit('page', page)
    }
  },
  computed:{
    collapseClass(){
      if(this.open){
        return "navbar-collapse navbar-collapse-vue bg-pink p-2"
      } else{
        return "navbar-collapse bg-pink"
      }
    },
    totalSpace(){
      if(this.docscroll < this.topmargin){
        return (parseInt(this.spacer) + parseInt(this.topmargin) )
      } else{
        return this.spacer
      }
    },
    totalTopmargin(){
      if(this.docscroll < this.topmargin){
        return this.topmargin
      } else{
        return 0
      }
    },
    navphoto(){
      return 'height: '+ this.logoh +'px; width: auto;'
    },
  },
}
</script>


<style>
  .navbar-collapse-vue{
    position: fixed;
    z-index: 5;
    left: 0;
    width: 100%
  }
  .navbar{
    position: fixed !important;
    z-index: 5;
    left: 0;
    right: 0;
  }
  .cover{
    position: fixed;
    left: 0;
    z-index: 4;
  }
  .cart-badge{
    position: relative;
    bottom:10px;
    right:20px;
  }
</style>
