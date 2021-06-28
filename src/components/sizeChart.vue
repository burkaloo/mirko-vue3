<template>
  <div class="text-center">
    <h1 class="text-center header-font">{{title}}</h1>
    <table class="table mt-3 table-bordered border-black">
      <thead>
        <tr>
          <th v-for="(head, hInd) in header" :key="hInd">{{head}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rInd) in body" :key="rInd">
          <td v-for="(cell, cInd) in row" :key="cInd">{{cell}}</td>
        </tr>
      </tbody>
    </table>
    <div class="d-flex">
      <small class="m-3">{{note}}</small>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sizeChart',
  data(){
    return{

    }
  },
  props:{
    title:{},
    header:{},
    body:{},
    note:{}
  },
}
</script>
