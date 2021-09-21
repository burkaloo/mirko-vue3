export default
{
  methods: {
    newtab(url){
      window.open(url, '_blank');
    },
    redirect(url){
      window.location.href = url
    }
  }
}
