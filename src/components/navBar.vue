<template>
  <div :style="'height:'+ spacer+'px;'">
    <nav class="navbar navbar-expand-md navbar-light bg-pink navbar-fixed " :style="'top:'+totalTopmargin+ 'px;'">
      <div class="container">
        <div class="navbar-brand">
          <img src="../assets/photos/mirko-logo.png" class="border border-2 border-black p-1" :style="navphoto" @click="$emit('page','home')">
        </div>

        <div v-if="open" class="w-100 cover" :style="'top:' + totalSpace +'px; height: calc(100vh - ' + totalSpace +'px);'" @click="close"></div>
        <div class="navbar-toggler hoverpointer border-0" @click="opennav">
          <span class="navbar-toggler-icon"></span>
        </div>

        <div v-show="open" :class="collapseClass" :style="'top: '+totalSpace+'px;'">
          <ul class="navbar-nav ms-auto mb-lg-0">
            <li class="nav-item ms-0 ms-md-4 pt-md-2 hoverpointer" @click="page('prod')">
              <!-- img src="../assets/photos/bag-icon.png" class="p-2" alt="" :style="navphoto" -->
              <h5 class="m-2">Shop</h5>
            </li>
            <li class="nav-item ms-0 ms-md-4 pt-md-2 hoverpointer">
              <div class="dropdown">
                <div type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    <!--img src="../assets/photos/help-icon.png" alt="" :style="navphoto" class=" p-2 dropdown-toggle" -->
                    <h5 class="m-2">Customer Care</h5>
                </div>
                <ul class="dropdown-menu dropdown-menu-sm-end bg-pink border-0 pe-3 pe-sm-0" aria-labelledby="dropdownMenuButton1">
                  <li><div class="dropdown-item" @click="page('about')">Our Commitment</div></li>
                  <li><div class="dropdown-item" @click="page('help')">FAQ</div></li>
                  <li><div class="dropdown-item" @click="page('contact')">Contact Mirko</div></li>
                </ul>
              </div>
            </li>
            <li class="nav-item ms-2 ms-md-3 hoverpointer my-sm-0" @click="page('cart')">
              <img src="../assets/photos/cart-icon.png" alt="" :style="navphoto" class="mt-1">
              <!--span class="d-inline d-sm-none ms-3">Cart</span-->
              <span v-show="cartcount > 0" class="badge bg-secondary cart-badge">{{cartcount}}</span>
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
      return 'height: '+ this.logoh +'px; width: auto; padding:10px'
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
