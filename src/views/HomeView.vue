<template>
  <div class="home">
    <div class="section-container">
      <div>You need video proof of a request?</div>
      <div>You can make a request and get it in a day.</div>
      <router-link to="/request"><button class="btn btn-primary home-btn">Ask a question</button></router-link>
    </div>
    <div class="section-container">
      <div>Too much time on your hands and want earn an extra buck?</div>
      <div>You can answer a request in a couple of minutes and start earning now.</div>
      <router-link to="/answerable-requests"><button class="btn btn-primary home-btn">Answer a request</button></router-link>
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
  background-image: url("../assets/background.jpg");
  margin-left: -5%;
  margin-right: -5%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  backdrop-filter: blur(10px);
}
.section-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  padding: 40px;
}
.home-btn {
  margin-top: 20px;
}
</style>
