<template>
  <div>
    <div class="">
      <i class="lnr lnr-cross fs-1" @click="$emit('back')"></i>
    </div>
    <h3 class="mt-2 text-center header-font">My Cart</h3>
    <div v-if="cart.length > 0" class="table-responsive">
      <table  class="table">
        <tr v-for="(item, ind) in cart" :key="ind">
          <td>
            <h5>{{item.title}}</h5>
            <p class="mb-1">{{item.variations}}</p>
            <p class="mb-0 font-weight-bold text-danger"><s class="pesosign"></s>{{item.price * item.qty}}</p>
          </td>
          <td>{{item.price}}</td>
          <td style="min-width: 131px;" class="text-end">
            <div class="d-block">
              <button class="btn" @click="$emit('add',[ind, 1, true])"> <i class="lnr lnr-circle-minus"></i> </button>
              <p class="mb-0 mx-2 d-inline-block" style="width: 22px">{{cart[ind].qty}}</p>
              <button class="btn" @click="$emit('add',[ind, 1, false])"> <i class="lnr lnr-plus-circle"></i> </button>
            </div>
            <div class="text-right mt-3">
              <button class="btn" @click="$emit('remove',ind)"><i class="lnr lnr-trash"></i></button>
            </div>
          </td>
        </tr>
      </table>
      <table class="table mt-5">
        <tr>
          <td>
            <div style="max-width:400px;">
              <label class="form-label">Shpping to Province:</label>
              <select class="form-select" v-model="province">
                <option value="1">Metro Manila</option>
                <option value="2">Abra</option>
                <option value="3">Agusan del Norte</option>
                <option value="3">Agusan del Sur</option>
                <option value="3">Aklan</option>
                <option value="2">Albay</option>
                <option value="3">Antique</option>
                <option value="2">Apayao</option>
                <option value="2">Aurora</option>
                <option value="3">Basilan</option>
                <option value="2">Bataan</option>
                <option value="2">Batanes</option>
                <option value="2">Batangas</option>
                <option value="2">Benguet</option>
                <option value="3">Biliran</option>
                <option value="3">Bohol</option>
                <option value="3">Bukidnon</option>
                <option value="2">Bulacan</option>
                <option value="2">Cagayan</option>
                <option value="2">Camarines Norte</option>
                <option value="2">Camarines Sur</option>
                <option value="3">Camiguin</option>
                <option value="3">Capiz</option>
                <option value="2">Catanduanes</option>
                <option value="2">Cavite</option>
                <option value="2">Cebu</option>
                <option value="3">Cotabato</option>
                <option value="3">Davao de Oro</option>
                <option value="3">Davao del Norte</option>
                <option value="3">Davao del Sur</option>
                <option value="3">Davao Occidental</option>
                <option value="3">Davao Oriental</option>
                <option value="3">Dinagat Islands</option>
                <option value="3">Eastern Samar</option>
                <option value="3">Guimaras</option>
                <option value="2">Ifugao</option>
                <option value="2">Ilocos Norte</option>
                <option value="2">Ilocos Sur</option>
                <option value="3">Iloilo</option>
                <option value="2">Isabela</option>
                <option value="2">Kalinga</option>
                <option value="2">La Union</option>
                <option value="2">Laguna</option>
                <option value="3">Lanao del Norte</option>
                <option value="3">Lanao del Sur</option>
                <option value="3">Leyte</option>
                <option value="3">Maguindanao</option>
                <option value="2">Marinduque</option>
                <option value="2">Masbate</option>
                <option value="3">Misamis Occidental</option>
                <option value="3">Misamis Oriental</option>
                <option value="2">Mountain Province</option>
                <option value="3">Negros Occidental</option>
                <option value="3">Negros Oriental</option>
                <option value="3">Northern Samar</option>
                <option value="2">Nueva Ecija</option>
                <option value="2">Nueva Vizcaya</option>
                <option value="2">Occidental Mindoro</option>
                <option value="2">Oriental Mindoro</option>
                <option value="2">Palawan</option>
                <option value="2">Pampanga</option>
                <option value="2">Pangasinan</option>
                <option value="2">Quezon</option>
                <option value="2">Quirino</option>
                <option value="2">Rizal</option>
                <option value="2">Romblon</option>
                <option value="3">Samar</option>
                <option value="3">Sarangani</option>
                <option value="3">Siquijor</option>
                <option value="2">Sorsogon</option>
                <option value="3">South Cotabato</option>
                <option value="3">Southern Leyte</option>
                <option value="3">Sultan Kudarat</option>
                <option value="3">Sulu</option>
                <option value="3">Surigao del Norte</option>
                <option value="3">Surigao del Sur</option>
                <option value="2">Tarlac</option>
                <option value="3">Tawi-Tawi</option>
                <option value="2">Zambales</option>
                <option value="3">Zamboanga del Norte</option>
                <option value="3">Zamboanga del Sur</option>
                <option value="3">Zamboanga Sibugay</option>
              </select>
            </div>
          </td>
          <td class="text-end">
            <p class="mb-0 font-weight-bold"><s class="pesosign"></s>{{shipcost}}</p>
          </td>
        </tr>

        <tr class="border-top border-black">
          <td><h3>Total:</h3></td>
          <td><h3 class="text-end"><s class="pesosign"></s>{{withshipping }}</h3></td>
        </tr>
      </table>
      <div class=" text-end">
          <button class="btn btn-lg text-light bg-pink fw-bold mt-4" @click="$emit('page', 'checkout')">Checkout</button>
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
    carttotal: Number,
  },
  data(){
    return {
      province: 1,
      shipcost: 100
    }
  },
  methods:{

  },
  watch:{
    province(newval){
      if(newval == 1){
        this.shipcost = 100
        this.$emit('shipcost', 100)
      }
      if(newval == 2){
        this.shipcost = 150
        this.$emit('shipcost', 150)
      }
      if(newval == 1){
        this.shipcost = 200
        this.$emit('shipcost', 200)
      }
    }
  },
  computed:{
    withshipping(){
      var total = this.carttotal + this.shipcost
      return total
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
