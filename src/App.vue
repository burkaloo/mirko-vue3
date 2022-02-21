<template>
  <div id="app" class="mx-auto" :style="{maxWidth: '2500px'}">
    <div v-if="alert.show" class="position-fixed start-0 end-0 mx-auto bg-transparent alert-box">
      <div :class="'alert alert-' + alert.class + ' alert-dismissible shadow-lg'">
        <span>{{alert.text}}</span>
        <span type="button" class="btn-close" @click="togglealert({show: false})"></span>
      </div>
    </div>
    <div class="py-2 border-bottom">
      <div class="text-center hoverpointer" @click="nextpage('/help/delivery')">Nationwide Shipping!</div>
    </div>

    <navBar :docscroll="docscroll" :topmargin="41" :spacer="66" logo="./photos/mirko-logo.png" :cartcount="cartcount"
    @page="nextpage"
    @alert="togglealert"
    />

    <router-view
      v-show="page != 'cart'"
      :siteconf="siteconf"
      :backend="backend"
      :bccemail="bccemail"
      @cartinput="addtocart"
      @page="nextpage"
      @back="backpage"
      @load="load"
      @alert="togglealert"
      @order="placeorder"
      @shipcost="updateSF"
    />

    <cartPage
      v-show="page == 'cart'"
      :cart="cart"
      :backend="backend"
      :itemstotal="itemstotal"
      :carttotal="carttotal"
      :uid="uid"
      @remove="removefromcart"
      @add="addqtycart"
      @checkout="checkout"
      @back="backpage"
      @page="nextpage"
      @load="load"
      @alert="togglealert"
      @discountupdate="discountupdate"
    />

    <vFooter/>

    <spinner :show="spinnershow"/>
  </div>
</template>

<script>

const axios = require('axios');

import navBar from './components/navBar.vue'
import vFooter from './components/vFooter.vue'
import cartPage from './components/cartPage.vue'
import spinnerMix from '@/mixin/spinnerMix.js'


import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

require('./assets/styles/main.css')

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
//var tID = false;

