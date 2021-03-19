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
              <label class="form-label">Shpping to Province:</label>
              <select class="form-select" v-model="province">
                <option v-for="(option, index) in provinceOptions" :key="index" :value="option">{{option.text}}</option>
              </select>
            </div>
            <div style="max-width:260px; width:100%;" class="m-2">
              <label class="form-label">Shipping Method</label>
              <div class="">
                <select class="form-select" v-model="shipmeth" :disabled="province.score > 1">
                  <option value="Standard">Standard
                    <span v-if="province.score == 1">(3-5</span>
                    <span v-else>(5-7</span>
                    Days)
                  </option>
                  <option v-if="province.score == 1" value="Same Day">Same Day (Grab/Lalamove)</option>
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
export default {
  name: 'cartPage',
  props: {
    cart: Array,
  },
  data(){
    return {
      province: {score: 1, text:"Metro Manila"},
      shipmeth: "Standard",
      provinceOptions: [
        {score: 1, text: "Metro Manila"},
        {score: 2, text: "Abra"},
        {score: 3, text: "Agusan del Norte"},
        {score: 3, text: "Agusan del Sur"},
        {score: 3, text: "Aklan"},
        {score: 2, text: "Albay"},
        {score: 3, text: "Antique"},
        {score: 2, text: "Apayao"},
        {score: 2, text: "Aurora"},
        {score: 3, text: "Basilan"},
        {score: 2, text: "Bataan"},
        {score: 2, text: "Batanes"},
        {score: 2, text: "Batangas"},
        {score: 2, text: "Benguet"},
        {score: 3, text: "Biliran"},
        {score: 3, text: "Bohol"},
        {score: 3, text: "Bukidnon"},
        {score: 2, text: "Bulacan"},
        {score: 2, text: "Cagayan"},
        {score: 2, text: "Camarines Norte"},
        {score: 2, text: "Camarines Sur"},
        {score: 3, text: "Camiguin"},
        {score: 3, text: "Capiz"},
        {score: 2, text: "Catanduanes"},
        {score: 2, text: "Cavite"},
        {score: 2, text: "Cebu"},
        {score: 3, text: "Cotabato"},
        {score: 3, text: "Davao de Oro"},
        {score: 3, text: "Davao del Norte"},
        {score: 3, text: "Davao del Sur"},
        {score: 3, text: "Davao Occidental"},
        {score: 3, text: "Davao Oriental"},
        {score: 3, text: "Dinagat Islands"},
        {score: 3, text: "Eastern Samar"},
        {score: 3, text: "Guimaras"},
        {score: 2, text: "Ifugao"},
        {score: 2, text: "Ilocos Norte"},
        {score: 2, text: "Ilocos Sur"},
        {score: 3, text: "Iloilo"},
        {score: 2, text: "Isabela"},
        {score: 2, text: "Kalinga"},
        {score: 2, text: "La Union"},
        {score: 2, text: "Laguna"},
        {score: 3, text: "Lanao del Norte"},
        {score: 3, text: "Lanao del Sur"},
        {score: 3, text: "Leyte"},
        {score: 3, text: "Maguindanao"},
        {score: 2, text: "Marinduque"},
        {score: 2, text: "Masbate"},
        {score: 3, text: "Misamis Occidental"},
        {score: 3, text: "Misamis Oriental"},
        {score: 2, text: "Mountain Province"},
        {score: 3, text: "Negros Occidental"},
        {score: 3, text: "Negros Oriental"},
        {score: 3, text: "Northern Samar"},
        {score: 2, text: "Nueva Ecija"},
        {score: 2, text: "Nueva Vizcaya"},
        {score: 2, text: "Occidental Mindoro"},
        {score: 2, text: "Oriental Mindoro"},
        {score: 2, text: "Palawan"},
        {score: 2, text: "Pampanga"},
        {score: 2, text: "Pangasinan"},
        {score: 2, text: "Quezon"},
        {score: 2, text: "Quirino"},
        {score: 2, text: "Rizal"},
        {score: 2, text: "Romblon"},
        {score: 3, text: "Samar"},
        {score: 3, text: "Sarangani"},
        {score: 3, text: "Siquijor"},
        {score: 2, text: "Sorsogon"},
        {score: 3, text: "South Cotabato"},
        {score: 3, text: "Southern Leyte"},
        {score: 3, text: "Sultan Kudarat"},
        {score: 3, text: "Sulu"},
        {score: 3, text: "Surigao del Norte"},
        {score: 3, text: "Surigao del Sur"},
        {score: 2, text: "Tarlac"},
        {score: 3, text: "Tawi-Tawi"},
        {score: 2, text: "Zambales"},
        {score: 3, text: "Zamboanga del Norte"},
        {score: 3, text: "Zamboanga del Sur"},
        {score: 3, text: "Zamboanga Sibugay"}
      ],
      btnspin: false
    }
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
        province:this.province.text,
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
      if(newval.score > 1){
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
      if(this.province.score == 1){
        if(this.shipmeth == "Standard"){
            return 100
        } else if(this.shipmeth == "Sameday"){
          return "Based on App booking"
        } else{
          return 0
        }
      }
      else if(this.province.score == 2){
        return 150
      }
      else if(this.province.score == 3){
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
