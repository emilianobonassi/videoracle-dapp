<template>
  <div class="requestPage">
    <div class="pagetitle">Make your request here</div>
    <form class="requestform" @submit.prevent="submit">
      <div class="form-titles">Request Title</div>
      <input class="form-inputs" v-model="requestTitle" type="text" placeholder="Request Title" />
      <div class="form-titles">Request Description</div>
      <textarea class="form-inputs" v-model="requestDescription" type="description" placeholder="Request Description" style="height: 200px;"  rows="10"></textarea>
      <div class="form-titles">Reward in Matic</div>
      <input class="form-inputs"  v-model="requestMoney" placeholder="Amount in Matic" />
      <div class="form-titles">Timeframe in hours</div>
      <input class="form-inputs"  v-model="requiredHours" type="number" placeholder="Required hours" />
      <button class="btn btn-success" style="width: 20%" @click="uploadTheQuestion" type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
import { uploadBlob } from "../services/ipfs.js"
import { ref } from "vue";

import { askQuestion } from '../services/videoracle'

import {ethers} from "ethers";

export default {
  name: 'RequestView',
  data() {
    return {
      requestTitle: '',
      requestDescription: '',
      requestMoney: 0,
      requiredHours: 0
    }
  },
  methods: {
    async uploadTheQuestion() {
      var finished = ref(0);

      if(!this.$store.state.active) {
        await this.$store.dispatch('connect')
        return
      }

      // Create json for the question to then store in ipfs
      const questionJson = {
        requestTitle: this.requestTitle,
        requestDescription: this.requestDescription,
        walletAddress: this.$store.state.account,
        requestMoney: this.requestMoney,
        requiredHours: this.requiredHours,
        timestamp: Date.now()
      }
      console.log(questionJson)

      // Upload the question to ipfs
      const questionHash = await uploadBlob(JSON.stringify(questionJson))     
      console.log(questionHash)
      finished.value++;
      
      const { error } = questionHash;
      if (error && error instanceof Error) {
        console.error(error);
        return;
      }

      const provider = await this.$store.state.web3Modal.connect()

      await askQuestion({
        provider: new ethers.providers.Web3Provider(provider),
        time2answer: this.requiredHours*60*60,
        reward: this.requestMoney,
        questionURI: questionHash.data.cid
      })

      return questionHash;
    }
  }
}
</script>
<style scoped>
.requestPage { 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2%;
  margin-bottom: auto;
}


  .requestform {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: flex-start;
    width: 50%;
  }

  .pagetitle {
    font-size: 2em;
    margin-bottom: 1em;
  }

  .form-titles {
    font-size: 1.3em;
    margin-bottom: 0.4em;
  }
  .form-inputs {
    width: 100%;
    height: 2em;
    border-radius: 5px;
    border: 1px solid #ccc;
    padding: 0.5em;
    margin-bottom: 0.8em;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;

  }
  
</style>
