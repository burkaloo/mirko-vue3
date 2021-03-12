<template>
  <div class="bg-light" id="app">
    <navBar spacer="56"/>
    <div class="container">
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
    sizeChart, navBar
  }
}
</script>
