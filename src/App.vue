<template>
  <div class="bg-grey pb-5" id="app">
    <div class="container d-flex">
      <div class="p-2 w-100 bd-highlight">Nationwide Shipping</div>
      <div class="p-2 flex-shrink-1" @click="nextpage(help)">help</div>
    </div>

    <navBar :docscroll="docscroll" topmargin="40" spacer="71" logo="./photos/mirko-logo.png" logoh="45" :cartcount="cartcount" @page="nextpage"/>


    <cartPage v-show="page == 'cart'"
      class="container pt-5"
      :cart="cart"
      :carttotal="carttotal"
      @remove="removefromcart"
      @add="addqtycart"
      @page="nextpage"
      @back="backpage"
    />

    <homePage v-show="page == 'home'" @page="nextpage"/>

    <contactUs v-show="page == 'contact'" class="container" @page="nextpage"/>

    <aboutMirko v-show="page == 'about'" class="container mx-auto" @page="nextpage"/>

    <prodPage v-show="page == 'prod'" class="mt-5" @cartinput="addtocart" @page="nextpage"/>

    <helpPage v-show="page == 'help'" class="mt-5"/>

    <v-footer class="pt-5" @page="nextpage"/>

  </div>
</template>

<script>


import navBar from './components/navBar.vue'
import vFooter from './components/vFooter.vue'
import contactUs from './components/contactUs.vue'
import aboutMirko from './components/aboutMirko.vue'
import prodPage from './components/prodPage.vue'
import homePage from './components/homePage.vue'
import cartPage from './components/cartPage.vue'
import helpPage from './components/helpPage.vue'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

require('./assets/styles/main.css')



export default {
  name: 'app',
  components:{navBar, prodPage, vFooter, contactUs, aboutMirko, homePage, cartPage, helpPage},
  data(){
    return{
      docscroll:0,
      cart:[],
      page: "home",
      lastpage: "home"
    }
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll)
  },
  beforeUmount() {
    window.removeEventListener("scroll", this.onScroll)
  },
  methods:{
    onScroll() {
      this.docscroll = document.documentElement.scrollTop
    },
    addtocart(data){
      console.log(data)
      var opts = data[0]
      var qty = data[1]
      var price = data[2]
      var title = data[3]

      var keys = Object.keys(opts)

      var searchArr = JSON.parse(JSON.stringify(this.cart))
      console.log(searchArr)
      var addnew = true
      for (var i = 0; i < searchArr.length; i++) {
        var varStr = keys.length == 0 ? '' : JSON.stringify(opts).replace("{", '[').replace("}", "]").replace(/,/g, "; ").replace(/"/g, '').replace(/:/g, ": ")
        if(searchArr[i].title === title && searchArr[i].variations === varStr){
          var cartitem = this.cart[i]
          cartitem.qty+= qty
          this.cart.splice(i,1, cartitem)
          addnew = false
          break
        }
      }

      if(addnew){
        var newcartitem = {
          title: title,
          variations: keys.length == 0 ? '' : JSON.stringify(opts).replace("{", '[').replace("}", "]").replace(/,/g, "; ").replace(/"/g, '').replace(/:/g, ": "),
          price: price,
          qty: qty

        }

        this.cart.push(newcartitem)
      }


      //for (var y = 0; y < keys.length; y++) {
        //var indexes = searchProp(keys[y], opts[keys[y]], searchArr)
        //var filtered = []
        //for (var z = 0; z < indexes.length; z++) {
        //  filtered.push(searchArr[indexes[z]])
        //}
        //searchArr = filtered
      //}

      console.log(this.cart)
      //open cart here
    },
    removefromcart(ind){
      this.cart.splice(ind, 1)
      if(this.tab == 'checkout' && this.cart.length == 0){
        //close cart
      }
    },
    addqtycart(data){
      let index = data[0], num = data[1], nega = data[2]
      if(nega){
        if(this.cart[index].qty  - num  > 0){
          this.cart[index].qty -= num
        }
      } else{
        if(this.cart[index].qty  + num  < 100){
          this.cart[index].qty += num
        }
      }
    },
    nextpage(page){
      this.lastpage = this.page
      this.page = page
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    },
    backpage(){
      this.page = this.lastpage
    }
  },
  computed:{
    cartcount(){
      var total = 0
      for (var i = 0; i < this.cart.length; i++) {
        total += this.cart[i].qty
      }
      return total
    },
    carttotal(){
      var total = 0
      for (var i = 0; i < this.cart.length; i++) {
        total += (this.cart[i].qty * this.cart[i].price)
      }
      return total
    }
  }
}

</script>

<style>

</style>
