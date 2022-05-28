<template>
    <div class="request-container">
        <img class="request-element request-img" :src="currentRequest.requestImg">
        <div class="request-container-text">
            <div class="request-element request-title">{{currentRequest.requestTitle}}</div>
            <div class="request-element request-description">{{currentRequest.requestDescription}}</div>
            <div class="request-element request-money">{{currentRequest.requestMoney}}</div>
            <div class="request-element request-hours">{{currentRequest.requiredHours}}</div>
            <div class="request-element request-timestamp">{{currentRequest.timestamp}}</div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
  data: function() {
    return {
      currentRequest: {},
    }
  },
  async mounted() {
    // Get hte json file from IPFS through the CID in the routed URL
    var jsonURL = "https://ipfs.io/ipfs/" + this.$route.params.id;
    console.log(jsonURL)
    var currentRequest = await axios.get(jsonURL).then(function(response) {
      return response.data;
    });
    console.log(currentRequest)
    this.currentRequest = currentRequest
    if (!currentRequest.requestImg) {
      this.currentRequest["requestImg"] = "https://its-mobility.de/wp-content/uploads/placeholder.png"
    }
    console.log(this.currentRequest)

  },
}


</script>
<style scoped>
.request-container {
    display: flex;
    flex-direction: row;
    height: 300px;
    width: 60%;
    margin: 30px auto;
}
.request-img {
    max-width: 300px; 
    margin-right: 20px;
}
.request-container-text {
    display: flex;
    flex-direction: column;
}
</style>