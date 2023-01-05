<template>
  <div>
    <div class="container py-5">
      <h2 class="text-center py-5 font-didot">Mirko Essentials Blog</h2>
      
      <div class="row row-cols-1 row-cols-md-2 row-cols-xl-3">
        <div v-for="post in posts" class="col px-5" :key="post.slug">
          <div :style="{backgroundImage: 'url('+ post.banner +')', width: '100%', paddingTop: '60%', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}">
          </div>
          <router-link :to="'/blog/' + post.slug" class="mt-3 text-decoration-underline fs-5">{{post.title}}</router-link>
          <p class="fw-1">{{post.teaser}}</p>
          
        </div>

      </div>

    </div>
  </div>
</template>

<script>
const axios = require('axios');

export default {
  name: 'mirkoBlog',
  props:{
    backend:{}
    
  },
  data(){
    return {
      posts:[]
    }
  },
  created(){
    axios.post(this.backend + '/dbconn.php', {statement: "getblogpreviews"})
    .then((res) => {
      if(res.data.status == "success"){
        this.posts = res.data.response
      }
    })
  },
  methods:{
  }
}
</script>

