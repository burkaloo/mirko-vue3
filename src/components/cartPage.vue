<template>
  <div class="container my-5">
    <div class="">
      <i class="lnr lnr-cross fs-1" @click="$emit('back')"></i>
    </div>
    <h3 class="mt-2 text-center header-font">My Cart</h3>
    <div v-if="cart.length > 0">
      <div v-for="(item, ind) in cart" class="row border-bottom py-3"  :key="ind">
        <div class="col-12 col-md-8 col-lg-9 col-xl-10">
          <h5>{{item.title}}</h5>
          <p class="mb-1">{{item.variations}}</p>
          <p>{{item.price}}</p>
        </div>
        <div class="col-12 col-md-4 col-lg-3 col-xl-2 d-flex flex-sm-wrap mt-4 mt-sm-0">
          <div class="">
            <button class="btn" @click="$emit('add',[ind, 1, true])"> <i class="lnr lnr-circle-minus"></i> </button>
            <p class="mb-0 mx-2 d-inline-block" style="width: 22px">{{cart[ind].qty}}</p>
            <button class="btn" @click="$emit('add',[ind, 1, false])"> <i class="lnr lnr-plus-circle"></i> </button>
          </div>
          <div class="ms-auto">
            <button class="btn" @click="$emit('remove',ind)"><i class="lnr lnr-trash"></i></button>
          </div>
        </div>
        <div class="col-12 mt-4">
          <p class="mb-0 text-end font-weight-bold text-danger"><s class="pesosign"></s>{{item.price * item.qty}}</p>
        </div>
      </div>
      <div v-if="discountparams !== null" class="row border-bottom py-3">
        <div class="col-12 col-md-8 col-lg-9 col-xl-10">
          <div v-if="computediscount.title == 'INVALID'">
            <div v-if="computediscount.amt == 2">
              <h5>{{discountparams.code}}</h5>
              <small>Current cart items does not qualify for this discount code.</small>
            </div>
            <div v-else-if="computediscount.amt == 3">
              <h5>{{discountparams.code}}</h5>
              <small>Your Account cannot use this discout code</small>
            </div>
          </div>
          <h5 v-else>{{computediscount.title}}</h5>
        </div>
        <div class="col-12 col-md-4 col-lg-3 col-xl-2 mt-4 mt-sm-0 text-end">
          <button class="btn bg-pink" @click="removediscount">Remove Discount</button>
        </div>
        <div class="col-12 mt-4">
          <p v-if="computediscount.title != 'INVALID'" class="mb-0 text-end font-weight-bold text-danger">- <s class="pesosign"></s>{{computediscount.amt}}</p>
        </div>
      </div>
      <div class="row">
        <div class="col-12 d-flex border-top border-black py-3 px-2">
          <h5 class="header-font">Cart Total:</h5>
          <h5 class="ms-auto text-danger"><s class="pesosign"></s>{{carttotal }}</h5>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Coupon Code" v-model="dcode">
            <button class="btn bg-pink text-white" @click="getdiscount" :disabled="loading.discount">
              <div v-if="loading.discount" class="spinner-border spinner-border-sm mx-3" role="status" >
                <span class="visually-hidden">Loading...</span>
              </div>
              <span v-else>Apply</span>
            </button>
          </div>
        </div>
        <div class="col-12 text-end">
          <button class="btn btn-lg text-light bg-pink fw-bold mt-4" @click="checkout" :disabled="btnspin">
            <div v-if="btnspin" class="spinner-border mx-4" role="status" >
              <span class="visually-hidden">Loading...</span>
            </div>
            <div v-else class="pt-1">Checkout</div>
          </button>
        </div>
      </div>
    </div>
    <h4 v-else class="my-5 text-center">No Items</h4>
  </div>
</template>

<script>
import axios from 'axios'
import stringMix from '@/mixin/stringMix.js'

