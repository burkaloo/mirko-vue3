<template>
    <div class="container px-5 min-vh-100">
      <div class="row mt-5">
        <div class="col-12">
          <div class="fs-4 fw-6 fst-italic text-center">
            Frequently Asked Questions
          </div>
          <div class="accordion-flush mt-5" id="accordionExample">
            <div v-for="(qa, ind) in data" class="accordion-item" :key="ind">
              <h2 class="accordion-header" :id="'heading' + ind">
                <button class="accordion-button collapsed fw-6" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse'+ ind" aria-expanded="false" aria-controls="collapse'+ ind">
                  {{qa[0]}}
                </button>
              </h2>
              <div :id="'collapse'+ ind" class="accordion-collapse collapse" :aria-labelledby="'heading'+ ind" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  <div v-for="(point, pInd) in qa[1]" class="mb-2" :key="pInd">
                    <p>{{point}}</p>
                    <br>
                  </div>
                </div>
              </div>
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
      data:[
        ["Return Policy",["Products in the feminine hygiene line may not be returned or exchanged due to sanitary reasons. If there are any concerns with the item (i.e. manufacturing faults), please contact us so we can look into it and offer the best solution. A special discount or replacement may be provided instead. Manufacturing faults should be reported to the Mirko team within 48 hours upon receipt of the item to be considered for replacement.","Items that have been sent for alteration may not be returned, exchanged, or replaced."]],
        ["Replacement",["In case of replacement approval for damaged or faulty items, shipping fee to send a replacement will be shouldered by Mirko."]],
        ["Order Cancellation.",["Orders may be cancelled at any time prior to payment. Cancellations will not be entertained once payment has been made to avoid errors in the operational flow."]],
        ["Delivery",["We ship out from Quezon City every MWF. Our standard delivery timeline is currently 3-5 days for Metro Manila and 5-7 days for provincial locations (except for very far flung areas)."]],
        ["Payment Portals",["Orders made through the Mirko website and Instagram and Facebook pages currently accept payments through BDO, BPI, GCash, Cash-On-Delivery, and Paypal. Additional payment options such as via ShopeePay and credit cards are also available at our Shopee Page - shopee.ph/mirkoph. Please message us on our social media accounts about your options."]],
        ["Bulk Orders.",["Orders exceeding a maximum of 10 packs are considered bulk orders. Please message us on our social media accounts so we can facilitate your request smoothly."]],
        ["Gift Services",["We currently utilize a minimal and delicate boxing set-up which may run the risk of damages due to logistics handling when delivered to provinces. We love that our clients choose to gift the women in their lives with Mirko essentials - we can offer special gift boxes or arrangements to ensure packaging preservation for special occasions.","Gift receipts may also be arranged upon request."]],
        ["Resellers Program",["Mirko PH is looking for brand ambassadors who can join a growing reseller program! If you have a specific location you want to target and are passionate about our advocacy for easy and elegant women’s essentials, do send us a message so we can explore working together."]]
      ]
    }
  },
  props:{
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
</style>
