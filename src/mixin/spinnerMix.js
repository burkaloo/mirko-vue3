import spinner from '@/components/spinner.vue'
export default
{
  data(){
    return{
      spinnershow: true,
      spinnerdebug: false
    }
  },
  components:{
    spinner
  },
  methods: {
    spinnertoggle(state = null){
      if(this.spinnerdebug){
        console.log('spinner' + state)
      }
      if(state === null){
        this.spinnershow = !this.spinnershow
      } else{
        this.spinnershow = state
      }
    }
  }
}
