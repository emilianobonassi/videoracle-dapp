<template>
    <div class="request-container">
        <!--<img class="request-element request-img" :src="currentRequest.requestImg">-->
        <div class="request-container-text">
            <div class="request-element request-title">{{currentRequest.requestTitle}}</div>
            <div class="request-element request-description"><span style="color: grey">Description: </span>{{currentRequest.requestDescription}}</div>
            <div class="request-element request-money"><span style="color: grey">Matic award: </span>{{currentRequest.requestMoney}} MATIC</div>
            <div class="request-element request-hours"><span style="color: grey">Remaining hours: </span>{{currentRequest.requiredHours}}</div>
        </div>
    </div>
    <div class="answer-container">
        <!-- TO-DO -> put up a bunch of videoplayer thumbnails for now
        <div v-for="answer in currentRequest.answers" v-bind:key="answer.id">
            {{answer}}
        </div>--> 
    </div>
</template>
<script>
import axios from 'axios'
import { getQuestions, getAnswers } from '../services/videoracle'
import {ethers} from "ethers";


export default {
  data: function() {
    return {
      currentRequest: {},
      answers: [],
    }
  },
  async mounted() {
    // Get hte json file from IPFS through the CID in the routed URL
    var jsonURL = "https://ipfs.io/ipfs/" + this.$route.params.uriplustokenid.split('-')[0]
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

    // Get answers from the contract + IPFS
    const provider = await this.$store.state.web3Modal.connect()

    var qs = await getQuestions({ provider: new ethers.providers.Web3Provider(provider) })
    console.log(qs)

    // Get answers from the contract + IPFS
    var tokenId = this.$route.params.uriplustokenid.split('-')[1]
    console.log(this.$route.params.uriplustokenid.split('-')[1])
    console.log(tokenId)
    var qs = await getAnswers({ provider: new ethers.providers.Web3Provider(provider), questionId: tokenId })
    console.log(qs)

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

.btn-success {
  margin-top: 20px;
}

.request-title {
    font-size: 1.5em;
    font-weight: bold;
    margin-bottom: 20px;
}
.request-container-text {
    display: flex;
    flex-direction: column;
}
</style>