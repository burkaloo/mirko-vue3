<template>
  <div class="bg-grey" id="app">
    <div v-if="alert.show" class="position-fixed start-0 end-0 mx-auto bg-transparent alert-box">
      <div :class="'alert alert-' + alert.class + ' alert-dismissible shadow-lg'">
        <span>{{alert.text}}</span>
        <span type="button" class="btn-close" @click="togglealert({show: false})"></span>
      </div>
    </div>
    <div class="container">
      <div class="d-flex py-2">
        <div class="">Nationwide Shipping</div>
      </div>
    </div>

    <navBar :docscroll="docscroll" topmargin="40" spacer="71" logo="./photos/mirko-logo.png" logoh="45" :cartcount="cartcount"
    @page="nextpage"
    @alert="togglealert"/>

    <router-view
      v-show="page != 'cart'"
      @cartinput="addtocart"
      @page="nextpage"
      @back="backpage"
      @load="load"
      @alert="togglealert"
      @order="placeorder"
    />

    <cartPage
      v-show="page == 'cart'"
      :cart="cart"
      :carttotal="carttotal"
      @remove="removefromcart"
      @add="addqtycart"
      @checkout="checkout"
      @back="backpage"
      @updatetotal="updatetotal"
      @page="nextpage"
      @load="load"
      @alert="togglealert"
    />

    <div style="padding-bottom: 70px;">
        <v-footer class="pt-5" @page="nextpage" @alert="togglealert"/>
    </div>

    <div v-if="loading" class="grey-out z-top position-fixed top-0 vh-100 vw-100">
      <div class="text-center" style="margin-top:40vh">
        <div class="spinner-border m-5" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

const axios = require('axios');

import navBar from './components/navBar.vue'
import vFooter from './components/vFooter.vue'
import cartPage from './components/cartPage.vue'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

require('./assets/styles/main.css')

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export default {
  name: 'app',
  components:{navBar, vFooter, cartPage},
  data(){
    return{
      docscroll:0,
      cart:[],
      lastpage: "home",
      page: "home",
      loading: false,
      alert:{
        class: 'danger',
        text: "error Message",
        show: false
      },
      bccemail: "camille@mirkoessentials.com"
    }
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll)
  },
  beforeUmount() {
    window.removeEventListener("scroll", this.onScroll)
  },
  methods:{
    sleep(ms){
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    onScroll(){
      this.docscroll = document.documentElement.scrollTop
    },
    addtocart(data){
      //console.log(data)
      var opts = data[0]
      var qty = data[1]
      var price = data[2]
      var title = data[3]

      var keys = Object.keys(opts)

      var searchArr = JSON.parse(JSON.stringify(this.cart))
      //console.log(searchArr)
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

      //console.log(this.cart)
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
      if(page != 'cart'){
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
      this.lastpage = this.page
      this.page = "checkout"
      this.$router.push({name:"checkout", params: {carttotal: data, carttable: this.carttable}})
      setTimeout(
        function(){
          document.body.scrollTop = 0; // For Safari
          document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        },
        70
      );
    },
    load(state = null){
      if(state === null){
        this.loading = !this.loading
      } else{
        this.loading = state
      }
    },
    async togglealert(data){
      if(data.show == false){
        this.alert.show = false
      } else if(data.show == true){
        if(this.alert.show == true){
          this.alert.show = false
          await sleep(200)
        }
        this.alert.text = "text" in data ? data.text : "undefined system message"
        this.alert.class = "class" in data ? data.class : "undefined system message"
        this.alert.show = data.show
      } else{
        this.alert.show =  false
      }
    },
    placeorder(data){
      //send email will complete order details
      let postdata = {
        merge:{
          cart: this.carttable,
          total: this.carttotal.toString(),
          payment: data.payment,
          shipinfo: data.shipinfo
        },
        token: 'mirko-order',
        email: {to: data.email, bcc: this.bccemail},
        "subject-pre": 'Mirko order for ' + data.name
      }
      if('files' in data){
        postdata.files = [{BinaryContent: data.files.base64, Name: data.files.name}]
      }

      console.log(postdata);
      let comp = this
      axios({
        method: 'post',
        url: 'https://mailer.navitag.net',
        data: postdata
      }).then(function(r){
        if("MessageID" in r.data && "TransactionID" in r.data){
          comp.cart = []
          comp.nextpage('thanks')
          comp.lastpage = 'home'
        } else{
          this.togglealert({show: true, class: 'danger', text: "Somthing went wrong... Order has not been confirmed."});
        }
      }).catch(function(){
        this.togglealert({show: true, class: 'danger', text: "Somthing went wrong... Order has not been confirmed."});
      }).finally(function(){
        comp.load(false)
      })
    }
  },
  computed:{
    alertclass(){
      return 'alert alert-' + this.alert.class + ' alert-dismissible shadow-lg'
    },
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
    },
    carttable(){
      let cartstring = ""
      this.cart.forEach((itemobj) => {
        let qtystr = '<tr><td>' + itemobj.qty.toString() + '</td><td>'
        let itemstr = '<p style="margin-bottom: 0">' + itemobj.title  + '</p><small style="margin-bottom: 0">' + itemobj.variations + '</small>'
        let pricestr = '</td><td style="text-align: right; padding:0 0 0 0">' + itemobj.price + '</td></tr>'
        cartstring += qtystr
        cartstring += itemstr
        cartstring += pricestr
      });

      return cartstring
    }
  }
}
</script>

<style>
.grey-out{
  background-color: rgba(128,128,128,.7);
}

.z-top{
  z-index: 9999999999;
}

.alert-box{
  max-width: 650px;
  width:100%;
  top:20px;
  padding-left: 10px;
  padding-right: 10px;
  z-index: 10;
}

</style>
