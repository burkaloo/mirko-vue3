<template>
  <div>
    <div class="container text-center mx-auto my-5 p-5">
      <img :src="logo" style="width: 100%; height: auto; max-width: 300px;">
      <h4 class="" style="margin-top: 50px;">
        <p>
          Thank you for supporting Mirko! We will ship out your order once we have verified your shipping and payment details. We have sent you an a copy of your order via email.
        </p>
        <p>
          For Metro Manila orders with same day delivery, we will contact you for further instructions on booking via Grab/lalamove. Our Cut-off time for same day deliveries is at 2:00pm. If you have placed an order with same daya delivery after 2:00pm, we will ship it out the next business day.
        </p>
      </h4>

    </div>
  </div>

</template>

<script>
import mlogo from '@/assets/photos/mirko-logo.png'

export default {
  name: 'thanks',
  data(){
    return{
      logo: mlogo
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
