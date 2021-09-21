<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-12">
        <h4 class="text-center mb-5">General Inquiry</h4>
        <p>Hi Mirko Lady!</p>
        <p>We are happy to assist you! If you have any questions or requests, feel free to reach out via <span class="fw-bold">info@mirkoessentials.com</span> or <span class="fw-bold">+63 920 566 3896.</span></p>
        <p>You may also leave your details and a message for us below, and we will respond to you as soon as possible.</p>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <input class="form-control" type="text" name="" placeholder="Name" v-model="name">
      </div>
      <div class="col-6">
        <input class="form-control" type="text" name="" placeholder="E-mail" v-model="email">
      </div>
      <div class="col-12 mt-4">
        <textarea class="form-control" name="name" rows="8" cols="80" placeholder="Message" v-model="msg"></textarea>
      </div>
      <div class="col-12">
        <button class="btn btn-dark mt-4" :disabled="buttonload" @click="sendmsg">
          <span v-if="buttonload" class="spinner-border spinner-border-sm px-4" role="status" aria-hidden="true"></span>
          <span>Send message</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require('axios');
export default {
  name: 'ContactUs',
  data(){
    return {
      name:"",
      email:"",
      msg:"",
      buttonload: false
    }
  },
  props:{
    bccemail:{default: "info@mirkoessentials.com"}
  },
  methods:{
    sendmsg(){
      this.buttonload = true
      let postdata = {
        merge:{
          name: this.name,
          email: this.email,
          msg: this.msg
        },
        token: 'mirko-contact',
        email: {to: this.email, bcc: this.bccemail},
        "subject-pre": "[" + this.name + "] "
      }

      let comp = this
      axios({
        method: 'post',
        url: 'https://mailer.navitag.net',
        data: postdata
      }).then(function(r){
        if("MessageID" in r.data && "TransactionID" in r.data){
          comp.$emit('alert', {show: true, text: "Message Sent", class: "success"})
        } else{
          comp.$emit('alert', {show: true, text: "Encountered error while sending. Message not sent...", class: "danger"})
        }
      }).catch(function(){
        comp.$emit('alert', {text: "Encountered error while sending. Message not sent...", class: "danger"})
      }).finally(function(){
        comp.buttonload = false
      })
    }

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  input{
    height: 40px;
    background-color: lightgrey;
  }

  textarea{
    background-color: lightgrey;
  }

  textarea::-webkit-input-placeholder { /* Edge */
    color: grey;
    font-size: 12px;
    line-height: 12px;
  }

  textarea:-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: grey;
    font-size: 12px;
    line-height: 12px;
  }

  textarea::placeholder {
    color: grey;
    font-size: 12px;
    line-height: 12px;
  }

  input::-webkit-input-placeholder { /* Edge */
    color: grey;
    font-size: 12px;
    line-height: 12px;
  }

  input:-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: grey;
    font-size: 12px;
    line-height: 12px;
  }

  input::placeholder {
    color: grey;
    font-size: 12px;
    line-height: 12px;
  }
</style>
