<template>
<nav class="navbar navbar-expand-md navbar-light bg-pink">
  <div class="container-fluid">
    <div v-if="open" class="w-100 cover" :style="'height: calc(100vh - ' + spacer +'px);'" @click="close"></div>
    <button class="navbar-toggler" @click="opennav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <a class="navbar-brand" href="#">Navbar</a>
    <div v-show="open" :class="collapseClass" :style="'top: '+spacer+'px;'">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>


<script>
export default {
  name: 'navBar',
  props:{
    spacer: String
  },
  data(){
    return {
      open: false
    }
  },
  methods:{
    opennav(){
      this.open = !this.open
    },
    close(){
      this.open = false
    }
  },
  computed:{
    collapseClass(){
      if(this.open){
        return "navbar-collapse navbar-collapse-vue bg-pink w-100 p-2"
      } else{
        return "navbar-collapse bg-pink"
      }
    }
  },
}
</script>


<style>
  .navbar-collapse-vue{
    position: fixed;
    z-index: 5;
    left: 0;
  }
  .cover{
    position: fixed;
    left: 0;
    z-index: 4;
  }
</style>
