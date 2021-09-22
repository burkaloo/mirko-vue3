<template>
  <div class="container py-5">
    <div class="row">
      <div :class="showsummary ? 'col-12 col-md-7 pe-5 pb-5' : 'col-12'">

        <div class="row my-5 pe-5">
          <div class="col-12 col-sm-9 order-2 order-sm-1 d-flex justify-content-start">
            <p v-for="(tabitem, ind) in tabopts" :key="ind" :class="tab == tabitem ? 'mx-3 text-black' : 'mx-3 text-muted'">{{tabitem}}</p>
          </div>
          <div class="col-12 col-sm-3 order-1 order-sm-2 d-flex mb-4 mb-sm-0">
            <h3 v-if="!showsummary" class="ms-auto mb-0 hoverpointer" @click="summarytoggle">
              <i class="lnr lnr-arrow-left"></i> Cart
            </h3>
          </div>
        </div>

        <div v-if="tab == 'Information'" class="row pe-5">
          <div class="col-12 mb-5 hoverpointer">
            <small @click="emit('page','cart')"><i class="lnr lnr-chevron-left"></i> <u>back to cart</u></small>
          </div>
          <div class="col-12">
            <h5 class="mb-4">Contact Information</h5>
          </div>
          <div class="col-12">
            <input class="form-control" type="text" v-model.trim="name" placeholder="name">
          </div>
          <div class="col-12">
            <input class="form-control mt-4" type="text" v-model.trim="email" placeholder="email">
            <small>We will send a copy of your order here</small>
          </div>
          <div class="col-12">
            <div class="input-group mt-3">
              <span class="input-group-text" id="basic-addon1">+63</span>
              <input class="form-control" type="text" v-model.trim="phone" placeholder="cellphone number">
            </div>
            <small>Number to be used to contact you during shipping</small>
          </div>
          <div class="col-12">
              <button class="btn btn-dark fw-bold px-5 mt-5" @click="gotoshipping">Continue to Shipping</button>
          </div>
        </div>

        <div v-else-if="tab == 'Shipping'" class="row pe-5">
          <div class="col-12 mb-5 hoverpointer">
            <small @click="changetab('Information')"><i class="lnr lnr-chevron-left"></i> <u>Contact Information</u></small>
          </div>
          <div class="col-12">
            <h5 class="hoverpointer">Shipping Information</h5>
          </div>
          <div class="col-12 mt-3">
            <input class="form-control" type="text" v-model.trim="address" placeholder="Street Address">
          </div>
          <div class="col-12 mt-3">
            <input class="form-control" type="text" v-model.trim="brgy" placeholder="Barangay">
          </div>
          <div class="col-12 mt-3">
            <select class="form-select" v-model="city" :disabled="cityOptions.length == 0">
              <option v-show="city == 'Province Required'" disabled>Province Required</option>
              <option disabled>Select City</option>
              <option v-for="(option, index) in cityOptions" :key="index" :value="option">{{option.name}}</option>
            </select>
          </div>
          <div class="col-12 mt-3">
            <select class="form-select" v-model="province">
              <option disabled>Select Province</option>
              <option v-for="(option, index) in provinceOptions" :key="index" :value="option">{{option.name}}</option>
            </select>
          </div>
          <div class="col-12 mt-3">
            <input class="form-control" type="text" v-model.trim="zip" placeholder="Zipcode">
          </div>
          <div class="col-12 mt-3">
            <input class="form-control" type="text" v-model.trim="notes" placeholder="notes to seller">
          </div>

          <div class="col-12 my-2">
            <hr>
          </div>

          <div class="col-12">
            <div class="bg-grey p-4 rounded">
              <div class="form-check">
                <div class="d-flex ">
                  <input value="Standard" class="form-check-input" type="radio" name="standard" id="standard" v-model="shipmeth">
                  <label class="form-check-label ms-4" for="standard">
                    Standard Shipping
                    <span v-if="city.score > 1">(5-7 Days)</span>
                    <span v-else-if="city.score == 1">(3-5 Days)</span>
                  </label>
                  <label class="ms-auto">{{(typeof city == 'string' ? '-' : shipcosttable.Standard[city.score -1 ])}}</label>
                </div>
              </div>
              <hr>
              <div class="form-check">
                <div class="d-flex">
                  <input value="Same Day" class="form-check-input" type="radio" id="sameday" name="sameday" v-model="shipmeth" :disabled="province.id != 53">
                  <label class="form-check-label ms-4" for="sameday">Same Day (Grab/Lalamove for Metro Manila only)</label>
                  <label :class="province.id != 53 ? 'ms-auto text-muted' : 'ms-auto'"> {{(typeof city == 'string' ? '-' : shipcosttable["Same Day"][city.score - 1])}} </label>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12">
              <button class="btn btn-dark fw-bold px-5 mt-5" @click="gotopayment">Continue to Payment</button>
          </div>
        </div>

        <div v-else-if="tab == 'Payment'" class="row pe-5">
          <div class="col-12 mb-5">
            <small @click="changetab('Shipping')"><i class="lnr lnr-chevron-left"></i> <u>Shipping</u></small>
          </div>
          <div class="col-12 mb-3">
            <div class="bg-grey p-4 rounded">
              <div class="form-check">
                <div class="d-flex ">
                  <input value="Gcash" class="form-check-input" type="radio" name="gcash" id="gcash" v-model="pay">
                  <label class="form-check-label ms-4" for="gcash">
                    <p class="mb-0">Gcash</p>
                    <small>0920 566 3896</small>
                  </label>
                </div>
              </div>
              <hr>
              <div class="form-check">
                <div class="d-flex">
                  <input value="BDO" class="form-check-input" type="radio" name="bdo" id="bdo" v-model="pay">
                  <label class="form-check-label ms-4" for="bdo">
                    <p class="mb-0">BDO Online</p>
                    <small>0017 0031 5240</small>
                  </label>
                </div>
              </div>
              <hr>
              <div class="form-check">
                <div class="d-flex">
                  <input value="BPI" class="form-check-input" type="radio" name="bpi" id="bpi" v-model="pay">
                  <label class="form-check-label ms-4" for="bpi">
                    <p class="mb-0">BPI Online</p>
                    <small>1579 2769 63</small>
                  </label>
                </div>
              </div>
              <hr>
              <div class="form-check">
                <div class="d-flex">
                  <input value="COD" class="form-check-input" type="radio" name="cod" id="cod" v-model="pay">
                  <label class="form-check-label ms-4" for="cod">
                    <p class="mb-0">COD</p>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 mb-4">
            <label v-if="pay != 'COD' && pay != ''" class="form-label">Proof of Payment</label>
            <div v-if="file.url != null" class="file-prev" :style="'background-image:url('+file.url+')'">
              <button class="btn-close position-absolute end-0 mt-1 bg-light" @click="removefile"></button>
            </div>
          </div>
          <div class="col-12">
            <div v-if="paymsg" class="grey-out position-fixed top-0 start-0 vh-100 vw-100 file-overlay">
              <div class="px-3" style="margin-top:15vh">
                <div class="mx-auto pay-wrapper bg-grey p-3">
                  <h4>Payment Details</h4>
                  <p>1. Please deposite to the following details:</p>
                  <p v-for="(item, i) in paydetails[pay]" :key="i" class="ms-3 mb-0 fw-bold">{{item}}</p>
                  <p class="mt-3">2. Upload Proof of payment</p>
                  <div class="file-box text-center">
                    <div class="file-label">Upload File</div>
                    <input class="file-input" type="file" @change="previewFiles" accept="image/png, image/gif, image/jpeg">
                  </div>
                  <div class="text-center">
                    <button class="btn bg-pink mt-4" @click='resetpaymeth'>Change Payment Method</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12">
            <button class="btn btn-dark fw-bold px-5 mt-5" @click="gotocheckout">
              <span v-if="showsummary">Complete Checkout</span>
              <span v-else>Complete Checkout</span>
            </button>
          </div>
        </div>
      </div>

      <div :class="showsummary ? 'col-12 col-md-5 ps-5 pb-5 border-start border-2' : 'col-0 d-none'">
        <div v-show="showsummary" class="row sticky-md px-5 p-md-0">
          <div class="col-12 pt-4 pt-md-0">
            <div class="my-5">
              <h3 class="mb-3" @click="summarytoggle">
                <i class="lnr lnr-arrow-right"></i>
              </h3>
              <h5 class="fw-bold">Your Cart </h5>
            </div>
            <div v-html="cartprods">
            </div>
            <table class="table">
              <tr>
                <td>Cart Total:</td>
                <td class="text-end">{{carttotal}}</td>
              </tr>
              <tr>
                <td>Shipping Fee</td>
                <td class="text-end">{{shipcost}}</td>
              </tr>
              <tr>
                <td>Total</td>
                <td class="text-end">{{withshipping}}</td>
              </tr>
            </table>
            <div v-show="shipmeth == 'Same Day'" class="mt-5 text-danger">
              We will contact you for the exact delivery fee after check out. Kindly note that shipping will come from Manila or QC.
            </div>
          </div>
          <div v-show="oktocheckout" class="col-12">
            <button class="btn btn-dark fw-bold px-5 mt-5" @click="checkout">Complete Checkout</button>
          </div>
        </div>

      </div>
    </div>
    <spinner :show="spinnershow"/>
  </div>

