<template>
  <div :style="'height:'+ spacer+'px;'">
    <nav class="position-fixed top-0 vw-100 overflow-hidden">
      <div class="d-flex px-3 py-2 w-100 bg-white" :style="{marginTop: totalTopmargin+ 'px'}">
        <router-link class="">
          <img src="../assets/photos/mirko-logo.png" class="p-1 hoverpointer navphoto" @click="$emit('page',{name: 'home'})">
        </router-link>

        <div v-for="(link, Ind) in navlinks" class="nav-item align-self-center text-center" :key="'lg-' + link">
          <div v-if="link in submenu" class="hover-bold hoverpointer" @click="navlinkcallback(link, Ind)">
            {{link}}
          </div>
          <router-link v-else :to="hrefs[link]" class="hover-bold" @click="close()">{{link}}</router-link>
        </div>

        <div class="flex-grow-1">
        </div>


        <!-- cart and menu icons -->
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

            <div v-if="link in submenu" @click="mnavlinkcallback(link)" class="hoverpointer hover-bold">{{link}}</div>
            <router-link v-else :to="hrefs[link]" class="hover-bold" @click="close">{{link}}</router-link>

            <div v-if="link in submenu && submenu[link].mopen" class="pt-3">
              <router-link v-for="sub in submenu[link].menu" class="fs-6 px-2 mb-3 hover-bold d-block" :key="sub[0]" :to="sub[1]" @click="close">
                <i class="lnr lnr-chevron-right fs-6"></i> {{sub[0]}}
              </router-link>
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
          <router-link v-for="sub in submenu[ddopen].menu" class="mb-2 d-block" :key="sub[0]" :to="sub[1]" @click="close()"><i class="lnr lnr-chevron-right fs-6"></i> {{sub[0]}}</router-link>
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
      hrefs:{"Shop": './shop', "About Us": './about', "FAQs": './help'},
      ddopen: false,
      submenu:{
        "Learn" :{pad:'223px', title: "Learn more about Mirko", menu : [["Flow Underwear", '/learn/flow-underwear'], ["Menstrual Cups", '/learn/menstrual-cup']], mopen: false}
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
    closemenu(){
      this.ddopen = false
      this.open = false
      let subs = Object.values(this.submenu)
      subs.forEach((item) => {item.mopen = false} );
    },
    mnavlinkcallback(link){
      if(link in this.submenu){
        this.submenu[link].mopen = !this.submenu[link].mopen
      } else{
        this.close()
      }
    },
    navlinkcallback(link){
      if(this.ddopen == link){
        this.close()
      } else{
        this.ddopen = link
      }
    },
    opennav(){
      this.open = !this.open
    },
    close(){
      this.open = false
    },
    itemcallback(item){
      switch (item) {
        case 'cart':
          this.close()
          this.$emit('page', 'cart')
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
