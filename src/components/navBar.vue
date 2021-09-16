<template>
  <div :style="'height:'+ spacer+'px;'">
    <nav class="navbar navbar-expand-md navbar-fixed navbar-light bg-white" :style="'top:'+totalTopmargin+ 'px;'">

      <div class="container-md">
        <div class="navbar-brand pt-2">
          <img src="../assets/photos/mirko-logo.png" class="p-1 hoverpointer" :style="navphoto" @click="$emit('page',{name: 'home'})">
        </div>

        <div v-if="open" class="w-100 cover" :style="'top:' + totalSpace +'px; height: calc(100vh - ' + totalSpace +'px);'" @click="close"></div>
        <div class="navbar-toggler hoverpointer border-0" @click="opennav">
          <span class="navbar-toggler-icon"></span>
        </div>

        <div v-show="open" :class="collapseClass" :style="'top: '+totalSpace+'px;'">
          <ul class="navbar-nav me-auto mb-lg-0 pt-2">
            <li class="nav-item ms-0 ms-md-4 px-3 pt-1 hoverpointer hoverbg-pink rounded">
              <h5 @click="page({path: '/shop'})">Shop</h5>
            </li>
            <li class="nav-item ms-0 ms-md-4 hoverpointer px-3 pt-1 hoverbg-pink rounded">
              <h5 @click="page({path: '/about'})">About</h5>
            </li>
          </ul>
          <ul class="navbar-nav">
            <li v-if="!onshoproute" class="nav-item ms-0 px-3 hoverpointer my-sm-0 pt-2 pb-1 hoverbg-pink rounded">
              <div v-if="searchshow">
                <input type="text" class="me-3" placeholder="search products" v-model.trim="searchinput" @keyup.enter="linksearch">
                <img src="../assets/photos/search.png" alt="" class="endicons pb-2" @click="togglesearch">
              </div>
              <div v-else @click="togglesearch">
                <h5 v-if="!searchshow" class="me-3 d-inline d-md-none mb-0">Search</h5>
                <img src="../assets/photos/search.png" alt="" class="endicons pb-2">
              </div>

            </li>
            <li class="nav-item ms-0 px-3 hoverpointer my-sm-0 pt-2 hoverbg-pink rounded" @click="page('cart')">
              <h5 class="me-3 d-inline d-md-none mb-0">Cart</h5>
              <img src="../assets/photos/bag.png" alt="" class="endicons pb-2">
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
    logoh:{default: 50},
    cartcount: Number
  },
  data(){
    return {
      open: false,
      searchshow: false,
      searchinput: ""
    }
  },
  watch:{
    open(newval){
      if(newval){
        this.searchshow = false
      }
    }
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
    },
    togglesearch(){
      this.searchshow = !this.searchshow
    },
    linksearch(){
      if(this.searchinput.length >3){
        this.page({ path: '/shop', query: { search: this.searchinput } })
      } else{
        this.$emit('alert', {show: true, class: 'warning', text: "Search word too short"});
      }
    }
  },
  computed:{
    collapseClass(){
      if(this.open){
        return "navbar-collapse navbar-collapse-vue p-2 bg-white"
      } else{
        return "navbar-collapse bg-white"
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
    onshoproute(){
      if(this.$route.path == '/shop'){
        return true
      } else{
        return false
      }
    }
  },
}
</script>


<style scoped>
  .navbar-collapse-vue{
    position: fixed;
    z-index: 5;
    left: 0;
    width: 100%;
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
    padding: 5px !important;
    position: relative;
    top:10px;
    right:10px;
    //border-radius: 45%
  }
  .endicons{
    max-height: 30px;
    max-width: 30px;
  }
  .pt-lowered{
    padding-top: 30px !important;
  }
  input{
    line-height: 5px;
    padding: none;
  }
</style>
