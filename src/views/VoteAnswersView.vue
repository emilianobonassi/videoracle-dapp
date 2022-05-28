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
    <div class="videoanswer-container">
        <div class="video-container" v-for="answer in answers" v-bind:key="answer.id">
          <div>{{answer.id + 1}}</div>
          <video width="320" height="240" controls>
            <source :src="answer.uri" type="video/mp4">
          </video>
          <button style="margin-top: 10px" class="btn-success" >Vote +1</button>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { getQuestions, getAnswers, submitVoting } from '../services/videoracle'
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
    this.answers = qs
    
    /*
    var ipfsTestLinks = ["https://ipfs.livepeer.com/ipfs/bafybeigsqlqiewusjphzcawpylaajxlesudu2je2iyybvfhkpijhk2rbdu",
                     "https://ipfs.livepeer.com/ipfs/bafybeiew466bk3caift2gsnzeb23qmzmpqnim32utahanj5f5ks2ycvk7y",
                     "https://ipfs.livepeer.com/ipfs/bafybeiao4uefvhu7ebv7ittydplg5rgyn47hex3wxrtrtqawwc3rnyg5ye"]

    for (var i = 0; i < ipfsTestLinks.length; i++) {
      var ipfsLink = ipfsTestLinks[i]
      this.answers.push({"id": i, "answerVideoId": ipfsLink})
    }
    */
  },
}


</script>
<style scoped>
.request-container {
    display: flex;
    flex-direction: row;
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
.videoanswer-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-top: 20px;
}

.video-container {
  width: 33%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>