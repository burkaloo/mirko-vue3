<template>
  <div class="bg-grey" id="app">
    <div class="container">
      <div class="d-flex py-2">
        <div class="">Nationwide Shipping</div>
      </div>

    </div>

    <navBar :docscroll="docscroll" topmargin="40" spacer="71" logo="./photos/mirko-logo.png" logoh="45" :cartcount="cartcount"
    @page="nextpage"/>


    <cartPage v-show="page == 'cart'"
      class="container pt-5 pb-3"
      :cart="cart"
      @remove="removefromcart"
      @add="addqtycart"
      @checkout="checkout"
      @back="backpage"
      @updatetotal="updatetotal"
    />

    <homePage v-show="page == 'home'" @page="nextpage"/>

    <contactUs v-show="page == 'contact'" class="container mt-5 px-3" @page="nextpage"/>

    <aboutMirko v-show="page == 'about'" class="container mx-auto" @page="nextpage"/>

    <prodPage v-show="page == 'prod'" class="mt-5" @cartinput="addtocart" @page="nextpage"/>

    <helpPage v-show="page == 'help'" class="mt-5 px-3"/>


    <checkout v-show="page == 'checkout'" class="mt-5" :params="params"/>

    <div style="padding-bottom: 70px;">
        <v-footer class="pt-5" @page="nextpage"/>
    </div>


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
import checkout from './components/checkout.vue'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

require('./assets/styles/main.css')



export default {
  name: 'app',
  components:{navBar, prodPage, vFooter, contactUs, aboutMirko, homePage, cartPage, helpPage, checkout},
  data(){
    return{
      docscroll:0,
      cart:[],
      page: "home",
      lastpage: "home",
      params : ""
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
        this.nextpage('cart')
      }

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
      setTimeout(
        function(){
          document.body.scrollTop = 0; // For Safari
          document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        },
        200
      );
    },
    backpage(){
      this.page = this.lastpage
    },
    checkout(data){
      var params = ""
      var keys = Object.keys(data)
      keys.forEach(( key, i) => {
        if(i > 0 ){
         params += "&"
       }else{
         params += "?"
       }
        params += encodeURI(key) + "=" + encodeURI(data[key])
      });
      this.params = params
      this.page = "checkout"
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
  }
}

</script>

<style>

</style>