export default {
  name: 'app',
  components:{navBar, cartPage, vFooter},
  mixins:[spinnerMix],
  data(){
    return{
      docscroll:0,
      cart:[],
      lastpage: {name: "home"},
      page: {name: "home"},
      alert:{
        class: 'danger',
        text: "error Message",
        show: false,
        timeout: false
      },
      products: null,
      bccemail: "camille@mirkoessentials.com",
      shipfee: 0,
      discount:{amt: 1, title:"INVALID"},
      uid: 3,
      backend: "https://mirkophp.navitag.net",
      //backend: "https://james.local/mirkobackend",
      siteconf: {},
      load: false
    }
  },
  created(){
    let comp = this
    axios.post(
      this.backend +"/dbconn.php",
      {statement: "siteconf"}
    ).then(function(res){
      if(res.data.status == "success"){
        res.data.response.forEach((set) => {
          comp.siteconf[set.key] = set.value
        });
      }
    })
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll)
    this.spinnertoggle(false)
  },
  beforeUmount() {
    window.removeEventListener("scroll", this.onScroll)
  },
  methods:{
    onScroll(){
      this.docscroll = document.documentElement.scrollTop
    },
    updateSF(data){
      if( isNaN(data) ){
        this.shipfee = 0
      } else{
        this.shipfee = data
      }
    },
    addtocart(data){
      //console.log(data)
      let opts = data[0]
      let qty = data[1]
      let price = data[2]
      let sku = data[3]
      let title = data[4]
      let itemid = data[5]

      let keys = Object.keys(opts)
      let varStr = keys.length == 0 ? '' : JSON.stringify(opts).replace("{", '[').replace("}", "]").replace(/,/g, "; ").replace(/"/g, '').replace(/:/g, ": ")
      let searchArr = JSON.parse(JSON.stringify(this.cart))
      let addnew = true
      for (var i = 0; i < searchArr.length; i++) {
        let cartitem = this.cart[i]
        if(sku != "" && searchArr[i].sku === sku){
          cartitem.qty+= qty
          this.cart.splice(i,1, cartitem)
          addnew = false
          break
        } else if(searchArr[i].title === title && searchArr[i].variations === varStr){
          cartitem.qty+= qty
          this.cart.splice(i,1, cartitem)
          addnew = false
          break
        }
      }

      if(addnew){
        let newcartitem = {
          title: title,
          variations: varStr,
          price: price,
          qty: qty,
          pid: itemid,
          sku: sku
        }
        this.cart.push(newcartitem)
      }
      this.nextpage('cart')
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
        this.$router.push(page)
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
      if(this.page != 'cart'){
        this.nextpage(this.lastpage)
      } else{
        this.page = this.lastpage
        this.lastpage = 'cart'
      }
    },
    checkout(){
      this.lastpage = this.page
      this.page = "checkout"
      this.$router.push({name:"checkout", params: {carttotal: this.carttotal, carttable: this.carttable}})
      setTimeout(
        function(){
          document.body.scrollTop = 0; // For Safari
          document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        },
        70
      );
    },
    async togglealert(data){
      let toggle = this.togglealert
      if(data.show == true){
        if(this.alert.show == true){
          toggle({show:false})
          if("delay" in data){
            await sleep(data.delay)
          } else{
            await sleep(200)
          }
        }
        this.alert.text = "text" in data ? data.text : "undefined system message"
        this.alert.class = "class" in data ? data.class : "undefined system message"
        this.alert.show = data.show
        this.alert.timeout = setTimeout(function(){toggle({show:false})}, 5000)
      } else{
        this.alert.show =  false
        if(this.alert.timeout !== false){
          clearTimeout(this.alert.timeout)
          this.alert.timeout = false
        }
      }
    },
    placeorder(data){
      this.spinnertoggle(true)
      //send email will complete order details
      //add shipping to cart
      let postdata = {
        merge:{
          cart: this.carttable,
          total: this.carttotal.toString(),
          payment: data.payment,
          shipinfo: data.shipinfo,
        },
        token: 'mirko-order',
        email: {to: data.email, bcc: this.bccemail},
        "subject-pre": 'Mirko order for ' + data.name + '. '
      }

      //add shipping line on email
      if(this.shipfee > 0){
          postdata.merge.cart += '<tr><td></td><td>Shipping fee</td><td style="text-align: right; padding:0 0 0 0">' + this.shipfee +"</td></tr>"
      }
      /*add discount line on email

      if(this.discount.title != "INVALID"){
          postdata.merge.cart += '<tr><td></td><td>'+this.discount.title+'</td><td style="text-align: right; padding:0 0 0 0">-' + this.discount.amt +"</td></tr>"
      }*/

      if('files' in data){
        postdata.files = [{BinaryContent: data.files.base64, Name: data.files.name}]
      }

      console.log(postdata);
      axios({
        method: 'post',
        url: 'https://mailer.navitag.net',
        data: postdata
      }).then( (r) => {
        this.lastpage = {name:'home'}
        if("MessageID" in r.data && "TransactionID" in r.data){
          this.cart = []
          this.togglealert({show: true, class: 'success', text: "Order Placed"});
          this.nextpage({name:'thankyou'})
        } else{
          this.togglealert({show: true, class: 'danger', text: "Somthing went wrong... Order not placed."});
          this.nextpage({name:'home'})
        }
        this.shipfee = 0
      }).catch(() => {
        this.togglealert({show: true, class: 'danger', text: "Somthing went wrong... Order not submitted."});
        this.nextpage({name:'home'})
      }).finally( () => {
        this.spinnertoggle(false)
      })
    },
    discountupdate(data){
      this.discount = data
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
    itemstotal(){
      var total = 0
      for (var i = 0; i < this.cart.length; i++) {
        total += (this.cart[i].qty * this.cart[i].price)
      }
      return total
    },
    carttotal(){
      let total = this.itemstotal + this.shipfee
      if(this.discount.title != "INVALID"){
        total -= this.discount.amt
      }
      return total
    },
    carttable(){
      let cartstring = ""
      this.cart.forEach((itemobj) => {
        let qtystr = '<tr><td>' + itemobj.qty.toString() + '</td><td>'
        let itemstr = '<p style="margin: 0 0 0 0">' + itemobj.title  + '</p><small>' + itemobj.variations + '</small>'
        let pricestr = '</td><td style="text-align: right; padding:0 0 0 0">' + itemobj.price + '</td></tr>'
        cartstring += qtystr
        cartstring += itemstr
        cartstring += pricestr
      });
      if(this.discount.title != "INVALID"){
        //add discount into cart
        cartstring += '<tr><td></td><td><p style="margin: 0 0 0 0">' + this.discount.title + '</p></td><td style="text-align: right; color: red; padding-right:0; padding-left: 0;">-' + this.discount.amt + '</td></tr>'
      }
      return cartstring
    },
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
  z-index: 200;
}

#app{
  background-color: white
}

.fade-enter-active{
  transition: height 0.5s ease;
  height: 200px;
}

.fade-leave-active {
  transition: height 0.5s ease;
  height: 200px;
}

.fade-enter-from{
  height: 0
}
.fade-leave-to {
  height: 0;
}


.fromtop-enter-active,
.fromtop-leave-active {
  transition: opacity 0.5s ease;
}

.fromtop-enter-from,
.fromtop-leave-to {
  opacity: 0;
  height: 0
}


.learn-flow > .carousel__prev{
  left: 25px;
  background-color: transparent !important;
  color: lightgrey;
  height: 100%;
  width: 50px;
  border-radius: 0 !important;
}

.learn-flow > .carousel__next{
  right: 25px;
  background-color: transparent !important;
  color: lightgrey;
  height: 100%;
  width: 50px;
  border-radius: 0 !important;
}

.carousel__next:hover, .carousel__prev:hover{
  background-color: rgba(200, 200, 200, 0.5) !important;
  color: black;
}




</style>
