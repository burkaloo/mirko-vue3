<template>
  <div :style="'height:'+ spacer+'px;'">
    <nav class="position-fixed top-0 vw-100 overflow-hidden">
      <div class="d-flex px-3 py-2 w-100 bg-white" :style="{marginTop: totalTopmargin+ 'px'}">
        <div class="">
          <img src="../assets/photos/mirko-logo.png" class="p-1 hoverpointer navphoto" @click="$emit('page',{name: 'home'})">
        </div>

        <div v-for="(link, Ind) in navlinks" class="nav-item align-self-center text-center" :key="'lg-' + link">
          <div class="hover-bold hoverpointer" @click="navlinkcallback(link, Ind)">{{link}}
          </div>
        </div>

        <div class="flex-grow-1">
        </div>

        <div v-if="!oncheckoutroute" class=" align-self-center text-end pe-2" :style="{width: '120px'}">
          <i class="lnr lnr-menu fs-1 d-md-none align-middle me-4 hoverpointer hover-bold" @click="open = !open"></i>

          <div class="d-inline align-bottom position-relative" @click="itemcallback('cart')">
            <i class="lnr lnr-cart fs-1 hoverpointer hover-bold"></i>
            <span v-show="cartcount > 0" class="badge cart-badge">{{cartcount}}</span>
          </div>
        </div>
      </div>

      <!-- mobile menu -->
      <div v-if="open" class="d-md-none" :style="{height: 'calc( 100vh - ' + (totalTopmargin + spacer)  + 'px)'}" >
        <div class="bg-white px-4 border-top py-2">
          <div v-for="link in navlinks" :key="link" class="py-2 fs-5">
            <div @click="mnavlinkcallback(link)" class="hover-bold hoverpointer">{{link}}</div>
            <div v-if="link in submenu && submenu[link].mopen">
              <div v-for="sub in submenu[link].menu" class="fs-6 px-2 mt-2 hover-bold hoverpointer" :key="sub" @click="itemcallback(link + '-' + sub)">
                {{sub}}
              </div>
            </div>
          </div>
        </div>
        <div class="vh-100 100wh" @click="open = false">
        </div>
      </div>

      <!-- drop down  on larger screens-->
      <transition name="fromtop">
        <div v-if="ddopen" class="d-none d-md-block bg-white pe-3 pt-4 pb-3 border-bottom" :style="{paddingLeft: submenu[ddopen].pad}">
          <div class="fs-6 fw-7 mb-3">{{submenu[ddopen].title}}</div>
          <div v-for="sub in submenu[ddopen].menu" class="mb-2 hoverpointer" :key="sub" @click="this.itemcallback(ddopen + '-' + sub)"><i class="lnr lnr-chevron-right fs-6"></i> {{sub}}</div>
        </div>
      </transition>
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
    cartcount: Number
  },
  data(){
    return {
      open: false,
      searchshow: false,
      searchinput: "",
      navlinks:["Shop", "Learn", "About Us", "FAQs"],
      ddopen: false,
      submenu:{
        "Learn" :{pad:'223px', title: "Learn more about Mirko", menu : ["Flow Underwear", "Menstral Cups"], mopen: false}
      }
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
    mnavlinkcallback(link){
      if(link in this.submenu){
        this.submenu[link].mopen = !this.submenu[link].mopen
      } else{
        this.open = false
        let subs = Object.values(this.submenu)
        subs.forEach((item) => {item.mopen = false} );
        this.itemcallback(link)
      }
    },
    navlinkcallback(link){
      if(this.ddopen == link){
        this.ddopen = false
      } else{
        if(link in this.submenu){
         this.ddopen = link
        } else{
         this.ddopen = false
        }
        this.itemcallback(link)
      }
    },
    opennav(){
      this.open = !this.open
    },
    close(){
      this.open = false
    },
    itemcallback(item){
      let subs = Object.values(this.submenu)
      switch (item) {
        case 'cart':
          this.$emit('page', 'cart')
          break;
        case 'Shop':
          this.$emit('page', {path:'/shop'})
          break;
        case 'About Us':
          this.$emit('page', {path:'/about'})
          break;
        case 'Learn-Flow Underwear':
          this.$emit('page', {path:'/learn/flow-underwear'})
          this.ddopen = false
          subs.forEach((item) => {item.mopen = false} );
          break;
        case 'Learn-Menstral Cups':
          this.$emit('page', {path:'/learn/menstral-cup'})
          this.ddopen = false
          subs.forEach((item) => {item.mopen = false} );
          break;
        case 'FAQs':
          this.$emit('page', {path:'/help'})
          break;
        default:
          console.log(item)
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
        return Number(this.topmargin)
      } else{
        return 0
      }
    },
    onshoproute(){
      if(this.$route.path == '/shop'){
        return true
      } else{
        return false
      }
    },
    oncheckoutroute(){
      if(this.$route.path == '/checkout'){
        return true
      } else{
        return false
      }
    }
  },
}
</script>


<style scoped>
  .cover{
    position: fixed;
    left: 0;
    z-index: 4;
  }
  .cart-badge{
    padding: 5px !important;
    position: absolute;
    top:0;
    right:10px;
    margin-top: -25px;
    background-color: white;
    color: black;
  }
  .endicons{
    max-height: 35px;
    max-width: 35px;
  }
  .pt-lowered{
    padding-top: 30px !important;
  }
  input{
    line-height: 5px;
    padding: none;
  }
  .nav-item{
    font-size: 1.25rem;
    width: 120px;
    display: none;
  }

  .navphoto{
    height: 50px;
    width: auto;
  }

  nav{
    z-index: 10;
  }


@media (min-width: 768px) {
  .nav-item{
    display: block;
    position: relative;
  }

  .dditem{
    inline-size: max-content;
  }
}
</style>
