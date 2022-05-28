<template>
    <div class="seerequestswrapper">
        <div class="pagetitle">Answer this questions</div>
            <div v-for="req in myRequests" v-bind:key="req.id">
                <div class="request-container">
                    <img class="request-element request-img" :src="req.requestImg">
                    <div class="request-element request-title">{{req.requestTitle}}</div>
                    <div class="request-element request-description">{{req.requestDescription}}</div>
                    <div class="request-element request-money">{{req.requestMoney}}</div>
                    <div class="request-element request-hours">{{req.requiredHours}}</div>
                    <div class="request-element request-timestamp">{{req.timestamp}}</div>
                </div>
            <button class="btn btn-success" @click="voteAnswers(req.questionURI, req.tokenID)">Vote the best answer</button>
        </div>
    </div>
</template>
<script>
import { getQuestions } from '../services/videoracle'
import {ethers} from "ethers";
import axios from 'axios'


export default {
  data: function() {
    return {
      myRequests: [],
    }
  },
  async mounted() {
    console.log("mounted")
    const provider = await this.$store.state.web3Modal.connect()
    var qs = await getQuestions({ provider: new ethers.providers.Web3Provider(provider) })
    console.log(qs)

    // Append every questionURI's json from IPFS to the requests array
    for (var i = 0; i < qs.length; i++) {
      var jsonURL = "https://ipfs.io/ipfs/" + qs[i].questionURI
      console.log(jsonURL)
      var questionJson = await axios.get(jsonURL).then(function(response) {
        return response.data;
      });
      questionJson["questionURI"] = qs[i].questionURI
      questionJson["tokenID"] = i
      console.log(questionJson)
      console.log(this.$store.state)
      if (questionJson.walletAddress == this.$store.state.account) {
        this.myRequests.push(questionJson)
      }
    }
  },
    methods: {
        voteAnswers: function(uri, questionId) {
            this.$router.push("/vote-answers/" + uri + '-' + questionId);
        }
    },
}


</script>
<style scoped>
.seerequestswrapper {
    padding: 20px;
}
  .pagetitle {
    font-size: 2em;
    margin-bottom: 1em;
  }
.request-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}
.request-img {
  max-width: 300px; 
}
.request-title {
  font-size: 20px;
  font-weight: bold;
}
.request-description {
  font-size: 15px;
}
.request-money {
  font-size: 15px;
}
.request-hours {
  font-size: 15px;
}
.request-timestamp {
  font-size: 15px;
}
.request-title {
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>