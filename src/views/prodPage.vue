<template>
    <div>
      <div v-if="prod != null" class="container mt-5">
        <div class="row">
          <div class="col-12 col-md-6">
            <photoShow :imgs="prod.imgs" :imgfocus="imgfocus" @imgjump="imgjump"/>
          </div>

          <div class="col-12 col-md-6">
            <div class="ps-3">
              <h1 class="mt-5 mt-md-0">{{prod.title}}</h1>
              <itemSelect
                :baseprice="prod.baseprice"
                :variations="prod.variations"
                :skucount="siteconf.variationskucount"
                :tagline="prod.tagline"
                @addtocart="pushtitle"
                @optclick="optselect"
                @priceupdate="priceupdate"
                @alert="alert"
              />

              <div class="accordion-flush mt-5" id="accordionExample">
                <div v-if="details !== null && 'detailpoints' in details" class="accordion-item">
                  <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      DETAILS
                    </button>
                  </h2>
                  <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                      <p v-for="(point, pInd) in details.detailpoints" class="mb-2" :key="pInd" v-html="point"></p>
                    </div>
                  </div>
                </div>
                <div v-if="details !== null && 'carepoints' in details" class="accordion-item">
                  <h2 class="accordion-header" id="headingThree">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                      CARE
                    </button>
                  </h2>
                  <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                      <p v-for="(point, pInd) in details.carepoints" class="mb-2" :key="pInd" v-html="point"></p>
                    </div>
                  </div>
                </div>
                <div v-if="details !== null && 'sizechart' in details" class="accordion-item">
                  <h2 class="accordion-header" id="headingTwo">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                      SIZE GUIDE
                    </button>
                  </h2>
                  <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                      <sizeChart
                        :header="details.sizechart.header"
                        :body="details.sizechart.body"
                        :note="details.sizechart.note"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br>
        <br>

        <div v-if="details !== null && 'testimonials' in details" class="position-relative">
          <div class="nav-guide back fade-to-right">
            <div class="nav-word">
                <p> <i class="lnr lnr-chevron-left-circle ms-3 hoverpointer" @click="clickmove(false)"></i> </p>
            </div>
          </div>
          <div class="testibox mt-5" @mousedown="mdown" @mouseleave="mleave" @mouseup="mup" @mousemove="mmove">
            <ul class="list-group list-group-horizontal" :style="{width: testiwidth}">
              <li v-for="(detobj, detInd) in details.testimonials" :key="detInd" class="list-group-item border mx-2 testicard d-inline-block">
                <p class="testitext">{{detobj.text}}</p>
                <p>{{detobj.author}}</p>
              </li>
            </ul>
          </div>
          <div class="nav-guide next fade-to-left">
            <div class="nav-word end-0">
              <p> <i class="lnr lnr-chevron-right-circle me-3 hoverpointer" @click="clickmove"></i> </p>
            </div>
          </div>
        </div>
        <br>
        <hr>
        <section v-if="Wrelatedprods">
          <h4 class="fw-bold mt-5 mb-3">More From Mirko</h4>
          <div class="row row-cols-2 row-cols-sm-3 row-cols-lg-4 row-cols-xl-6">
            <div v-for="(rprod, rprodInd) in relatedprods.slice(0,6)" :key="rprodInd" :class="rprodInd > 3 ? 'col d-none d-sm-block d-lg-none d-xl-block' : 'col'">
              <div class="hovershadow hoverpointer border" @click="$emit('page',{path:'/product/'+ rprod.pid})">
                <img :src="rprod.thumb" alt="" class="img-fluid">
                <p class="fw-bolder px-2 mt-2 mb-0 text-truncate">{{rprod.title}}</p>
                <p class="text-danger px-2"><s class="pesosign"></s>{{rprod.price}}</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <spinner :show="spinnershow"/>
    </div>

</template>

<script>
const axios = require('axios');

