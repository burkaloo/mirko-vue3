<template>
<div class="">
  <h1 class="mt-4 text-green font-weight-bold"><s class="pesosign"></s><span class="header-font ms-2">{{scPrice}}</span></h1>
  <div class="d-flex align-content-around flex-wrap">
    <div v-for="(vObj, vTitle) in variations" class="my-4 ms-3 d-inline-block" :key="vTitle" style="max-width: 250px">
      <h5 class="text-green">{{vTitle}}:</h5>
      <div>
        <button v-for="(opt, optInd) in vObj.options"
          :class="vObj.selected == optInd ? 'btn border border-pink bg-pink mx-2 my-1' : 'btn border mx-2 my-1'"
          @click="optselect(vTitle, optInd)"
          :key="optInd"
        >
          {{opt}}
        </button>
      </div>
    </div>
  </div>

  <div>
    <p class="text-danger">{{notes}}</p>
    <h5 class="d-inline-block">Quantity:</h5>
    <div class="d-inline-block">
      <button class="btn" @click="addqty(1, true)"> <i class="lnr lnr-circle-minus"></i> </button>
      <p class="mb-0 mx-2 d-inline-block" style="width: 22px">{{qty}}</p>
      <button class="btn" @click="addqty(1)"> <i class="lnr lnr-plus-circle"></i> </button>
    </div>
  </div>
  <div class="pt-5">
    <button class="btn btn-lg btn-block bg-pink header-font" @click="$emit('addtocart', [getScOptions, qty, scItemPrice])">Add to Cart</button>
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
      baseprice: 275,
      qty:1,
      variations:{
        Size:{
          selected:0,
          options:['S', 'M', 'L', 'XL'],
          pricediff:[0, 0, 0, 0],
          notes:["", "", "", ""]
        },
        "Pack Assortment":{
          selected:0,
          options:["Singles", "Pack of 3", "Assorted Pack of 3"],
          pricediff:[0, 475, 475],
          notes:["", "", "Please indicate your assorted pack sizes at checkout"]
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
    },
    notes(){
      var keys = Object.keys(this.variations)
      var notestr = ""
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i]
        var note = this.variations[key].notes[this.variations[key].selected]
        notestr += key > 0 ? "\n" : ""
        notestr += note == "" ? "" : `📄 ${note}`
      }
      return notestr
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