export default {
  name: 'cartPage',
  mixins:[stringMix],
  props: {
    cart: {},
    itemstotal:{},
    carttotal:{},
    uid:{default: null},
    backend:{},
  },
  data(){
    return {
      btnspin: false,
      //baseurl: 'https://mirkophp.navitag.net/',
      dcode:"",
      discountparams: null,
      claimed:[],
      loading:{
        discount: false
      }
    }
  },
  watch:{
    itemcount(newval){
      //watch for empty cart
      if(Object.keys(newval).length === 0)(
        //remove discount
        this.discountparams = null
      )
    }
  },
  methods:{
    checkout(){
      this.btnspin = true
      this.$emit('checkout')
      this.btnspin = false
    },
    getdiscount(){
      this.loading.discount = true
      let comp = this
      axios.post(this.backend +"/dbconn.php", {statement: "checkvoucher", uid: this.uid == null ? "guest" : this.uid, code: this.dcode})
      .then((res) => {
        if(res.data.status == "success"){
          let data =  res.data.response[0]

          data.claimed = data.claimed == null ? 0 : parseInt(data.claimed)
          data.reserved = data.reserved == null ? 0 : parseInt(data.reserved)
          data.accountclaimed = data.accountclaimed == null ? 0 : parseInt(data.accountclaimed)
          data.accountreserved = data.accountreserved == null ? 0 : parseInt(data.accountreserved)


          console.log(data)
          let acctreq = JSON.parse(data.account_required)
          //requirelogin for all codes that are limited, use once per acct, has pre-requisit accounts
          let reqlogin = data.count != null || data.use_once == 1 || acctreq.length > 0 ? true : false
          let totalclaim = data.claimed + data.reserved
          if(data.id == null && data.code == null){
            // invalide code
            this.$emit('alert', {show: true, class: 'warning', text: "Invalid code."})
          }
          else if(data.expired == 1){
            //expired code
            this.$emit('alert', {show: true, class: 'warning', text: "Code has expired"})
          }
          else if(data.count != null && totalclaim >= parseInt(data.count) ){
            //limit reached
            this.$emit('alert', {show: true, class: 'warning', text: "The maximum number of claims for this code has been reached"})
          }
          else if(reqlogin && this.uid == null){
            //must be signed in to use code
            this.$emit('alert', {show: true, class: 'warning', text: "You must be signed in to use this code"})
          }
          else if(acctreq.length > 0 && !acctreq.includes(this.uid)){
            //loged in and not part of required accounts
            this.$emit('alert', {show: true, class: 'warning', text: "Your Account is not qualified to claim this code"})
          }
          else if(data.use_once == 1 && data.accountclaimed > 0){
            //logged in code can only be used once
            this.$emit('alert', {show: true, class: 'warning', text: "Code has been claimed and can only be used once per account."})
          }
          else if(parseInt(data.min_cart_value) > this.carttotal){
            this.$emit('alert', {show: true, class: 'warning', text: "You did not reach the minimun spent amount to claim this code"})
          }
          else {
            //code valid. do reservation on account if login and no reservation
            if(this.uid !== null && data.accountreserved == 0){
              //make reservation
              axios.post(this.backend, {statement: "reservevoucher", uid: this.uid, vid: data.id})
            }
            //update component data to reflect new reservation??
            this.discountparams = data
            this.dcode = ""
          }
          
        } else {
          console.log('network error')
        }
      }).catch(function(e){
        console.log(e)
      }).finally(function(){
        comp.loading.discount = false
      })
    },
    removediscount(){
      this.dcode = ""
      this.discountparams = null
      this.$emit('discountupdate', {title: 'INVALID', amt: 0})
    }
  },
  computed:{
    itemcount(){
      let cartids = {}
      this.cart.forEach(function(cartitem){
          if(cartitem.pid in cartids ){
            cartids[cartitem.pid] += cartitem.qty
          } else{
            cartids[cartitem.pid] = cartitem.qty
          }
      });
      return cartids
    },
    computediscount(){
      if(this.discountparams == null){
        // no discount input
        this.$emit('discountupdate', {title: 'INVALID', amt: 0})
        return {amt: 1, title: 'INVALID'}
      }

      let preqfail = false
      let prequired = JSON.parse(this.discountparams.product_required)

      /*check required accounts for deleting moved to getdiscount
      let areqfail = false
      let arequired = JSON.parse(this.discountparams.account_required)
      if(arequired.length > 0 && !arequired.includes(this.uid)){
          areqfail = true
      }*/

      //check product required
      if(prequired.length > 0){

        let preqids = {}
        prequired.forEach((reqitem) => {
            if(reqitem in preqids ){
              preqids[reqitem] ++
            } else{
              preqids[reqitem] = 1
            }
        });

        let preqidskeys = Object.keys(preqids)
        console.log(preqidskeys)
        //compare cart with required
        for (var i = 0; i < preqidskeys.length; i++) {
          let pkey = preqidskeys[i]

          if(pkey in this.itemcount === false || this.itemcount[pkey] < preqids[pkey]){
            preqfail = true
            console.log("p fail")
            break

          }
        }

      }

      if(preqfail){
        // does not meet required products
        this.$emit('alert', {show: true, class: 'warning', text: "Your items does not qualify to redeem code.", delay: 300})
        this.$emit('discountupdate', {title: 'INVALID', amt: 0})
        return {amt: 2, title: 'INVALID'}
      /*} else if(areqfail){
        //does not meet required user id
        this.$emit('alert', {show: true, class: 'warning', text: this.uid == null ? "Only selected registered accounts can redeem this code." : "Your account does not qualify to redeem this code.", delay: 300})
        this.$emit('discountupdate', {title: 'INVALID', amt: 0})
        return {amt: 3, title: 'INVALID'}
      */
      } else{
        //coupon valid parse this.discountparams
        let finaldis = parseFloat(this.discountparams.value)
        if(this.discountparams.percentage == 1 || this.discountparams.percentage == "1"){
          //percecntage discount
          let percent = parseFloat(this.discountparams.value) / 100
          finaldis = parseFloat(this.itemstotal) * percent
        }
        let retobj = {title: this.titleCase(this.discountparams.title), amt: finaldis}
        this.$emit('discountupdate', retobj)
        return retobj
      }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
