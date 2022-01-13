<template>
  <div class="">
    <div class="row">
      <div class="col-12 px-1">
        <div class="show-wrapper">
          <div class="show-button back" @click="back">
            <i class="lnr lnr-chevron-left"></i>
          </div>
            <img class="img-fluid" :src="imgs[imgfocus]" alt="">
          <div class="show-button next" @click="next">
            <i class="lnr lnr-chevron-right"></i>
          </div>
          <div class="nav-guide d-flex justify-content-center">
            <div v-for="index in imgs.length" :key="index" class="d-inline-block dot px-2">
              <span :style="index == imgfocus + 1 ? {color:'black'} : {color:'lightgrey'} ">⬤</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-1 row-cols-3 row-cols-sm-5 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5">
      <div class="col p-1" v-for="(img, index) in imgs" :key="index">
        <img
        :src="img"
        @click="jumpimg(index)"
        class="col-img"
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'photoShow',
  props: {
    imgs: Array,
    imgfocus : {default: 0, type: Number}
  },
  data(){
    return {
    }
  },
  methods:{
    next(){
      let limit = this.imgs.length -1
      if (this.imgfocus == limit){
        this.$emit('imgjump', 0)
      } else{
        this.$emit('imgjump', this.imgfocus + 1)
      }
    },
    back(){
      let limit = this.imgs.length -1
      if (this.imgfocus == 0){
          this.$emit('imgjump', limit)
      } else{
        this.$emit('imgjump', this.imgfocus -1)
      }
    },
    jumpimg(num){
      this.$emit('imgjump', num)
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

.col-img{
  width: 100%;
}

.lnr{
  height: 20%;
  width: auto;
  display: block;
  font-weight: 900;
}

.show-wrapper{
  position: relative;
  color: lightgrey;
}

.show-button:hover{
  color: black
}

.show-button{
  position: absolute;
  top: 0;
  bottom: 0;
  width: 10%;
  z-index: 3;
  padding-top: 45%;
}

.nav-guide{
  position: absolute;
  bottom: 0;
  z-index: 2;
  left: 0;
  right: 0;
  margin-bottom: 5%;
}

.dot{
  font-size: 10px;
}

.next{
  right: 0;
  padding-right: 5px;
  text-align: right;
}

.back{
  left: 0;
  padding-left: 5px;
}
</style>
