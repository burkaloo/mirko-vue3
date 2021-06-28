<template>
<div class="">
  <h1 class="mt-4 text-green font-weight-bold"><s class="pesosign"></s><span class="header-font ms-2">{{scPrice}}</span></h1>
  <div class="d-flex align-content-around flex-wrap">
    <div v-for="(vObj, vTitle) in variations" class="my-4 ms-3 d-inline-block" :key="vTitle" style="max-width: 250px">
      <div>
        <h5 :class=" varignored.includes(vTitle.toLowerCase()) ? 'text-muted' : '' ">{{vTitle}}:</h5>
        <div>
          <button v-for="(opt, optInd) in vObj.options"
            :class="vObj.selected == optInd && !varignored.includes(vTitle.toLowerCase()) ? 'btn border border-pink bg-pink mx-2 my-1' : 'btn border mx-2 my-1'"
            :key="optInd"
            :disabled="varignored.includes(vTitle.toLowerCase())"
            @click="$emit('optclick',[vTitle, optInd])"
          >
            {{opt}}
          </button>
        </div>
      </div>
    </div>
  </div>

  <div>
    <p class="text-danger" v-html="notes"></p>
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
    baseprice:{},
    variations:{}
  },
  data(){
    return {
      qty:1
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
      let retObj = {}
      let keys = Object.keys(this.variations)
      for (var i = 0; i < keys.length; i++) {
        let key = keys[i]
        if(!this.varignored.includes(key.toLowerCase())){
          retObj[key] = this.variations[key].options[this.variations[key].selected]
        }
      }
      return retObj
    },
    notes(){
      let keys = Object.keys(this.variations)
      let notestr = ""
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i]
        if(!this.varignored.includes(key.toLowerCase())){
          var note = this.variations[key].notes[this.variations[key].selected]
          notestr += key > 0 ? "\n" : ""
          notestr += note == "" ? "" : `📄 ${note} <br>`
        }
      }
      return notestr
    },
    varignored(){
      let ret = []
      let keys = Object.keys(this.variations)
      for (var i = 0; i < keys.length; i++) {
        let key = keys[i]
        ret = ret.concat(this.variations[key].ignore[this.variations[key].selected])
      }
      return ret
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
    }
  },
}
</script>
