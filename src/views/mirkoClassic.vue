<template>
  <div>
    <section>
      <div class="position-relative" >
        <div class="" :style="{height: 'calc(100vh - 66px)', minHeight: '600px'}">
        

        </div>
        <div class="position-absolute top-0 bottom-0 w-100" :style="{zIndex:1}">
          <div class="bg-pink h-50"></div>
          <div class="bg-pink2 h-50"></div>
        </div>
        <div class="position-absolute top-0 bottom-0 w-100 row g-0" :style="{zIndex:2}">
          <div class="col-6 col-sm-5 col-md-6 h-100 text-start text-md-end">
            <img :src="backend + '/photos/learn-classic-header-mobile.png'" alt="" class="d-md-none h-100"/>
            <img :src="backend + '/photos/learn-classic-header.png'" alt="" class="d-none d-md-inline-block h-100"/>

          </div>
          <div class="col-6 col-sm-7 col-md-6 h-100 text-end text-md-center pe-3" :style="{maxWidth: '400px'}">
            <div class="d-flex h-50">
              <h3 class="font-didot align-self-end pb-2 w-100">Let's Talk Period Underwear</h3>
            </div>
            <div class="h-50">
              
              <p class="pt-3 ps-1">It is a reusable underwear that can absorb  menstruation or leaks. Capacity depends on the thickness of the gusset.</p>
            </div>
          </div>
          
        </div>
      </div>
    </section>

    <section>
      <div>
        <div class="text-center px-4 mx-auto my-5 py-5" :style="{maxWidth: '870px'}">
          <h5 class="font-didot mb-5">Mirko's Classic Period Underwear</h5>
          <p class="pb-4">Introducing our pioneer ultra-thin period underwear designed to be worn comfortably even in warm, tropical places like the Philippines!</p>
          <p class="pb-4">Locally manufactured, our underwear is constructed with 2 layers of fabric with a capacity to absorb up to 10ml of liquid. It has a sleek bikini cut with full back coverage of leak-proof lining. The smooth polyester spandex material is resistant to stains, thus ensuring stress-free washing and cleaning of the underwear.</p>
          <p>Designed to be worn for extra protection during heavy days (with your menstrual cup for example), and can be worn on its own during light days or when spotting.</p>
        </div>
      </div>
    </section>

    <section>
      <div class="mx-auto" :style="{maxWidth:'1230px'}">
        <div class="row g-0 row-cols-1 row-cols-md-2">
          <div class="col">
            <img class="img-fluid" :src="backend + '/photos/learn-classic-panty.png'" alt=""/>
          </div>
          <div class="col">
            <img class="img-fluid" :src="backend + '/photos/learn-flow-section3.jpg'" alt=""/>
          </div>
        </div>
      </div>
      
    </section>

    <section>
      <div class="container-fluid">
        <div class="row py-5">
          <div class="col-12 col-md-5 col-xl-3 mb-4 d-flex">
            <img class="align-self-center mx-auto" :style="{maxWidth: '400px', width: '100%', height: 'auto'}" :src="backend + '/photos/learn-flow-section4-1.jpg'" alt="">
          </div>
          <div class="col-12 col-md-7 col-xl-9 d-flex">
            <div class="row g-0 row-cols-1 row-cols-xl-2 align-self-center">
              <div class="col d-flex pb-3 order-1">
                <div class="d-flex">
                  <img class="align-self-center icon" :src="backend + '/photos/learn-flow-section4-icon1.jpg'" alt="">
                  <div class="flex-grow-1 fs-6 fst-italic text-magenta lh-base ms-4 pe-3">
                    <div class="fw-7">Hand wash</div>
                    <div class="">Your Flow Underwear is very easy to wash! Just use room temperature to cold water and wash as regular underwear.</div>
                  </div>
                </div>
              </div>
              <div class="col d-flex pb-3 order-2 order-xl-3">
                <div class="d-flex">
                  <img class="align-self-center icon" :src="backend + '/photos/learn-flow-section4-icon2.jpg'" alt="">
                  <div class="flex-grow-1 fs-6 fst-italic text-magenta lh-base  ms-4 pe-3">
                    <div class="fw-7">Machine Wash</div>
                    <div class="">Conversely, load them up in the laundry machine on a delicate cycle. Do not use hot water, bleach or fabric softener as these may damage the leak-proof film.</div>
                  </div>
                </div>
              </div>
              <div class="col d-flex pb-3 order-3 order-xl-2">
                <div class="d-flex">
                  <img class="align-self-center icon" :src="backend + '/photos/learn-flow-section4-icon3.jpg'" alt="">
                  <div class="flex-grow-1 fs-6 fst-italic text-magenta lh-base  ms-4 pe-3">
                    <div class="fw-7">Drying</div>
                    <div class="">Hang them up to dry! They will typically dry within a day. Please do not iron or tumble dry.</div>
                  </div>
                </div>
              </div>
              <div class="col d-flex pb-3 order-4">
                <div class="d-flex">
                  <img class="align-self-center icon" :src="backend + '/photos/learn-flow-section4-icon4.jpg'" alt="">
                  <div class="flex-grow-1 fs-6 fst-italic text-magenta lh-base  ms-4 pe-3">
                    <div class="fw-7">Storage</div>
                    <div class="">Your Flow Underwear is very easy to wash! Just use room temperature to cold water and wash as regular underwear.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="bg-pink2 py-5">
        <h4 class="text-center font-didot pb-5 text-decoration-underline"> Frequenty Asked Questions</h4>
        <carousel :items-to-show="1" wrapAround :breakpoints="breakpoints" snapAlign="center" class="d-xxl-none learn-flow">
          <slide v-for="(card, ind) in cards" :key="'card'+ ind">
            <div class="bg-pink2 px-4">
              <div class="bg-white px-3 rounded-20" :style="{height: '500px', paddingTop: '100px'}">
                <div class="text-center mx-auto px-2">
                  <div class="fw-7 fs-5" :style="{marginBottom: '4rem'}">{{card[0]}}</div>
                  <div v-for="(text, tind) in card[1]" class="fs-6 mb-3" :key="tind">
                    {{text}}
                  </div>
                </div>
              </div>
            </div>
          </slide>
          <template #addons>
            <navigation />
          </template>
        </carousel>
        <div class="d-none d-xxl-flex justify-content-center my-5">
          <div v-for="(card, ind) in cards.slice(0,3)" :key="'card'+ ind">
            <div class="bg-pink2 px-4">
              <div class="bg-white px-3" :style="{height: '650px', width: '400px', paddingTop: '200px'}">
                <div class="text-center mx-auto px-3">
                  <div class="fw-7 fs-5" :style="{marginBottom: '4rem'}">{{card[0]}}</div>
                  <div v-for="(text, tind) in card[1]" class="fs-6 mb-3" :key="tind">
                    {{text}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="row g-0 bg-pink">
        <div class="col-12 bg-white d-sm-none">
          <img class="img-fluid"  :src="backend + '/photos/learn-classic-chartimg-mobile.png'" alt="">
        </div>
        <div class="col-12 col-sm-5 col-md-6 d-none d-sm-inline-block text-center">
          <img class="img-fluid"  :src="backend + '/photos/learn-classic-chartimg.png'" :style="{maxHeight: '700px'}">
        </div>
        <div class="col-12 col-sm px-3 px-sm-5 d-flex justify-content-center">
          <div class="align-self-center flex-grow-1 py-5 py-sm-0">
            <div class="text-center fs-1 fw-5 fst-italic pb-3 border-bottom border-dark">
              Size Chart
            </div>
            <table class="table table-borderless">
              <tbody class=" text-center">
                <tr class="text-magenta fw-4">
                  <td>Size</td>
                  <td>Waist</td>
                  <td>Hip</td>
                </tr>
                <tr v-for="(row, rind) in sizechart" :key="rind" class="fw-3">
                  <td v-for="(cell, cind) in row" :key="cind">{{cell}}</td>
                </tr>
              </tbody>
            </table>
            <div class=" text-center mt-5">
              <router-link class="btn bg-babyblue btn-lg fw-6 fs-7 rounded-5 py-2 px-3" to="/product/1">
                Shop Classic Underwear
              </router-link>
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
  name: "leanr-classic",
  props:{
    backend:{}
  },
  components: {
    Carousel,
    Slide,
    Navigation,
  },
  data(){
    return{
      cards:[
        ["How to use a period underwear?",["Wear it with your choice of sanitary products on your heavy days (ex. days 1-3) and you can opt to wear it on its own on light days (ex. days 4-7).","We recommend pairing them with a menstrual cup for extra protection against leaks."]],
        ["How often should you change it?", ["You can change it every 6-8 hours depending on the heaviness of your flow. We recommend owning at least 3 pairs so you can easily change and wash your underwear."]],
        ["Won't it feel too hot to wear?", ["Not at all! We made sure to only use quality fabrics that are cooling and non-irritating to the skin. With the ultra-thin and non-bulky design of the underwear, you won't even notice the added layer!"]],
        ["How to use a period underwear?",["Wear it with your choice of sanitary products on your heavy days (ex. days 1-3) and you can opt to wear it on its own on light days (ex. days 4-7).","We recommend pairing them with a menstrual cup for extra protection against leaks."]],
        ["How often should you change it?", ["You can change it every 6-8 hours depending on the heaviness of your flow. We recommend owning at least 3 pairs so you can easily change and wash your underwear."]],
        ["Won't it feel too hot to wear?", ["Not at all! We made sure to only use quality fabrics that are cooling and non-irritating to the skin. With the ultra-thin and non-bulky design of the underwear, you won't even notice the added layer!"]],
      ],
      sizechart:[
        ["S", "22-25 in.", "33-35 in."],
        ["M", "25-28 in.", "35-37 in."],
        ["L", "28-31 in.", "37-39 in"],
        ["XL", "31-34 in.", "39-41 in."],
        ["XXL", "34-37 in.", "41-43 in."],
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
      992: {
        itemsToShow: 2.5,
        snapAlign: 'start',
      },
      1200:{
        itemsToShow: 3,
        snapAlign: 'start',
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
