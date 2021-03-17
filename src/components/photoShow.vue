<template>
  <div class="">
    <div class="d-flex">
      <div class="d-none d-sm-block  me-3">
        <img v-for="(img, index) in imgs"
        :key="index"
        :class="imgfocus == index ? 'image-select border border-pink border-2 d-block' : 'image-select border border-grey d-block'"
        :src="img" alt=""
        @click="jumpimg(index)">
      </div>
      <div class="flex-grow-1">
          <img class="img-fluid" :src="imgs[imgfocus]" alt="">
      </div>
    </div>
    <div class="d-flex d-sm-none mt-3">
      <img v-for="(img, index) in imgs"
      :key="index"
      :class="imgfocus == index ? 'image-select border border-2 border-pink' : 'image-select border border-grey'"
      :src="img"
      alt=""
      @click="jumpimg(index)">
    </div>
  </div>
</template>

<script>
export default {
  name: 'photoShow',
  props: {
    imgs: Array
  },
  data(){
    return {
      imgfocus: 0
    }
  },
  methods:{
    jumpimg(num){
      this.imgfocus = num
    }
  }
}
</script>

<style scoped>
.image-select{
  height: 55px;
  width: 55px;
  margin: 2px;
}
</style>
