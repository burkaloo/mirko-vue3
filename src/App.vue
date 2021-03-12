<template>
  <div class="bg-light" id="app">
    <div>help</div>
    <navBar :docscroll="docscroll" topmargin="28"/>

    <div class="container my-5">
      <sizeChart/>
    </div>
  </div>
</template>

<script>
import sizeChart from './components/sizeChart.vue'
import navBar from './components/navBar.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

require('./assets/styles/main.css')

export default {
  name: 'app',
  components: {
    sizeChart, navBar,
  },
  data(){
    return{
      docscroll:0
    }
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll)
  },
  beforeUmount() {
    window.removeEventListener("scroll", this.onScroll)
  },
  methods:{
    onScroll() {
      this.docscroll = document.documentElement.scrollTop
    }
  }
}
</script>
