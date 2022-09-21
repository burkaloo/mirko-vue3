<template>
  <div>
    <section>
      <div class="row g-0 bg-lpeach" >
        <div class="d-none d-md-block col-md-1 col-lg-1 col-xxl"></div>

        <div class="col-12 col-md-4 col-lg-4 col-xxl-3" >
          <div class="d-flex d-lg-none justify-content-center" :style="{height: '60vh'}">
            <img class="align-self-end" :src="backend + '/photos/learn-briefs-girl-full.png'"  :style="{height:'95%', width: 'auto'}"/>
          </div>

          <div class="d-none d-lg-flex d-xxl-none justify-content-center" :style="{height: '60vw'}">
            <img class="align-self-end" :src="backend + '/photos/learn-briefs-girl-full.png'"  :style="{height:'90%', width: 'auto'}"/>
          </div>

          <div class="d-none d-xxl-flex justify-content-center" :style="{height: 'calc(100vh - 66px)'}">
            <img class="align-self-end" :src="backend + '/photos/learn-briefs-girl-full.png'"  :style="{height:'85%', width: 'auto'}"/>
          </div>
        </div>

        <div class="d-none col-lg-1 col-xxl-2"></div>
        
        <div class="d-md-none col-12 bg-white"> <!-- show in mobile only-->
          <div class="d-flex justify-content-center h-100" >
            <div class="align-self-center text-center py-5 px-3">
              <h2 class="font-didot">Introducing Mirko Flow</h2>
              <p>Our period briefs are designed to absorb and protect against leaks. Perfect for light to medium flow.</p>
            </div>
          </div>
        </div>

        <div class="d-none d-md-block col-md-5 col-lg-5 col-xxl-4">
          <div class="d-flex justify-content-center h-100" >
            <div class="align-self-center text-center py-5 px-3 py-lg-0 px-lg-0">
              <h2 class="font-didot">Introducing Mirko Flow</h2>
              <p>Our period briefs are designed to absorb and protect against leaks. Perfect for light to medium flow.</p>
            </div>
          </div>
        </div>
        
        <div class="d-none d-md-block col-md-1 col-lg-2 col-xxl"></div>
      </div>
    </section>

    <section class="bg-viogrey">
      <div class="container py-5">
        <div class="row g-0">
        
          <div class="col-12 col-md-4 order-1 order-md-3">
              <img class="img-fluid d-md-none p-4" :src="backend + '/photos/learn-briefs-panty.png'"/>
              <img class="d-none d-md-block ps-xxl-3" :src="backend + '/photos/learn-briefs-panty.png'" :style="{minHeight: '250px', height: '100%', width: '100%', objectFit: 'contain', objectPosition: 'bottom'}"/>
          </div>
          
          <div class="col-12 py-5 px-3 order-2 order-md-1">
            <h2 class="text-center font-didot">Built with 4-Layer Protection</h2>
          </div>
          
          <div class="col-12 col-md-8 order-3 order-md-2">
            <div class="">
              <img :style="{height: 'auto', width: '100%'}" :src="backend + '/photos/learn-briefs-layers.png'" alt="">
              
            </div>


          </div>
          

        </div>
      </div>
    </section>

    <section class="bg-lpeach">
      <div class="row g-0">
        <div class="d-none d-xxl-block col-xxl"></div>
        <div class="col-12 col-md-5 col-xl-6 col-xxl-auto">
          <div class="h-100 pe-xxl-5">
            <img class="d-md-none" :src="backend + '/photos/learn-briefs-girl-back.png'" alt="" :style="{height: 'auto', width:'100%', maxHeight: '500px', objectFit: 'contain', objectPosition: 'center'}">
            <img class="d-none d-md-block d-xl-none" :src="backend + '/photos/learn-briefs-girl-back.png'" alt="" :style="{height: '100%', width:'100%', objectFit: 'cover', objectPosition: 'right'}">
            <img class="d-none d-xl-block" :src="backend + '/photos/learn-briefs-girl-back.png'" alt="" :style="{height: '830px', width:'auto'}">
          </div>
        </div>
        <div class="col-12 col-md-7 col-xl-6 col-xxl-auto" :style="{maxWidth: '550px'}">
          <div class="row g-0 row-cols-1 pe-3">
            <div class="col d-flex">
              <h4 class="font-didot pt-5" :style="{paddingLeft: '35px'}">Why love Mirko's Period Briefs?</h4>
            </div>
            <div class="col d-flex ">
              <img class="flow-icon " :src="backend + '/photos/learn-flow-icon-tree.png'" alt="">
              <div class="flex-grow-1 align-self-center">
                Cotton fabric and gusset
              </div>
            </div>
            <div class="col d-flex ">
              <img class="flow-icon " :src="backend + '/photos/learn-flow-icon-drop.png'" alt="">
              <div class="flex-grow-1 align-self-center">
                Absorbs up to 20ml or equivalent to 4 regular tampons
              </div>
            </div>
            <div class="col d-flex ">
              <img class="flow-icon " :src="backend + '/photos/learn-flow-icon-breathable.png'" alt="">
              <div class="flex-grow-1 align-self-center">
                Breathable with cool, smooth feeling on the skin
              </div>
            </div>
            <div class="col d-flex ">
              <img class="flow-icon " :src="backend + '/photos/learn-flow-icon-layer.png'" alt="">
              <div class="flex-grow-1 align-self-center">
                Moisture-wicking technology - keeps you feeling dry
              </div>
            </div>
            <div class="col d-flex ">
              <img class="flow-icon " :src="backend + '/photos/learn-flow-icon-panty.png'" alt="">
              <div class="flex-grow-1 align-self-center">
                Can be worn by itself on light to medium flow days
              </div>
            </div>
            <div class="col d-flex ">
              <img class="flow-icon " :src="backend + '/photos/learn-flow-icon-leaf.png'" alt="">
              <div class="flex-grow-1 align-self-center">
                Save on sanitary napkins and tampons
              </div>
            </div>

          </div>
        </div>
        <div class="d-none d-xxl-block col-xxl"></div>
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
      <div class="py-5">
        <h4 class="text-center font-didot pb-5 text-decoration-underline"> Frequenty Asked Questions</h4>
        <carousel :items-to-show="1" wrapAround :breakpoints="breakpoints" snapAlign="center" class="d-xxl-none learn-flow">
          <slide v-for="(card, ind) in cards" :key="'card'+ ind">
            <div class="px-4">
              <div class="bg-lpeach px-3 " :style="{height: '500px', paddingTop: '100px', borderRadius: '50px'}">
                <div class="text-center mx-auto px-2">
                  <div class="fw-5 fs-5" :style="{marginBottom: '4rem'}">{{card[0]}}</div>
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
            <div class=" px-4">
              <div class="bg-lpeach px-3" :style="{height: '550px', width: '400px', paddingTop: '150px', borderRadius: '50px'}">
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
      <div class="pb-5"></div>
    </section>

    <section>
      <div class="bg-lpeach">
        <div class="row g-0">
          <div class="col-5 col-lg-4">
            <img class="d-md-none" :src="backend + '/photos/learn-briefs-girl-front.png'" alt="" :style="{height: '100%', width: '100%', objectFit: 'cover', objectPosition:'right'}"/>
            <img class="d-none d-md-block" :src="backend + '/photos/learn-briefs-girl-front.png'" alt="" :style="{height: auto, width: '100%', objectFit: 'cover', objectPosition:'right'}"/>
          </div>
          <div class="col-7 col-lg-4">
            <div class="d-flex h-100">
              <div class="py-5 pe-3 pe-sm-4 ps-md-4 align-self-center">
                <h4 class="font-didot text-end text-md-center">Stay dry and comfortable all day and night!</h4>
                <p class="mt-5 text-end text-md-center px-md-3">Want more coverage? Shop our menstrual cups and pair them with your period briefs!</p>
                <div class="text-end text-md-center row row-cols-1 row-cols-xxl-2">
                  <div class="col mt-4 text-xxl-end">
                    <router-link class="btn bg-babyblue fw-7 py-2 px-3 rounded-5" to="/product/2">
                      Shop Mentrual Cups
                    </router-link>
                  </div>
                  <div class="col mt-4 text-xxl-start">
                    <router-link class="btn bg-white fw-7 py-2 px-3 rounded-5" to="/product/11">
                      Shop Period Briefs
                    </router-link>  
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-4 d-flex">
            <img class="d-none d-lg-block align-self-center pt-5 mx-auto" :src="backend + '/photos/learn-briefs-scup-stack.png'" alt="" :style="{width: auto, height: '450px', objectFit: 'contain', objectPosition: 'leftbottom'}">
          </div>

        </div>
      </div>
    </section>
  </div>
