<template>
    <div class="" style="height:1520px">
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
    shipping:String,
    total:String
  },
  computed:{
    url(){
      return "https://form.jotform.com/210724674863057?total=" + this.total
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
