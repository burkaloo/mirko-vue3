<template>
    <div class="" style="height:1650px">
      <iframe :src="url" width="100%" height="100%"></iframe>
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
