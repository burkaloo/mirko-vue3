<template>
  <div class="container mt-5 min-vh-100">
    <!--srtoing UI -->
    <div class="row">
      <!--div class="col-12">
        <select class="form-select form-select-sm" v-model="sortpick">
          <option v-for="(opt, ind) in sortopts" :value="opt.value" :key="ind">{{opt.display}}</option>
        </select>

      </div>
      <div class="col-12">
        <div class="">
          <Slider v-model="slider.val" v-bind="slider" :min="0" :max="50" />

        </div>
      </div>
      <div class="col-12">
          <input type="text" class="form-control" v-model.trim="searchinput" @keyup.enter="search">
      </div-->
    </div>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 ">
      <div v-for="(feat, fInd) in prodstoshow" class="col p-3" :key="fInd">
        <div class=" p-2 h-100 hoverpointer" @click="$emit('page',{path: '/product/'+feat.pid})">
          <img :src="feat.thumb" class="img-fluid" alt="">
          <p class="text-center mt-3 mb-1">{{feat.name}}</p>
          <h5 class="text-center">PHP {{feat.price}}</h5>
        </div>
      </div>

    </div>
    <h1 v-if="prods.length == 0" class="text-center my-5 py-5"> No products matched search</h1>
    <div class=" mt-5 d-none">
      <pagenav :lastresult="islastresult" :totalcount="prods.length" :displaycount="siteconf.catalogdisplaylimit" :curpage="curpage" @loadnext="loadnextpage"/>
    </div>
    <spinner :show="spinnershow"/>
  </div>
</template>


<script>
//import Slider from '@vueform/slider'
import pagenav from '@/components/pagenav.vue'
import spinnerMix from '@/mixin/spinnerMix.js'
const axios = require('axios');
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export default {
  name: 'shopmirko',
  props:{
    backend:{},
    siteconf: {default: {catalogdisplaylimit:20} },
    linksearch: {default: null},
  },
  components:{
    pagenav, //Slider
  },
  mixins:[spinnerMix],
  data(){
    return{
      prods:[],
      condition: null,
      searchinput: "",
      sqloffset: 0,
      curpage: 1,
      sortpick:"",
      showfilters: false,
      lastsearch:"",
      slider:{val: [10,20]},
      islastresult: false // reset new serach
    }
  },
  mounted(){
    if(typeof this.linksearch == 'string'){
      if(this.linksearch.length < 4){
        //empty search or too short
        this.$router.push({ path: '/shop'})
      } else {
        //legit search
        this.searchinput = this.linksearch
      }
    }

    if(this.searchinput != ""){
        this.getprods(this.linksearch)
    } else{
      this.getprods()
    }
  },
  methods:{
    search(){
      if(this.searchinput.length > 3){
        this.lastsearch = this.searchinput
        //this.$emit('load', true)
        this.spinnertoggle(true)
        this.prods = []
        this.getprods(this.searchinput)

      } else{
        this.$emit('alert', {show: true, class: 'warning', text: "Search word too short"});
      }
    },
    async getprods(keyword = null){
      if(keyword == null){
        //this.$emit('load', true)
        this.spinnertoggle(true)
      }
      let comp = this
      while(isNaN(this.siteconf.catalogdisplaylimit)){
        console.log('sleep')
        await sleep(1000)
      }

      let dataobj = {statement: "getprodslist", pagenation: this.pagenation}
      if(keyword !== null){
        dataobj.keyword = keyword
      }

      if(this.condition !== null){
        dataobj.condition = this.conditionparsed
      }

      axios.post(
        this.backend + '/dbconn.php',
        dataobj
      ).then(function(res){
        if(res.data.status == "success"){
          let resarr = res.data.response
          //console.log(resarr)

          if(resarr.length < parseInt(comp.siteconf.catalogdisplaylimit)){
            comp.islastresult = true
          }

          resarr.forEach((item) => {
            let pics = JSON.parse(item.imgs)
            if("division" in item && item.division !== null){
              let div = JSON.parse(item.division)
              let opts = JSON.parse(item.options)
              let pd = JSON.parse(item.pricediff)
              let pics = JSON.parse(item.imgs)
              div.forEach((divInd) => {
                  divInd--
                  comp.prods.push({name: item.title + " " +  opts[divInd], price: parseInt(item.baseprice) + parseInt(pd[divInd]), thumb: pics[divInd], pid: item.id})
              });
              //console.log(item)
            } else{
              comp.prods.push({name: item.title, price: item.baseprice, thumb: item.thumb === null ? pics[0] : item.thumb, pid: item.id})
            }
          });
        }
      }).finally(function(){
          //comp.$emit('load', false)
          comp.spinnertoggle(false)
      })
    },
    loadnextpage(){
      this.curpage++
      let curtotal = (this.curpage * this.displaycount)
      if(curtotal < this.prods.length && !this.islastresult){
        this.sqloffset
        this.getprods(this.lastsearch == "" ? null : this.lastsearch)
      }
    },
    loadprevpage(data){
      this.curpage = data
    }
  },
  computed:{
    pagecount(){
      if(this.prods.length < 1){
        return 1
      } else{
        let res = this.prods.length / parseInt(this.siteconf.catalogdisplaylimit)
        return Math.ceil(res)
      }
    },
    conditionparsed(){
      return this.condition
    },
    pagenation(){
        let count = this.sqloffset *  parseInt(this.siteconf.catalogdisplaylimit)
        return count.toString() + ', ' +  this.siteconf.catalogdisplaylimit
    },
    sortopts(){ //beta
      if(this.searchinput == "") {
        return [
          {value: "score DESC, bscore DESC, cscore DESC", display: "Relevance"},
          {value: "p.rating_sort ASC", display: "Popularity"},
          {value: "p.baseprice ASC", display: "Price L-H"},
          {value: "p.baseprice DSEC", display: "Price H-L"}
        ]
      } else {
        return [
          {value: "p.rating_sort ASC", display: "Popularity"},
          {value: "p.baseprice ASC", display: "Price L-H"},
          {value: "p.baseprice DSEC", display: "Price H-L"}
        ]
      }
    },
    prodstoshow(){
      let offset = (this.curpage -1) * parseInt(this.siteconf.catalogdisplaylimit)
      //console.log(offset)
      let limit = offset + parseInt(this.siteconf.catalogdisplaylimit)
      return this.prods.slice(offset, limit + 1)
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
