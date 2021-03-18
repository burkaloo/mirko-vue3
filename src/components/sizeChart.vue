<template>
  <div class="text-center">
    <h1 class="text-center header-font">Size Chart</h1>
    <table class="table mt-3 table-bordered border-black">
      <thead>
        <tr>
          <th>Size</th>
          <th>Waist</th>
          <th>Hip</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>S</td>
          <td>22-25</td>
          <td>33-35</td>
        </tr>
        <tr>
          <td>M</td>
          <td>25-28</td>
          <td>35-37</td>
        </tr>
        <tr>
          <td>L</td>
          <td>28-31</td>
          <td>37-39</td>
        </tr>
        <tr>
          <td>XL</td>
          <td>31-34</td>
          <td>39-41</td>
        </tr>
      </tbody>
    </table>
    <div class="d-flex">
      <small class="m-3">*measurements in inches</small>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sizeChart',
}
</script>
