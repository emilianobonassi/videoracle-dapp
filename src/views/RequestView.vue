<template>
  <div class="requestPage">
    <div class="pagetitle">Make your request here</div>
    <form class="requestform" @submit.prevent="submit">
      <div class="form-titles">Request Title</div>
      <input class="form-inputs" v-model="requestTitle" type="text" placeholder="Request Title" />
      <div class="form-titles">Request Description</div>
      <textarea class="form-inputs" v-model="requestDescription" type="description" placeholder="Request Description" style="height: 200px;"  rows="10"></textarea>
      <div class="form-titles">Reward in Matic</div>
      <input class="form-inputs"  v-model="requestMoney" type="number" placeholder="Amount in Matic" />
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

      console.log(this.question)
      console.log(this.gigMoney)

      // Create json for the question to then store in ipfs
      const questionJson = {
        requestTitle: this.requestTitle,
        requestDescription: this.requestDescription,
        walletAddress: "0x206D6DE019C96d97c2CEC11b7447f6ED49005448", //this.$store.state.walletAddress,
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
