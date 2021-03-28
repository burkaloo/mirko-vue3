<template>
  <div>
    <div class="">
      <i class="lnr lnr-cross fs-1" @click="$emit('back')"></i>
    </div>
    <h3 class="mt-2 text-center header-font">My Cart</h3>
    <div v-if="cart.length > 0">
      <div class="row border-bottom py-3" v-for="(item, ind) in cart" :key="ind">
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
      <div class="row">
        <div class="col-12 d-flex border-top border-black py-3 px-2">
          <h5 class="header-font">Cart Total:</h5>
          <h5 class="ms-auto text-danger"><s class="pesosign"></s>{{carttotal }}</h5>
        </div>
        <div class="col-12 col-md-9">
          <div class="d-sm-flex flex-sm-row">
            <div style="max-width:230px; width:100%;" class="m-2">
              <label class="form-label">Province:</label>
              <select class="form-select" v-model="province">
                <option v-for="(option, index) in provinceOptions" :key="index" :value="option">{{option.name}}</option>
              </select>
            </div>
            <div style="max-width:230px; width:100%;" class="m-2">
              <label class="form-label">City:</label>
              <select class="form-select" v-model="city" :disabled="cityOptions.length == 0">
                <option v-for="(option, index) in cityOptions" :key="index" :value="option">{{option.name}}</option>
              </select>
            </div>
            <div style="max-width:260px; width:100%;" class="m-2">
              <label class="form-label">Shipping Method</label>
              <div class="">
                <select class="form-select" v-model="shipmeth" :disabled="city.score > 1">
                  <option value="Standard">Standard
                    <span v-if="city.score == 1">(3-5 Days)</span>
                    <span v-else-if="city.score > 1">(5-7 Days)</span>
                  </option>
                  <option v-if="city.score == 1" value="Same Day">Same Day (Grab/Lalamove)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-3 d-flex flex-sm-wrap d-md-block text-sm-end pt-3 px-3">
            <p class="mb-0 d-block">+shipping fee</p>
            <p class="mb-0 font-weight-bold ms-auto mt-md-3">{{shipcost}}</p>
        </div>
        <div v-show="shipmeth == 'Same Day'" class="col-12">
          We will contact you for the exact delivery fee after check out. Kindly note that shipping will come from Manila.
        </div>
      </div>

      <table class="table mt-5">
        <tr class="border-top border-black">
          <td><h3 class="header-font">Total:</h3></td>
          <td><h3 class="text-end"><s class="pesosign"></s>{{withshipping }}</h3></td>
        </tr>
      </table>
      <div class=" text-end">
          <button class="btn btn-lg text-light bg-pink fw-bold mt-4" @click="checkout" :disabled="btnspin">
            <div v-if="btnspin" class="spinner-border mx-4" role="status" >
              <span class="visually-hidden">Loading...</span>
            </div>
            <div v-else class="pt-1">Checkout</div>
          </button>
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
    cart: Array,
  },
  data(){
    return {
      province: null,
      city: {name:"Choose One...", score: 0},
      shipmeth: "Standard",
      provinceOptions: [],
      cityOptions:[],
      btnspin: false,
      baseurl: 'https://mirkophp.navitag.net/'
    }
  },
  mounted(){
      let comp = this
      axios.post(this.baseurl+ "getprovinces.php").
      then(function(r){
        if(r.data.status == "success"){
          comp.provinceOptions = r.data.response
        } else{
          console.log(r.data.response)
        }
      }).catch(function(e){
        console.log(e)
      })
  },
  methods:{
    checkout(){
      this.btnspin = true
      var datastring = ""
      for (var i = 0; i < this.cart.length; i++) {
        var qtystring = this.cart[i].qty < 10 ? "0" + this.cart[i].qty.toString() : this.cart[i].qty.toString()
        var itemtotal = this.cart[i].qty * this.cart[i].price
        datastring += `${qtystring} | ${this.cart[i].title} ${this.cart[i].variations} - ₱${itemtotal}\n`
      }
      var data =  {
        products: datastring.replace(/^\s+|\s+$/g, ''),
        province:this.province.name,
        city:this.city.name,
        total: this.withshipping,
        shipping : this.shipmeth
      }
      this.$emit('checkout', data)
      this.btnspin = false
    }
  },
  watch:{
    shipcost: function(newval){
      this.$emit('shipcost', newval)
    },
    province: function(newval){
      this.cityOptions = []
      this.city = {name:"Choose One...", score: 0}
      this.shipmeth = "Standard"
      var comp = this
      axios.post(this.baseurl + "getcities.php",{
        prov: newval.id
      }).then(function(r){
        if(r.data.status == "success"){
          comp.cityOptions = r.data.response
        }
      })
    },
    city(newval){
      if(newval.score > 1 || newval == null){
          this.shipmeth = "Standard"
      }
    },
    withshipping: function(newval){
      this.$emit('updatetotal', newval)
    },
  },
  computed:{
    withshipping(){
      if(isNaN(this.shipcost)){
        return this.carttotal
      } else{
        var total = this.carttotal + this.shipcost
        return total
      }

    },
    shipcost(){
      if(this.city.score == 1){
        if(this.shipmeth == "Standard"){
            return 100
        } else if(this.shipmeth == "Sameday"){
          return "Based on App booking"
        } else{
          return 0
        }
      }
      else if(this.city.score == 2){
        return 150
      }
      else if(this.city.score == 3){
        return 200

      } else{
        return 0
      }
    },
    carttotal(){
      var total = 0
      for (var i = 0; i < this.cart.length; i++) {
        total += (this.cart[i].qty * this.cart[i].price)
      }
      return total
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
