<template>
    <div class="container pt-5 maintemp">
      <h5 class="fw-bold">Help</h5>
      <div class="row my-4">
        <div class="col-xl-4 ps-4">
          <p @click="boxscroll('return')">Return Policy</p>
          <p @click="boxscroll('replacement')">Replacement</p>
          <p @click="boxscroll('cancel')">Order Cancellation</p>
          <p @click="boxscroll('delivery')">Delivery</p>
          <p @click="boxscroll('payments')">Payment Portals</p>
          <p @click="boxscroll('bulk')">Bulk Orders</p>
          <p @click="boxscroll('gift')">Gift Services</p>
          <p @click="boxscroll('reseller')">Reseller Program</p>
        </div>
        <div class="col-xl-8">
          <div class="border content-wrapper" id="scrollbox" >
            <section id="return">
              <p class="fw-bold">Return Policy.</p>
              <p>
                Products in the feminine hygiene line may not be returned or exchanged due to sanitary reasons. If there are any concerns with the item (i.e. manufacturing faults), please contact us so we can look into it and offer the best solution. A special discount or replacement may be provided instead. Manufacturing faults should be reported to the Mirko team within 48 hours upon receipt of the item to be considered for replacement.
              </p>
              <p>
                Items that have been sent for alteration may not be returned, exchanged, or replaced.
              </p>
            </section>
            <section id="replacement">
              <p class="fw-bold">
                Replacements.
              </p>
              <p>
                In case of replacement approval for damaged or faulty items, shipping fee to send a replacement will be shouldered by Mirko.
              </p>
            </section>
            <section id="cancel">
              <p class="fw-bold">
                Order Cancellation.
              </p>
              <p>
                Orders may be cancelled at any time prior to payment. Cancellations will not be entertained once payment has been made to avoid errors in the operational flow.
              </p>
            </section>
            <section id="delivery">
              <p class="fw-bold">
                Delivery.
              </p>
              <p>
                We ship out from Quezon City every MWF. Our standard delivery timeline is currently 3-5 days for Metro Manila and 5-7 days for provincial locations (except for very far flung areas).
                <br>
                Shipping fees will be shouldered by the buyer and paid with the item. Fees are P100 for Metro Manila and Greater Manila Area standard delivery, Php 150 for provincial (Luzon), and P200 for Visayas and Mindanao areas.
                <br>
                We also allow delivery via same-day delivery services within and near Metro Manila. For same-day delivery, fees will be based on the rates of client’s chosen third party logistics.
              </p>
            </section>
            <section id="payment">
              <p class="fw-bold">
                Payment Portals.
              </p>
              <p>
                Orders made through the Mirko website and Instagram and Facebook pages currently accept payments through BDO, BPI, GCash, Cash-On-Delivery, and Paypal. Additional payment options such as via ShopeePay and credit cards are also available at our Shopee Page - shopee.ph/mirkoph. Please message us on our social media accounts about your options.
              </p>
            </section>
            <section id="bulk">
              <p class="fw-bold">
                Bulk Orders.
              </p>
              <p>
                Orders exceeding a maximum of 10 packs are considered bulk orders. Please message us on our social media accounts so we can facilitate your request smoothly.
              </p>
            </section>
            <section id="gift">
              <p class="fw-bold">
                Gift Services
              </p>
              <p>
                We currently utilize a minimal and delicate boxing set-up which may run the risk of damages due to logistics handling when delivered to provinces. We love that our clients choose to gift the women in their lives with Mirko essentials - we can offer special gift boxes or arrangements to ensure packaging preservation for special occasions.
                <br>
                Gift receipts may also be arranged upon request.
              </p>
            </section>
            <section id="reseller" :style="{paddingBottom: padheight}">
              <p class="fw-bold">
                Resellers
              </p>
              <p class="m-0">
                Mirko PH is looking for brand ambassadors who can join a growing reseller program! If you have a specific location you want to target and are passionate about our advocacy for easy and elegant women’s essentials, do send us a message so we can explore working together.
              </p>
            </section>
            <div>
            </div>
          </div>
        </div>
      </div>
    </div>

</template>

<script>



export default {
  name: 'aboutMirko',
  data(){
    return{
      padheight: '0px'
    }
  },
  props:{
    section: {defualt: null}
  },
  mounted(){
    this.setpadding()
    window.addEventListener('resize', this.setpadding);
    if(this.section != null){
      this.boxscroll(this.section)
    }
  },
  beforeUmount(){
    window.removeEventListener("resize", this.setpadding);
  },
  methods:{
    boxscroll(elid){
      let parent = document.getElementById('scrollbox')
      let childtop =  document.getElementById(elid).offsetTop - parent.offsetTop - 10
      parent.scrollTop = childtop
    },
    setpadding(){
      let parent = document.querySelector('#scrollbox')
      let lastchild =  document.querySelector('#reseller')
      let total = parent.offsetHeight - lastchild.offsetHeight -10
      //console.log(parent)
      this.padheight = total < 10 ? '10px' : (total - 10 ).toString() + 'px'
    }
  },
  computed:{
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  img{
    max-width: 120px;
    height: auto;
  }
  .content-wrapper{
    scroll-behavior: smooth;
    height: calc(100vh - 112px - 10rem);
    overflow: scroll;
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
  }
</style>
