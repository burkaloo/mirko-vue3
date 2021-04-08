<template>
  <div class="bg-grey" id="app">
    <div class="container">
      <div class="d-flex py-2">
        <div class="">Nationwide Shipping</div>
      </div>
    </div>

    <navBar :docscroll="docscroll" topmargin="40" spacer="71" logo="./photos/mirko-logo.png" logoh="45" :cartcount="cartcount"
    @page="nextpage"/>

    <router-view
      @remove="removefromcart"
      @add="addqtycart"
      @checkout="checkout"
      @back="backpage"
      @updatetotal="updatetotal"
      @page="nextpage"

      @cartinput="addtocart"
    />

    <div style="padding-bottom: 70px;">
        <v-footer class="pt-5" @page="nextpage"/>
    </div>


  </div>
</template>

<script>


import navBar from './components/navBar.vue'
import vFooter from './components/vFooter.vue'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

require('./assets/styles/main.css')



export default {
  name: 'app',
  components:{navBar, vFooter},
  data(){
    return{
      docscroll:0,
      cart:[],
      lastpage: "home",
      page: "",
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
      if(page == "cart"){
        let cartcopy = JSON.stringify(this.cart)
        console.log(cartcopy)
        this.$router.push({name:page, params: {cartstr: cartcopy}})
      } else{
        this.$router.push({name:page})
      }

      setTimeout(
        function(){
          document.body.scrollTop = 0; // For Safari
          document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        },
        70
      );

    },
    backpage(){
      this.nextpage(this.lastpage)
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
      setTimeout(
        function(){
          document.body.scrollTop = 0; // For Safari
          document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        },
        130
      );
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
