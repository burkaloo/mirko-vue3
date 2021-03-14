<template>
<div class="">
  <h1 class="mt-4 text-green header-font font-weight-bold"><s class="pesosign"></s>{{scPrice}}</h1>
  <div v-for="(vObj, vTitle) in variations" class="my-4" :key="vTitle">
    <h5 class="text-green">{{vTitle}}</h5>
    <div>
      <button v-for="(opt, optInd) in vObj.options"
        :class="vObj.selected == optInd ? 'btn border border-pink bg-pink mx-2' : 'btn border mx-2'"
        @click="optselect(vTitle, optInd)"
        :key="optInd"
      >
        {{opt}}
      </button>
    </div>
  </div>
  <div>
    <h5 class="d-inline-block">Quanty:</h5>
    <div class="d-inline-block">
      <button class="btn" @click="addqty(1, true)"> <i class="lnr lnr-circle-minus"></i> </button>
      <p class="mb-0 mx-2 d-inline-block" style="width: 22px">{{qty}}</p>
      <button class="btn" @click="addqty(1)"> <i class="lnr lnr-plus-circle"></i> </button>
    </div>
  </div>
  <div class="pt-5">
    <button class="btn btn-lg btn-block bg-pink" @click="$emit('addtocart', [getScOptions, qty, scItemPrice])">Add to Cart</button>
  </div>
</div>
</template>

<script>
export default {
  name: 'itemSelect',
  props: {

  },
  data(){
    return {
      baseprice: 250,
      qty:1,
      variations:{
        Size:{
          selected:0,
          options:['S', 'M', 'L', 'XL'],
          pricediff:[0, 0, 0, 0],
          stock:[7,7,7,7]
        },
        "Pack Assortment":{
          selected:0,
          options:["Singles", "Pack of 3"],
          pricediff:[0, 425],
          stock:[6,10]
        }
      }
    }
  },
  computed:{
    scItemPrice(){
      let base = this.baseprice
      let opts = Object.values(this.variations)
      for (var i = 0; i < opts.length; i++) {
        base += opts[i].pricediff[opts[i].selected]
      }
      return base
    },
    scPrice(){
      return this.scItemPrice * this.qty
    },
    getScOptions(){
      var retObj = {}
      var keys = Object.keys(this.variations)
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i]
        retObj[key] = this.variations[key].options[this.variations[key].selected]
      }
      return retObj
    }
  },
  methods:{
    addqty(num, nega = false){
      if(nega){
        if(this.qty > 1){
          this.qty -= num
        }
      } else{
        //add
        this.qty += num
      }
    },
    optselect(vTitle, optInd){
      this.variations[vTitle].selected = optInd
    }
  },
}
</script>
