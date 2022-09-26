<template>
  <div>
    <section>
      <div class="row g-0">
        <div class="col-12 col-md-6">
          <img class="img-fluid" :src="backend + '/photos/learn-mcups-section1.jpg'" alt="">
        </div>
        <div class="col-12 col-md-6  d-flex bg-beige">
          <div class="align-self-center flex-grow-1">
            <div :style="{maxWidth:'600px'}" class="mx-auto px-3 py-5 my-5">
              <div class="text-center fst-italic fw-7 fs-5 pb-4">What's a Menstrual Cup?</div>
              <div class="text-center fw-5">
                A menstrual cup is a sustainable alternative to using sanitary pads and tampons, it catches and collects instead of absorbing period fluid.
              </div>
              <br>
              <div class="text-center fw-5">
                The Mirko Cup is US FDA Certified, made from 100% medical-grade silicone and can be recycled. If you are looking for a more sustainable option that can last for years, then this one is for you!
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="bg-pink2 text-center py-5 px-3 px-sm-5">
        <div class="my-5">
          <div class="mb-4 fst-italic fs-5 fw-6">
            Why Use a Medical-Grade Silicone Cup?
          </div>
          <img :src="backend + '/photos/learn-mcups-section2.jpg'" :style="{maxWidth: '600px'}" alt="" class="p-md-5 w-100 bg-white mx-auto">
        </div>
      </div>
    </section>

    <section>
      <div class="d-flex px-5 justify-content-center mx-auto py-5" :style="{ maxWidth: '1600px'}">
        <div class="mt-5">
          <div class="fw-6 fs-5 text-center font-didot">
            How to use a menstrual cup?
          </div>
          <div class="row g-0 row-cols-2 row-cols-md-3 row-cols-lg-5 align-self-center">
            <div v-for="(card, ind) in section3" class="col text-center d-flex justify-content-center position-relative pt-5 px-4 px-lg-5 px-sm-5 my-5 mx-auto" :key="ind">
              <div class="fst-italic position-absolute top-0 start-0 end-0">
                {{ind+1}}. {{card}}
              </div>
              <div class="align-self-center text-center">
                <img :src="backend + '/photos/learn-mcups-section3-'+ (ind + 1) +'.jpg'" :style="{maxWidth: '200px'}" alt="" class="w-100 mx-auto">
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="d-flex px-5 justify-content-center mx-auto py-5" :style="{maxWidth: '1600px'}">
        <div class="">
          <div class="fw-6 fs-5 text-center font-didot">
            Now it's time to remove!
          </div>
          <div class="row g-0 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 align-self-center">
            <div v-for="(card, ind) in section4" class="col text-center position-relative pt-5 px-4 px-lg-5 px-sm-5 my-5 mx-auto" :key="ind">
              <div class="fst-italic position-absolute top-0 start-0 end-0">
                Step {{ind +1 }}
              </div>
                <img :src="backend + '/photos/learn-cups-remove-'+ (ind + 1) +'.png'" :style="{maxWidth: '300px'}" alt="" class="w-100 mx-auto">
              <p v-for="(str, strI) in card" :key="strI" class="mt-3">{{str}}</p>
            </div>
          </div>
        </div>
      </div>
    </section>



    <section>
      <div class="bg-pink2 py-5">
        <carousel :items-to-show="1" class="learn-flow" :breakpoints="breakpoints">
         <slide v-for="(card, ind) in cards" :key="ind" class="px-3" >
           <div class="px-3">
             <div :style="{minHeight: '500px'}" class="bg-white py-4 d-flex rounded-20">
               <div class="align-self-center">
                 <div v-if="card[0]" class="text-center fs-5 fw-6 fst-italic">
                   {{card[0]}}
                 </div>
                 <div v-if="card[1]" class="mb-4">
                   <img :src="backend + '/photos/learn-mcups-section5-' + (ind + 1) + '.jpg'" class="img-fluid">
                 </div>
                 <div v-if="card[2]" class="px-4">
                   <div v-for="(p, pind) in card[2]" :key="pind" class="mb-4">
                     {{p}}
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </slide>

         <template #addons>
           <navigation />

         </template>
       </carousel>
      </div>
    </section>

    <section>
      <div class="row g-0 bg-beige">
        <div class="col-12 col-lg-6">
          <img class="img-fluid" :src="backend + '/photos/learn-mcups-section6.jpg'" alt="">
        </div>
        <div class="col-12 col-lg-6 d-flex">
          <div class="align-self-center text-center px-3 py-5 w-100">
            <div class="fst-italic fs-4 fw-6 mb-5">
              Cleaning Your Menstrual Cup
            </div>
            <div class="mx-auto" :style="{maxWidth: '600px'}">
              <div class="mb-3">
                After removal, use only mild, unscented, oil-free soap to clean your cup. We recommend giving it a quick wash every time you remove and before reinsertion.
              </div>
              <div class="mb-3">
                Before each cycle, sterilize your cup in boiling water for 3-5 minutes in a pot or microwave for 1-2 minutes using the Mirko Sterilizer Cup.
              </div>
              <div class="mb-3">
                Tip: to use the sterilizer cup, put the MCup inside the Sterilizer cup and place the lid lightly on top. Microwave for 1-2 minutes to sanitize.
              </div>
            </div>
            <div class="mt-5 row px-4">
              <div class="col-6 text-end" >
                <router-link class="btn w-100 h-100 rounded-5 bg-babyblue fs-6 fw-7 py-2" to="/product/2" :style="{maxWidth: '233px'}">Shop Menstral Cup</router-link>
              </div>
              <div class="col-6 text-start">
                <router-link class="btn w-100 h-100 rounded-5 bg-white fs-6 fw-7 py-2 " to="/product/1" :style="{maxWidth: '233px'}">Shop Classic Underwear</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Navigation} from 'vue3-carousel';

