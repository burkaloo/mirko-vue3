<template>
  <div class="">
    <div class="">
      <button v-if="curpage > 1" class="btn bg-pink" @click="backpage(1)">1</button>
      <span v-if="cupage > 2">...</span>
      <button v-if="cupage > 2" class="btn bg-pink" @click="backpage(backpagecount)">{{backpagecount}}</button>
      <button class="btn bg-pink">{{curpage}}</button>
      <button v-if="!notlastpage" class="btn bg-pink" >{{ nextpagecount }}</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'pageNav',
  props:{
    lastresult: { type: Boolean},
    displaycount:{type: Number},
    totalcount:{type: Number},
    curpage:{type: Number, default: 1}
  },
  methods:{
    nextpage(){
      this.$emit("loadnext")
    },
    backpage(page){
      this.$emit("backpage", page)
    }
  },
  computed:{
    nextpagecount(){
      return this.curpage + 1
    },
    backpagecount(){
      return this.curpage - 1
    },
    notlastpage(){
      if( (this.curpage * this.displaycount) < this.totalcount && !this.lastresult){
        return false
      } else {
        return true
      }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
