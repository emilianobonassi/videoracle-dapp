<template>
  <div class="home">
    <div class="section-container">
      <div>You need a video proof of a request?</div>
      <div>You can make a request and get a video proof of it.</div>
      <router-link to="/request"><button class="btn btn-primary">Ask a question</button></router-link>
    </div>
    <div class="section-container">
      <div>Too much time on your end and want earn an extra buck?</div>
      <div>You can answer a request in a couple</div>
      <router-link to="/answerable-requests"><button class="btn btn-primary">Answer a request</button></router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { uploadBlob } from "../services/ipfs.js"
import { ref } from "vue";


export default {
  name: 'HomeView',
}
</script>
<style scoped>
.home {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 20px;
  height: 87vh;
}
.section-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