export default{
  name: "Learn-Flow-Underwear",
  props:{
    backend:{}
  },
  components: {Carousel, Slide, Navigation},
  data(){
    return{
      cards:[
        ["What size should i wear?", true, false],
        [false, false, ["We recommend choosing the size of your MCup based on the height of your cervix.", "To make this simple, we can categorize the height into low, average or high cervix, referring to the distance from the end of your vaginal canal to your cervix."]],
        [false, true, ["To measure, first thoroughly wash your hands. Use only oil-free, unscented soap."]],
        [false, false, ["Next, insert your index or middle finger through the vagina until you reach your cervix.","Tip: your cervix is firm but smooth with a tiny dip or dimple in the center - like a donut!"]],
        [false, true, ["When you reach your cervix, check which knuckle is at the end of your vaginal canal and use the guide above."]],
      ],
      section3:["Fold", "Insert", "Collect", "Remove", "Clean"],
      section4:[
        ["Reach for the base - and *pinch!*","Quick tip: Use the stem as a guide and climb up to where the cup ridges are (aka base)"],
        ["Once pinched, the cup's suction seal should break inside your vaginal canal"],
        ["Fold the cup to a smaller size to make sure it's easy to pass through the vaginal entrance", "Try folding it the way you placed the cup in"],
        ["Make sure to tilt up as you pull it out to prevent spillage.", "Success!"],
      ],
      breakpoints: {
      // 700px and up
      576: {
        itemsToShow: 1.5,
        snapAlign: 'start',
      },
      700: {
        itemsToShow: 2,
        snapAlign: 'start',
      },
      // 1024 and up
      1100:{
        itemsToShow: 3,
        snapAlign: 'start',
      },
      1500:{
        itemsToShow: 4,
        snapAlign: 'start',
        wrapAround: false
      },
      2200:{
        itemsToShow: 5,
        snapAlign: 'start',
        wrapAround: false
      }
    },
    }
  }
}
</script>

<style scoped>
.icon{
  width: 100px;
  height: auto;
}

th, td{
  padding-right: 1rem;
}




</style>