</template>

<script>
import axios from 'axios'
import spinnerMix from '@/mixin/spinnerMix.js'
import stringMix from '@/mixin/stringMix.js'

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

export default {
  name: "checkout",
  data(){
    return{
      showsummary: false,
      tab: "Information",
      tabopts: ["Information", "Shipping", "Payment"],
      baseurl: 'https://mirkophp.navitag.net/',
      name: "",
      phone: null,
      email:"",
      province: "Select Province",
      city: "Province Required",
      shipmeth: "Standard",
      pay:"",
      paydetails:{"BDO":['Camille Deezhialyn And Tan', '001700315240'], "BPI": ['Camille Deezhialyn And Tan', '1579276963'], "GCash": ['Camille Deezhialyn And Tan', '0920 566 3896'] },
      provinceOptions: [],
      cityOptions:[],
      address: "",
      brgy:"",
      zip:"",
      notes:"",
      file: {
        url: null,
        rawfile: null,
        name: null
      },
      paymsg: false,
      shipcosttable:{
        "Same Day":["-","-","-"],
        "Standard":["PHP 100","PHP 150","PHP 200"]
      }
    }
  },
  mixins:[spinnerMix, stringMix],
  //components:{},
  props:{
    carttotal: {default: 0, type: Number},
    carttable: {type: String, default: ""},
    backend:{}
  },
  mounted(){
    if(document.documentElement.clientWidth < 768){
      this.showsummary = true
    } else{
      this.showsummary = false
    }
    if(this.carttotal == 0){
      this.$router.push({name:"home"})
    }
    //this.spinnertoggle(true)
    let comp = this
    axios.post(this.backend,  {statement: "getprovinces"})
    .then(function(res){
      if(res.data.status == "success"){

        comp.provinceOptions = res.data.response
      } else{
        //error
        console.log(res.data.response)
      }
    }).catch(function(e){
      console.log(e)
    }).finally(function(){
      comp.spinnertoggle(false)
    })
  },
  methods:{
    summarytoggle(){
      this.showsummary = !this.showsummary
    },
    changetab(tab){
      this.tab = tab
    },
    previewFiles(event) {
      if(event.target.files[0].size > 5242880){
       this.$emit('alert', {show: true, class: 'danger', text: "File size too large"});
     } else{
       this.file.url = URL.createObjectURL(event.target.files[0])
       this.file.rawfile = event.target.files[0];
       this.file.name = event.target.files[0].name
       this.paymsg = false
     }
    },
    removefile(){
      this.file.url = null
      this.file.rawfile = null
      this.file.name = null
      if(this.pay != 'COD'){
        this.paymsg = true
      }
    },
    gotoshipping(){
      if(this.infoerr === false){
        this.changetab('Shipping')
      } else{
        this.$emit('alert', this.infoerr)
      }
    },
    gotopayment(){
      if(this.shippingerr === false){
        this.changetab('Payment')
      } else{
        this.$emit('alert', this.shippingerr)
      }
    },
    gotocheckout(){
      if(this.payerr === false){
        if(this.showsummary === false){
          this.summarytoggle()
        } else{
          this.checkout()
        }
      } else{
        this.$emit('alert', this.payerr)
      }
    },
    resetpaymeth(){
      this.pay = ""
    },
    async checkout(){
      this.spinnertoggle(true)
      let titlename = this.titleCase(this.name)
      let addArr = [this.shipmeth + "<br>", titlename, this.email, this.phone + "<br>", this.address + ",",this.brgy +", "+ this.city.name + ", ", this.province.name + " " + this.zip]
      if(this.notes != ""){
        addArr.push('<br>Note: ' + this.notes)
      }

      let data = {name: titlename, email: this.email, shipinfo: addArr.join('<br>'), payment: this.pay}
      if(this.pay != 'COD'){ // for non-COD orders
        //convert img to base64
        let result = await toBase64(this.file.rawfile).catch(e => Error(e));
        if(result instanceof Error) {
            //error parsing file
            this.$emit('alert', {show: true, class: 'danger', text: "Error uploading file"})
            //remove file
            this.removefile()
            //open upload file message
            this.paymsg = true
            this.spinnertoggle(false)
            return false;
        } else{
          let fileArr = result.split(",")
          data.files = {base64: fileArr[1], name: this.file.name}
        }
      }
      //parse address
      this.spinnertoggle(false)
      this.$emit('order', data);
    },
  },
  watch:{
    shipcost: function(newval){
      this.$emit('shipcost', newval)
    },
    province: function(newval){
      if(typeof newval === 'object' && newval !== null){
        this.cityOptions = []
        this.shipmeth = "Standard"
        this.spinnertoggle(true)
        let comp = this
        axios.post(this.backend,{statement: "getcities", "province_id": newval.id})
        .then(function(res){
          if(res.data.status == "success"){
            comp.cityOptions = res.data.response
          } else{
            //error
            console.log(res.data.response)
          }
        }).catch(function(e){
          console.log(e)
        }).finally(function(){
          comp.city = "Select City"
          comp.spinnertoggle(false)
        })
      }
    },
    city(newval){
      if(newval.score > 1 || newval == "Select City"){
          this.shipmeth = "Standard"
      }
    },
    pay(newval){
      this.removefile()
      if(newval == ""){
        this.paymsg = false;
      } else if(newval != 'COD'){
        this.paymsg = true
      }
    }
  },
  computed:{
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
    withshipping(){
      if(isNaN(this.shipcost)){
        return this.carttotal
      } else{
        var total = parseFloat(this.carttotal) + this.shipcost
        return total
      }
    },
    emailvalid(){
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(this.email == ""){
        return false
      } else{
        return re.test(String(this.email).toLowerCase());
      }
    },
    cartprods(){
      return '<table class="table">' + this.carttable + '</table>'
    },
    infoerr(){
      if(this.name == ""){
        return {show: true, class: 'danger', text: "Name field is required"}
      } else if(this.phone == null || this.phone.toString().charAt(0) != "9" || this.phone.toString().length < 10){
        return {show: true, class: 'danger', text: "Invalid contact number"}
      } else if(!this.emailvalid){
        return {show: true, class: 'danger', text: "Invalid Email Address"}
      } else{
        return false
      }
    },
    shippingerr(){
      if(this.shipmeth == ""){
        return {show: true, class: 'danger', text: "Select shipping method"}
      } else if(this.brgy == ""){
        return {show: true, class: 'danger', text: "Shipping address incomplete. Barangay info required"}
      } else if(this.province == null){
        return {show: true, class: 'danger', text: "Shipping address incomplete. Select province"}
      } else if(this.city.name == null){
        return {show: true, class: 'danger', text: "Shipping address incomplete. Select city"}
      } else if(this.address == ""){
        return {show: true, class: 'danger', text: "Shipping address incomplete. No street address"}
      } else if(this.zip.length < 4){
        return {show: true, class: 'danger', text: "Shipping address incomplete. Invalid zip code"}
      } else {
        return false
      }
    },
    payerr(){
      if(this.pay == ""){
        return {show: true, class: 'danger', text: "Select payment method"}
      } else{
        return false
      }
    },
    oktocheckout(){
      if(this.infoerr === false && this.shippingerr == false && this.payerr == false){
        return true
      } else{
        return false
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pay-wrapper{
  max-width: 500px;
  width: 100%;
}

.file-box{
  position: relative;
  width: 100%;
  height: 150px;
  border: dashed
}

.file-label{
  margin-top: 65px;
  position: relative;
  z-index: 1
}

.file-prev{
  position: relative;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  background-color: white;
  height: 200px;
  width: 200px;
}

.file-input{
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.file-input:hover{
  cursor: pointer;
}

.file-overlay{
  z-index: 5;
}

small{
  font-size: 12px;
}

input[type=text]{
  height: 40px;
  background-color: #ededed;
}

textarea{
  background-color: #ededed;
}

textarea::-webkit-input-placeholder { /* Edge */
  color: grey;
  font-size: 12px;
  line-height: 12px;
}

textarea:-ms-input-placeholder { /* Internet Explorer 10-11 */
  color: grey;
  font-size: 12px;
  line-height: 12px;
}

textarea::placeholder {
  color: grey;
  font-size: 12px;
  line-height: 12px;
}

input[type=text]::-webkit-input-placeholder { /* Edge */
  color: grey;
  font-size: 12px;
  line-height: 12px;
}

input[type=text]:-ms-input-placeholder { /* Internet Explorer 10-11 */
  color: grey;
  font-size: 12px;
  line-height: 12px;
}

input[type=text]::placeholder {
  color: grey;
  font-size: 12px;
  line-height: 12px;
}

.form-check-input:checked{
  background-color: black;
  border-color: black;
}

select{
  height: 40px;
  background-color: #ededed;
}

select:disabled{
  border-color: grey;
  color: lightgrey;

}

@media (max-width: 767px) {
  .sticky-md{
    top: 70px;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    background-color: white
  }
}

</style>
