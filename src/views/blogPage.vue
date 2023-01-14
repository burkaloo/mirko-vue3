<template>
  <div>
    <div class="container">
      <div class="position-relative">
        <img :src="banner" alt="" class="img-fluid">
        <div class="mx-auto position-absolute bottom-0 start-0 end-0">
          <div :style="{maxWidth: '800px', borderRadius: '15px 15px 0 0'}" class="mx-auto bg-white px-2 py-3">
            <span>{{date}}</span>
          </div>
        </div>
      </div>
      <div :style="{maxWidth: '800px'}" class="mx-auto px-2">
        <h2 class="fw-7">{{title}}</h2>
        <br>
        <br>
        <div v-html="body" class="pb-5">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require('axios');

export default {
  name: 'blogPage',
  props:{
    backend:{},
    slug:{},
    paramtitle: {default: false}
  },
  data(){
    return {
      body: "",
      title: "",
      date: null,
      banner: ""
    }
  },
  created(){    
  },
  mounted(){
    let months = ["", "Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
    axios.post(this.backend + '/dbconn.php', {statement: "getblog", slug: this.slug})
    .then( (res) => {
      //console.log(res)
      if(res.data.status == "success"){
        if(!this.paramtitle){
          document.title = res.data.response[0].title
        }
        this.body = res.data.response[0].body
        this.title = res.data.response[0].title
        this.banner = res.data.response[0].banner

        let d = res.data.response[0].date.split("-")
        this.date = months[ parseInt(d[1]) ] + " " +  d[2] + ", " + d[0] 
      }
      
    })
  },
  methods:{
    
  }
}
</script>

