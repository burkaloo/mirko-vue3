<template>
  <div>
    <div style="max-width: 800px" class="text-left mx-auto">
      <div class="text-center py-5">
        <img src="../assets/photos/mirko-logo.png" class="p-3 img-fluid" style="max-width: 120px"  alt="">
      </div>
      <h2 class="header-font text-center">Mirko Menstrual Cups: An Easy Guide</h2>
      <br><br>

      <h2 class="header-font">WASH</h2>
      <p>
        Check our graphics below for instructions on how to wash your cup!
      </p>

      <br><br>

      <h2 class=" header-font">INSERTION</h2>

      <h2 class="header-font my-3">
        Position.
      </h2>
      <p>
        After making sure your hands and your cup are clean, get comfortable. The most popular positions are squatting and sitting with your legs spread open. We recommend doing this on the toilet or in the shower.
      </p>
      <br>

      <h2 class="header-font my-3">
        Fold.
      </h2>
      <p>
        There are a number of folds you can try with the most popular ones being the c-fold and punch-down fold. Check out our graphics below for these.
      </p>
      <br>

      <h2 class="header-font my-3">
        Relax.
      </h2>
      <p>
        Take deep breaths and try to relax. This will really help your muscles not tense up.
      </p>
      <br>

      <h2 class="header-font my-3">
        Insert.
      </h2>
      <p>
        With your free hand, part your labia lips. While your cup is folded, insert it rim first into your vagina at around a 45 degree angle and aim it towards the base of your spine. Slowly push your cup in until you can no longer see the end of the stem or you reach an end - then release.
      </p>
      <p>
        This entire process will feel like you are inserting the cup through a curved canal. Be prepared to shift the angling of the cup to follow the natural form of your vagina. This shouldn’t hurt, so be patient about finding the comfortable position for you.
      </p>
      <p>
        Tip #1: It’s easier to slide the cup in when your cup is slightly wet. You can wet it with clean water or use a water-based lubricant.
      </p>
      <p>
        Tip #2: The Mirko Menstrual Cup’s stem is built especially long to accommodate different lengths. If the stem of yours pokes out and bothers you, feel free to trim it (remove the cup first!).
      </p>
      <br>

      <h2 class="header-font my-3">
        Securing.
      </h2>
      <p>
        Once you release your cup, it should stay inside your vagina. Trace your finger around the base of the cup to check if it’s fully open. If you feel any dents or folds, gently grip the base of the cup and slowly rotate it to help it unfold.
      </p>
      <p>
        To avoid leaks, the cup should create a suction seal around the vaginal wall. Check this by gently pulling on the stem. You should feel resistance. If it doesn’t feel secure, try partly pulling the cup out and reinserting.
      </p>
      <p>
        Tip: Sometimes doing a series of squats helps to establish a proper seal.
      </p>
      <br><br>

      <h2 class="header-font">WEAR</h2>
      <p>
        Wear your cup for a maximum of 10-12 hours at a time. If you experience a heavier flow, you may have to empty it more than twice a day. Mirko’s small menstrual cup can generally hold 4x the capacity of your regular tampon or pad.
      </p>
      <p>
        Tip: Empty your cup more often in the beginning to get to know your cup and your flow.
      </p>
      <br><br>

      <h2 class="header-font">REMOVAL</h2>
      <p>
        Follow our graphics below for a step by step! Make sure to wash your cup after use.
      </p>
      <br><br>

      <h2 class="header-font">STORAGE</h2>
      <p>
        Store your cup in a breathable container that is easily accessible for your next use!
      </p>
      <br><br>
    </div>
    <div class="container">
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4">
        <div v-for="(img, index) in imgs" class="col mt-4" :key="index">
          <img class="img-fluid" :src="img" alt="" >
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import img1 from '@/assets/photos/cupsinfo-1.jpg'
import img2 from '@/assets/photos/cupsinfo-2.jpg'
import img3 from '@/assets/photos/cupsinfo-3.jpg'
import img4 from '@/assets/photos/cupsinfo-4.jpg'

export default {
  name: 'aboutMirko',
  data(){
    return{
      imgs:[img1, img2, img3, img4]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
