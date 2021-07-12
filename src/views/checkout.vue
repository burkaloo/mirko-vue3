<template>
  <div class="container py-5">
    <h1 class="text-center mb-5">Checkout Form</h1>
    <hr>
    <div class="row">
      <div class="col-12 col-md-7 col-lg-8">
        <div class="row">
          <div class="col-12 mb-4">
            <h4 class="fw-bold">Contact Information</h4>
          </div>
          <div class="col-12 mb-3">
            <label class="form-label">Name</label>
            <input class="form-control" v-model.trim="name">
          </div>
          <div class="col-12 mb-3">
            <label class="form-label">Mobile number</label>
            <div class="input-group">
              <span class="input-group-text" id="basic-addon1">+63</span>
              <input class="form-control" v-model.trim="phone">
            </div>
            <small>Will be used to contact you during shipping</small>
          </div>
          <div class="col-12 mb-3">
            <label class="form-label mb-0">Email</label>
            <input class="form-control" v-model.trim="email">
            <small>We will send a copy of your order here</small>
          </div>
          <div class="col-12 mb-4">
            <label class="form-label">Notes to seller</label>
            <input class="form-control" v-model.trim="notes">
          </div>
        </div>
        <hr>
        <div class="row">
          <div class="col-12 mb-4">
            <h4 class="fw-bold">Shipping Details</h4>
          </div>
          <div class="col-12 mb-3">
            <label class="form-label">Street Adress</label>
            <input class="form-control" v-model.trim="address">
          </div>
          <div class="col-12 mb-3">
            <label class="form-label">Barangay</label>
            <input class="form-control" v-model.trim="brgy">
          </div>
          <div class="col-12 col-lg-5 mb-3">
            <label class="form-label">City:</label>
            <select class="form-select" v-model="city" :disabled="cityOptions.length == 0">
              <option v-for="(option, index) in cityOptions" :key="index" :value="option">{{option.name}}</option>
            </select>
          </div>
          <div class="col-12 col-lg-5 mb-3">
            <label class="form-label">Province:</label>
            <select class="form-select" v-model="province">
              <option v-for="(option, index) in provinceOptions" :key="index" :value="option">{{option.name}}</option>
            </select>
          </div>
          <div class="col-12 col-lg-2 mb-3">
            <label class="form-label">Zip Code:</label>
            <input class="form-control" type="text" v-model.trim="zip">
          </div>
          <div class="col-12 mb-4">
            <label class="form-label">Shipping Method</label>
            <select class="form-select" v-model="shipmeth" :disabled="city.score > 1">
              <option value="Standard">Standard
                <span v-if="city.score > 1">(5-7 Days)</span>
                <span v-else-if="city.score == 1">(3-5 Days)</span>
              </option>
              <option v-if="province.id == 53" value="Same Day">Same Day (Grab/Lalamove)</option>
            </select>
            <small>Same day delivery available only for Metro Manila</small>
          </div>
        </div>
        <hr>
        <div class="row">
          <div class="col-12 mb-4">
            <h4 class="fw-bold">Payment Options</h4>
          </div>
          <div class="col-12 mb-3">
            <label class="form-label">Payment Method</label>
            <select class="form-select" v-model="pay">
              <option value="GCash">Gcash - 09205663896</option>
              <option value="BDO">BDO Online - 001700315240</option>
              <option value="BPI">BPI Online - 1579276963</option>
              <option value="COD">COD</option>
            </select>
          </div>
          <div class="col-12 mb-4">
            <label v-if="pay != 'COD' && pay != ''" class="form-label">Proof of Payment</label>
            <div v-if="file.url != null" class="file-prev" :style="'background-image:url('+file.url+')'">
              <button class="btn-close position-absolute end-0 mt-1 bg-light" @click="removefile"></button>
            </div>
          </div>
        </div>
        <hr>
      </div>
      <div class="col-12 col-md-5 col-lg-4 mt-4 mt-md-0">
        <h4 class="fw-bold mb-4">Order Summary</h4>
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
        <div class=" mt-3">
          <button class="btn bg-pink text-white btn-lg w-100 fw-bold" name="button" @click="checkout">Checkout</button>
        </div>
      </div>
    </div>

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

</template>

<script>
import axios from 'axios'

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
      baseurl: 'https://mirkophp.navitag.net/',
      name: "",
      phone: null,
      email:"",
      province: {name : null, id : null},
      city: {name:null, score: null},
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
      paymsg: false
    }
  },
  components:{

  },
  props:{
    carttotal: {default: 0, type: Number},
    carttable: {type: String, default: ""}
  },
  mounted(){
    if(this.carttotal == 0){
      this.$router.push({name:"home"})
    }
    this.$emit("load", true)
    let comp = this
    axios.post(this.baseurl+ "getprovinces.php").
    then(function(r){
      if(r.data.status == "success"){
        comp.provinceOptions = r.data.response
      } else{
        console.log(r.data.response)
      }
    }).catch(function(e){
      console.log(e)
    }).finally(function(){
      comp.$emit("load")
    })
  },
  methods:{
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
    resetpaymeth(){
      this.pay = ""
    },
    async checkout(){
      if(this.name == ""){
        this.$emit('alert', {show: true, class: 'danger', text: "Name field is required"})
      } else if(this.phone == null || this.phone.toString().charAt(0) != "9" || this.phone.toString().length < 10){
        this.$emit('alert', {show: true, class: 'danger', text: "Invalid contact number"})
      } else if(!this.emailvalid){
        this.$emit('alert', {show: true, class: 'danger', text: "Invalid Email Address"})
      } else if(this.brgy == ""){
        this.$emit('alert', {show: true, class: 'danger', text: "Shipping address incomplete. Barangay info required"})
      } else if(this.province == null){
        this.$emit('alert', {show: true, class: 'danger', text: "Shipping address incomplete. Select province"})
      } else if(this.city.name == null){
        this.$emit('alert', {show: true, class: 'danger', text: "Shipping address incomplete. Select city"})
      } else if(this.address == ""){
        this.$emit('alert', {show: true, class: 'danger', text: "Shipping address incomplete. No street address"})
      } else if(this.zip.length < 4){
        this.$emit('alert', {show: true, class: 'danger', text: "Shipping address incomplete. Invalid zip code"})
      } else if(this.pay == ""){
        this.$emit('alert', {show: true, class: 'danger', text: "Select payment method"})
      } else{
        this.$emit("load", true);
        let addArr = [this.shipmeth + "<br>", this.name, this.phone + "<br>", this.address + ",",this.brgy +", "+ this.city.name + ", ", this.province.name + " " + this.zip]
        if(this.notes != ""){
          addArr.push('<br>Note: ' + this.notes)
        }

        let data = {name: this.name, email: this.email, shipinfo: addArr.join('<br>'), payment: this.pay}
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
              return false;
          } else{
            let fileArr = result.split(",")
            data.files = {base64: fileArr[1], name: this.file.name}
          }
        }
        //parse address
        this.$emit('order', data);
      }
    },
  },
  watch:{
    shipcost: function(newval){
      this.$emit('shipcost', newval)
    },
    province: function(newval){
      this.cityOptions = []
      this.city = {name:null, score: null}
      this.shipmeth = "Standard"
      this.$emit("load", true)
      var comp = this
      axios.post(this.baseurl + "getcities.php",{
        prov: newval.id
      }).then(function(r){
        if(r.data.status == "success"){
          comp.cityOptions = r.data.response
        }
      }).finally(function(){
        comp.$emit("load")
      })
    },
    city(newval){
      if(newval.score > 1 || newval == null){
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

label{
  margin-bottom: 0
}

</style>
