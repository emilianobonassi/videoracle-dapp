<template>
  <div class="home">
    <div>Upload your gig question here</div>
    <form @submit.prevent="submit">
      <input v-model="question" type="text" placeholder="gig" />
      <input v-model="gigMoney" type="number" placeholder="gigMoney" />
      <button @click="uploadTheQuestion" type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { uploadBlob } from "../services/ipfs.js"
import { ref } from "vue";


export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  data() {
    return {
      question: '',
      gigMoney: 0
    }
  },
  methods: {
    async uploadTheQuestion() {

      var finished = ref(0);

      console.log(this.question)
      console.log(this.gigMoney)

      // Create json for the question to then store in ipfs
      const questionJson = {
        question: this.question,
        walletAddress: "0x206D6DE019C96d97c2CEC11b7447f6ED49005448", //this.$store.state.walletAddress,
        gigPrize: this.gigMoney,
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
