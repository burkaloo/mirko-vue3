<template>
  <div :style="'height:'+ spacer+'px;'">
    <nav class="navbar navbar-expand-md navbar-light bg-pink navbar-fixed" :style="'top:'+totalTopmargin+ 'px;'">
      <div class="container-fluid">
        <div v-if="open" class="w-100 cover" :style="'top:' + totalSpace +'px; height: calc(100vh - ' + totalSpace +'px);'" @click="close"></div>
        <button class="navbar-toggler" @click="opennav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <a class="navbar-brand" href="#">Navbar</a>
        <div v-show="open" :class="collapseClass" :style="'top: '+totalSpace+'px;'">
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
  </div>
</template>


<script>
export default {
  name: 'navBar',
  props:{
    docscroll: Number,
    topmargin: Number
  },
  data(){
    return {
      open: false,
      spacer: 56,

    }
  },
  watch:{
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
        return "navbar-collapse navbar-collapse-vue bg-pink p-2"
      } else{
        return "navbar-collapse bg-pink"
      }
    },
    totalSpace(){
      if(this.docscroll < this.topmargin){
        return this.spacer + this.topmargin - this.docscroll
      } else{
        return this.spacer
      }
    },
    totalTopmargin(){
      if(this.docscroll < this.topmargin){
        return this.topmargin - this.docscroll
      } else{
        return 0
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
    width: 100%
  }
  .navbar{
    position: fixed !important;
    z-index: 5;
    left: 0;
    right: 0;
  }
  .cover{
    position: fixed;
    left: 0;
    z-index: 4;
  }
</style>
