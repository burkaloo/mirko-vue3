<template>
  <div class="container mt-5">
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
          <h5 v-if="discount.title == 'INVALID'">Invalid Code: {{discountparams.code}}</h5>
          <h5 v-else>{{discount.title}}</h5>
        </div>
        <div class="col-12 col-md-4 col-lg-3 col-xl-2 mt-4 mt-sm-0 text-end">
          <button class="btn bg-pink" @click="removediscount">Remove Discount</button>
        </div>
        <div class="col-12 mt-4">
          <p v-if="discount.title != 'INVALID'" class="mb-0 text-end font-weight-bold text-danger">- <s class="pesosign"></s>{{discount.amt}}</p>
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

export default {
  name: 'cartPage',
  props: {
    cart: {},
    itemstotal:{},
    carttotal:{},
    uid:{},
    discount:{}
  },
  data(){
    return {
      btnspin: false,
      baseurl: 'https://mirkophp.navitag.net/',
      dcode:"",
      discountparams: null,
      claimed:[],
      loading:{
        discount: false
      }
    }
  },
  watch:{
    discount(newval){
      if(newval.title != "INVALID" && this.discountparams !== null && !this.claimed.includes(this.discountparams.id) ){
        this.claimed.push(this.discountparams.id)
        axios.post(this.baseurl+ "codeclaimed.php", this.discountparams.id, {
          headers: {
            'Content-Type': 'text/plain',
            'Accept': 'application/json'
          }
        })
      }
    },
    computediscount(newval, oldval){
      this.$emit('discountupdate', newval)

      //watch valid discount change to invalid discount
      if(oldval.title != "INVALID" && newval.title == 'INVALID'){
        if(newval.amt == 2){
          this.$emit('alert',{show: true, class: 'warning', text: "Your updated cart is no longer qualified for appiled coupon code"})
        } else if(newval.amt == 3){
          this.$emit('alert',{show: true, class: 'warning', text: "Your account cannot avail of this discount"})
        }
      }
      // watch from invalid to invalid
      else if(oldval.title == 'INVALID' && newval.title == 'INVALID'){
        if(newval.amt == 2){
          this.$emit('alert',{show: true, class: 'warning', text: "Items in cart does not qualify to redeem coupon code"})
        } else if(newval.amt == 3){
          this.$emit('alert',{show: true, class: 'warning', text: "Your account cannot avail of this discount"})
        }
      } else{
        this.$emit('alert',{show: true, class: 'success', text: "Discount applied"})
      }

    },
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
      axios.post(comp.baseurl+ "codecheck.php", comp.dcode, {
        headers: {
          'Content-Type': 'text/plain',
          'Accept': 'application/json'
        },
      }).then(function(r){
        if(r.status == 200){
          let data =  r.data.response
          if(data.length == 0){
            //empty code no rows
            comp.$emit('alert', {show: true, class: 'warning', text: "Invalid Code"})
          } else {
            data[0].code = comp.dcode
            comp.discountparams = data[0]
            comp.dcode = ""
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
      if(this.discountparams === null){
        return {amt: 1, title: 'INVALID'}
      }
      let preqfail = false
      let areqfail = false
      let arequired = JSON.parse(this.discountparams.account_required)
      let prequired = JSON.parse(this.discountparams.product_required)

      //check required accounts
      if(arequired.length > 0 && !arequired.includes(this.uid)){
          areqfail = true
      }

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
        return {amt: 2, title: 'INVALID'}
        // does not meet required products
        //this.$emit('alert', {show: true, class: 'warning', text: "Your items does not qualify to redeem code.", delay: 300})
      } else if(areqfail){
        return {amt: 3, title: 'INVALID'}
        //does not meet required user id
        //this.$emit('alert', {show: true, class: 'warning', text: "Your account does is not qualified to redeem this code.", delay: 300})
      } else{
        //coupon valid parse this.discountparams
        let finaldis = parseFloat(this.discountparams.value)
        if(this.discountparams.percentage == 1 || this.discountparams.percentage == "1"){
          //percecntage discount
          let percent = parseFloat(this.discountparams.value) / 100
          finaldis = parseFloat(this.itemstotal) * percent
        }
        return {amt: finaldis, title: this.discountparams.title}
      }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
