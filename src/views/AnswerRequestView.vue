<template>
    <div class="request-container">
        <!--<img class="request-element request-img" :src="currentRequest.requestImg">-->
        <div class="request-container-text">
            <div class="request-element request-title">{{currentRequest.requestTitle}}</div>
            <div class="request-element request-description"><span style="color: grey">Description: </span>{{currentRequest.requestDescription}}</div>
            <div class="request-element request-money"><span style="color: grey">Matic award: </span>{{currentRequest.requestMoney}} MATIC</div>
            <div class="request-element request-hours"><span style="color: grey">Remaining hours: </span>{{currentRequest.requiredHours}}</div>
            <form @submit.prevent="respondWithVideo">
                <input class="btn btn-success" type="submit">
            </form>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { videonft } from '@livepeer/video-nft'
import { answersCount4Question, answerQuestion } from '../services/videoracle'
import {ethers} from "ethers";


export default {
  props: ["questionId"],
  data: function() {
    return {
      currentRequest: {},
    }
  },
  async mounted() {
    // Log the questionId from the props
    console.log(this.$route.params)

    // Get hte json file from IPFS through the CID in the routed URL
    var jsonURL = "https://ipfs.io/ipfs/" + this.$route.params.uriplustokenid.split("-")[0];
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
  methods: {
    async respondWithVideo() { 
        const apiOpts = {
            // auth: { apiKey: process.env.VUE_APP_LIVEPEERKEY}, TO-DO MASK API KEY THROUGH EXTERNAL SERVICE
            auth: { apiKey: 'c43ab73b-cf09-480b-b81d-04cd72ad4027'},
            endpoint: videonft.api.prodApiEndpoint,
        }
        const { chainId } = ethereum
        const minter = new videonft.minter.FullMinter(apiOpts, { ethereum, chainId});
        console.log(minter)
        const file = await minter.uploader.pickFile();
        const title = "TEST VIDEO"

        let asset = await minter.api.createAsset(title, file);
        console.log(asset);
        const ipfs = await minter.api.exportToIPFS(asset.id);
        console.log(ipfs);
        const tx = await minter.web3.mintNft(ipfs.nftMetadataUrl);
        console.log(tx);
        const nftInfo = await minter.web3.getMintedNftInfo(tx);
        console.log(nftInfo);


        const provider = await this.$store.state.web3Modal.connect()

        const questionTokenID = this.$route.params.uriplustokenid.split("-")[1];
        const answerTokenID = await answersCount4Question({
          provider: new ethers.providers.Web3Provider(provider), 
          questionId: questionTokenID,
        })
        console.log("questionTokenID", questionTokenID)
        console.log("answerTokenID", answerTokenID)

      
        var answerQs = await answerQuestion({
          provider: new ethers.providers.Web3Provider(provider), 
          questionId: parseInt(questionTokenID),
          answerVideoId: parseInt(answerTokenID)
        })
        console.log(answerQs)

        return nftInfo
    }
  },
}
</script>
<style scoped>
.btn-success {
  margin-top: 20px;
}

.request-title {
    font-size: 1.5em;
    font-weight: bold;
    margin-bottom: 20px;
}

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