import sizeChart from '@/components/sizeChart.vue'
import itemSelect from '@/components/itemSelect.vue'
import photoShow from '@/components/photoShow.vue'
import spinnerMix from '@/mixin/spinnerMix.js'
export default {
  name: 'prodPage',
  components:{sizeChart, itemSelect, photoShow},
  mixins:[spinnerMix],
  props:{
    pid: {},
    backend: {},
    siteconf: {},
  },
  data(){
    return {
      imgfocus:0,
      price: 0,
      prod : null,
      details: null,
      accordiontab: null,
      isDown: false,
      startX: 0,
      scrollLeft:0,
      relatedprods:[]
    }
  },
  watch:{
    pid(){
      this.getprod()
    },
    Wrelatedprods(newval){
      if(newval){
        this.getrelated()
      } else{
        this.relatedprods = []
      }
    }
  },
  mounted(){
    this.getprod()

  },
  methods:{
    mdown(e){
      let slider = document.querySelector('.testibox');
      this.isDown = true;
      slider.classList.add('active');
      this.startX = e.pageX - slider.offsetLeft;
      this.scrollLeft = slider.scrollLeft;
    },
    mleave(){
      let slider = document.querySelector('.testibox');
      this.isDown = false;
      slider.classList.remove('active');
    },
    mup(){
      let slider = document.querySelector('.testibox');
      this.isDown = false;
      slider.classList.remove('active');
    },
    mmove(e){
      let slider = document.querySelector('.testibox');
      if(!this.isDown) return;
      e.preventDefault();
      let x = e.pageX - slider.offsetLeft;
      let walk = (x - this.startX) * 1; //scroll-fast-ish
      slider.scrollLeft = this.scrollLeft - walk;
    },
    clickmove(mode = true){
      let slider = document.querySelector('.testibox');
      slider.scrollLeft += mode ? 40 : -40;
    },
    alert(data){
      this.$emit("alert", data)
    },
    accordiontoggle(tab){
      if(this.accordiontab == tab){
        this.accordiontab = null
      } else{
        this.accordiontab = tab
      }
    },
    imgjump(data){
      this.imgfocus = data
    },
    pushtitle(data){
        //incoming array -> [getScOptions, qty, scItemPrice, compilesku]
        data[3] =  this.compilesku + data[3]
        data.push(this.prod.title)
        data.push(this.pid)
        //console.log(data)
        this.$emit('cartinput', data)
      //use SKU
    },
    optselect(data){
      this.prod.variations[data[0]].selected = data[1]
      let imgind = data[2] - 1
      if(imgind > -1 ){
        this.imgjump(imgind)
      }
    },
    priceupdate(data){
      this.price = data
    },
    getprod(){
      this.spinnertoggle(true)
      this.prod = null
      this.details = null
      let comp = this
      axios.post(this.backend, {statement: "getprodbyid", pid : this.pid})
      .then(function(res){
        if(res.data.status == "success"){
          let newprod = res.data.response[0]
          newprod.baseprice = parseInt(newprod.baseprice)
          newprod.imgs = JSON.parse(newprod.imgs)
          newprod.variations = JSON.parse(newprod.variations)

          if(newprod.variations === null){
            newprod.variations = {}
          } else{
            //edit variations count on disable less 1
            let vars = Object.keys(newprod.variations)
            vars.forEach((varTitle) => {
              newprod.variations[varTitle].disable.forEach((disobj) => {
                let disobjkeys = Object.keys(disobj)
                disobjkeys.forEach((disobjkey) => {
                  disobj[disobjkey].forEach((item, itemInd) => {
                    disobj[disobjkey][itemInd] -= 1
                  });

                });
              });

            });

          }
          comp.prod = newprod
          comp.spinnertoggle(false)
        }
      })

      axios.post(this.backend, {statement: "getproddetails", pid : this.pid})
      .then(function(res){
        if(res.data.status == "success"){
          let dets = {}
          res.data.response.forEach((det) => {
            dets[det.item] = JSON.parse(det.data)
            /*if(det.active){
            } else{
              dets[det.item] = Array.isArray(det.data) ? [] : {}
            }*/
          })
          comp.details = dets
        }
      })
    },
    getrelated(){
      let pidlist = ""
      this.details.relatedprods.forEach((pid) => {
        pidlist += ","
        pidlist += pid.toString()
      });
      let comp = this
      axios.post(this.backend, {statement: "getselectedlist", pidlist : pidlist.substring(1)})
      .then(function(res){
        if(res.data.status == "success"){
          let resarr = res.data.response
          //console.log(resarr)
          resarr.forEach((item) => {
            comp.relatedprods.push({title: item.title, price: item.baseprice, thumb: item.thumb, pid: item.id})
          });
        }
      })
    }
  },
  computed:{
    compilesku(){
      let skustr = ""
      if(this.prod["SKU"] == null || this.prod["SKU"] == "" || parseInt(this.prod["SKU"]) == 0 ){
        for (let x = 0; x < parseInt(this.siteconf.productskucount); x++) {
          skustr += "#"
        }
      } else{
        let sku = this.prod["SKU"]
        skustr += typeof sku == "string" ? sku : sku.toString()
        //let extracount = typeof sku == "string" ? sku.length : sku.toString().length
        for (let x = sku.length; x < parseInt(this.siteconf.productskucount); x++) {
          skustr += "0"
        }
      }
      return skustr
    },
    testiwidth(){
      let px = this.details.testimonials.length * 420
      return px.toString() + 'px';
    },
    Wrelatedprods(){
      if(this.details !== null && 'relatedprods' in this.details && this.details.relatedprods.length > 0){
        return true
      } else{
        return false
      }
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.nav-guide{
  position: absolute;
  bottom: 0;
  z-index: 2;
  top: 0;
}

.next{
  right: 0;
  padding-left: 60px;
  text-align: right;
}

.back{
  left: 0;
  padding-right: 60px;
}

.accordion-button:not(.collapsed){
  background-color: white;
  color: black;
}

.accordion-button{
  width: auto;
  border: none;
  padding-right: 20px;
}

.accordion-button::after{
  margin-left: 20px;
}

.accordion-button:focus {
  outline: none;
  box-shadow: none;
}

.accordion-item:last-of-type .accordion-collapse {
  border: none;
}

.testicard{
  width: 400px;
  border-radius: 20px !important;
  background-color: #ededed
}

.testibox{
  overflow-x: auto;
  width: 100%;
  scrollbar-width: none;
}

.items.active {
  cursor: grabbing;
  cursor: -webkit-grabbing;
  transform: scale(1);
}

.testibox::-webkit-scrollbar {
  width: 0px;               /* width of the entire scrollbar */
}

.testitext{
  height: calc(100% - 50px);
}

.fade-to-right{
    background-image: -moz-linear-gradient(left, rgba(255,255,255,1), rgba(255,255,255,0));
    background-image: -webkit-gradient(linear, 0 0, 0 100%, from(rgba(255,255,255,1)), to(rgba(255,255,255,0)));
    background-image: -webkit-linear-gradient(left, rgba(255,255,255,1), rgba(255,255,255,0));
    background-image: -o-linear-gradient(left, rgba(255,255,255,1), rgba(255,255,255,0));
    background-image: linear-gradient(to right, rgba(255,255,255,1) 70%,rgba(255,255,255,0) 90%);
    background-repeat: repeat-x;
}

.fade-to-left{
    background-image: -moz-linear-gradient(right, rgba(255,255,255,1), rgba(255,255,255,0));
    background-image: -webkit-gradient(linear, 0 0, 0 100%, from(rgba(255,255,255,1)), to(rgba(255,255,255,0)));
    background-image: -webkit-linear-gradient(right, rgba(255,255,255,1), rgba(255,255,255,0));
    background-image: -o-linear-gradient(right, rgba(255,255,255,1), rgba(255,255,255,0));
    background-image: linear-gradient(to left, rgba(255,255,255,1) 60%,rgba(255,255,255,0));
    background-repeat: repeat-x;
}

.nav-word{
  position: absolute;
  top: 45%;
}

ul{
  padding-left: 40px;
  padding-right: 40px;
}
</style>
