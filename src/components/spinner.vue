<template>
  <div v-if="show" class="bg-white z-top position-fixed top-0 start-0 end-0 vh-100 vw-100">
    <div class="text-center" style="margin-top:40vh">
      <div class="spinner-border m-5" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'spinner',
  props:{
    show: {default: false}
  },
  data(){
    return{}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.z-top{
  z-index: 9999999999;
}

</style>
