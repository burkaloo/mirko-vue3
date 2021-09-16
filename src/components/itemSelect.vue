<template>
<div class="row">
  <div class="col-12">
    <h1 class="text-green font-weight-bold"><s class="pesosign"></s><span class="ms-2">{{scPrice}}</span></h1>
    <p class="mt-4">{{tagline}}</p>
  </div>
  <div class="col-12">
    <div class="d-flex align-content-around flex-wrap">
      <select class="form-select mx-2 mt-3" v-for="(vObj, vTitle) in variations" v-model="selects[vTitle]"
      :key="vTitle"
      :disabled="varignored.includes(vTitle)"
      >
        <option disabled>{{vTitle}}</option>
        <option v-for="(opt, optInd) in vObj.options"
          :class="vObj.selected == optInd && !varignored.includes(vTitle) ? ' ' : ' '"
          :key="optInd"
          :disabled="varignored.includes(vTitle) || optdisabled[vTitle].includes(optInd)"
          @click="$emit('optclick',[vTitle, optInd, vObj.imgset[optInd]])"
        >{{opt}}</option>
      </select>
    </div>

    <!--div class="d-flex align-content-around flex-wrap">
      <div v-for="(vObj, vTitle) in variations" class="my-4 ms-3 d-inline-block" :key="vTitle">
        <div>
          <h5 :class=" varignored.includes(vTitle.toLowerCase()) ? 'text-muted' : '' ">{{vTitle}}:</h5>
          <div>
            <button v-for="(opt, optInd) in vObj.options"
              :class="vObj.selected == optInd && !varignored.includes(vTitle.toLowerCase()) ? 'btn border border-pink bg-pink mx-2 my-1' : 'btn border border-secondary mx-2 my-1'"
              :key="optInd"
              :disabled="varignored.includes(vTitle.toLowerCase()) || optdisabled[vTitle].includes(optInd)"
              @click="$emit('optclick',[vTitle, optInd, vObj.imgset[optInd]])"
            >
              {{opt}}
            </button>
          </div>
        </div>
      </div>
    </div-->
    <div class="text-danger" v-html="notes"></div>
  </div>
  <div class="col-12 mt-4">
    <h5 class="d-inline-block">Quantity:</h5>
    <div class="d-inline-block">
      <button class="btn" @click="addqty(1, true)"> <i class="lnr lnr-circle-minus"></i> </button>
      <p class="mb-0 mx-2 d-inline-block" style="width: 22px">{{qty}}</p>
      <button class="btn" @click="addqty(1)"> <i class="lnr lnr-plus-circle"></i> </button>
    </div>
    <div class="d-grid d-lg-block mt-3">
      <!--button class="btn btn-lg btn-block bg-pink header-font px-lg-5" @click="$emit('addtocart', [getScOptions, qty, scItemPrice, compilesku])">Add to Cart</button-->
      <button class="btn btn-lg w-100 bg-pink header-font px-lg-5" @click="checkselect([getScOptions, qty, scItemPrice, compilesku])">Add to Cart</button>
    </div>
  </div>
</div>
</template>

<script>
Array.prototype.unique = function() {
    var a = this.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
};

export default {
  name: 'itemSelect',
  props: {
    baseprice:{},
    variations:{},
    skucount:{type: Number},
    tagline:{}
  },
  data(){
    return {
      qty:1,
      selects: {}
    }
  },
  mounted(){
    this.$emit('priceupdate', this.scPrice)
    let keys = Object.keys(this.variations)
    keys.forEach((item) => {
      this.selects[item] = item
    });

  },
  watch:{
    optdisabled(newval){
      //console.log('deepwatch')
      let keys = Object.keys(this.variations)
      outloop: for (var i = 0; i < keys.length; i++) {
        let key = keys[i]
        if(newval[key].includes(this.variations[key].selected)){
          //change selected option
          for (var x = 0; x < this.variations[key].options.length; x++) {
            let newopt = x
            if (! newval[key].includes(newopt)){
              this.$emit('optclick',[key, newopt, 0 ])

              //select reset
              //this.selects[key] = this.variations[key].options[newopt]
              this.selects[key] = key

              break outloop
            }
          }
        }
      }
    }
  },
  computed:{
    compilesku(){
      let keys = Object.keys(this.variations)
      let skustr = ""
      for (var i = 0; i < keys.length; i++) {
        let key = keys[i]
        skustr += "-"
        if(!this.varignored.includes(key.toLowerCase())){
          let sku = this.variations[key].sku[this.variations[key].selected]
          let extracount = typeof sku == "string" ? sku.length : sku.toString().length
          for (let x = extracount; x < parseInt(this.skucount); x++) {
            skustr += "0"
          }
          skustr += sku
        } else{
          for (let x = 0; x < parseInt(this.skucount); x++) {
            skustr += "#"
          }
        }
      }
      return skustr
    },
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
        if(!this.varignored.includes(key)){
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
    },
    optdisabled(){
      if(this.variations === null){
        return {}
      }


      let ret = {}
      //add each variable as empty to disabled object
      let keys = Object.keys(this.variations)
      for (var i = 0; i < keys.length; i++) {
        let key = keys[i]
        ret[key] = []
      }

      for (var y = 0; y < keys.length; y++) {

        let key = keys[y]
        //check if selected
        if(this.selects[key] !== key){
          let selectedVarDis = this.variations[key].disable[this.variations[key].selected]
          let subkeys = Object.keys(selectedVarDis)
          for (var x = 0; x < subkeys.length; x++) {
            let subkey = subkeys[x]
            ret[subkey] = ret[subkey].concat(selectedVarDis[subkey]).unique()
          }
        }
      }
      return ret
    }
  },
  methods:{
    selectclick(data){
      //[vTitle, optInd, vObj.imgset[optInd]]
      this.$emit('optclick',data)
    },
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
    checkselect(data){
      let err = false
      let keys = Object.keys(this.selects)
      for (let i = 0; i < keys.length; i++) {
        let key = keys[i]
        if(this.selects[key] == key && !this.varignored.includes(key)){
          err = true
          this.$emit('alert', {show: true, class: 'warning', text: 'Pelase select a "' + key + '" option'});
          break;
        }

      }

      if(err === false){
        this.$emit('addtocart', data)
      }
    }
  },
}
</script>

<style scoped>
button:disabled,
button[disabled]{
  border: 1px solid #999999 !important;
  background-color: #cccccc;
  color: #666666;
}

select{
  width: auto;
}


</style>
