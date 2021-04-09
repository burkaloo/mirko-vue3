<template>
    <div class="" style="height:1650px; position: relative">
      <div class="d-flex justify-content-center" style="margin-top: 300px;">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div  style="position: absolute; top: 0; z-index:2">
        <iframe :src="url" width="100%" height="100%"></iframe>
      </div>
    </div>

</template>

<script>
export default {
  name: "checkout",
  data(){
    return{
    }
  },
  props:{
    params: String
  },
  computed:{
    url(){
      return "https://form.jotform.com/210733949937064" + this.params
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
