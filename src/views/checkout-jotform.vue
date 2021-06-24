<template>
    <div class="" style="position: relative; min-height:700px;">
      <div class="d-flex justify-content-center" style="position: absolute; left:0px; right:0px; top:200px;">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div  style="height:1650px; position: absolute; top: 0; left:0; right:0; z-index:2">
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
  mounted(){
    if(this.params == "" || this.params == null ){
      this.$emit('page', 'home')
    }
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
