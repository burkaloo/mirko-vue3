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
      <table class="table">
        <tr class="border-top border-black">
          <td><h3>Total:</h3></td>
          <td><h3 class="text-end"><s class="pesosign"></s>{{carttotal}}</h3></td>
        </tr>
      </table>
      <div class=" text-end">
          <button class="btn btn-lg text-light bg-pink fw-bold mt-4" @click="gotocheckout">Checkout</button>
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
  methods:{

  },
  computed:{
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