</template>

<script>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Navigation} from 'vue3-carousel';
//import { start } from 'repl';

export default{
  name: "Learn-Flow-Underwear",
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
        ["How to use a period underwear?",["Depending on your flow, you can wear them with your choice of sanitary products on your heaviest day and wear on its own on your medium to light flow days."]],
        ["How often should you change it?", ["You can change it every 6-8 hours depending on the heaviness of your flow (or less for super heavy days). We recommend owning at least 3 pairs so you can easily change and wash your underwear."]],
        ["Is it Difficult to wash?", ["It's actually easier than you think! Before hand or machine washing, just soak the underwear in room temp water or rinse until water runs clear."]],
        ["How to use a period underwear?",["Depending on your flow, you can wear them with your choice of sanitary products on your heaviest day and wear on its own on your medium to light flow days."]],
        ["How often should you change it?", ["You can change it every 6-8 hours depending on the heaviness of your flow (or less for super heavy days). We recommend owning at least 3 pairs so you can easily change and wash your underwear."]],
        ["Is it Difficult to wash?", ["It's actually easier than you think! Before hand or machine washing, just soak the underwear in room temp water or rinse until water runs clear."]],
        
      ],
      sizechart:[
        ["S", "22-25 in.", "33-35 in."],
        ["M", "25-28 in.", "35-37 in."],
        ["L", "28-31 in.", "37-39 in"],
        ["XL", "31-34 in.", "39-41 in."]
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

.flow-icon{
  height: 120px;
  width: autp;
}


</style>
