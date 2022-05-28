<template>
    <div v-if="loading" class="loading-ovelay">
      <div class="loader"></div>
    </div>
    <div class="request-container">
        <!--<img class="request-element request-img" :src="currentRequest.requestImg">-->
        
        <div class="request-container-text">
            <div class="request-element request-title">{{currentRequest.requestTitle}}</div>
            <div class="request-element request-description"><span style="color: grey">Description: </span>{{currentRequest.requestDescription}}</div>
            <div class="request-element request-money"><span style="color: grey">Matic award: </span>{{currentRequest.requestMoney}} MATIC</div>
            <div class="request-element request-hours"><span style="color: grey">Remaining hours: </span>{{currentRequest.requiredHours}}</div>
            <form @submit.prevent="respondWithVideo">
                <input class="btn btn-success" type="submit" value="Submit Video proof">
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
      loading: false
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
        this.loading = true
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
        const answerTokenID = nftInfo.tokenId
        console.log("questionTokenID", questionTokenID)
        console.log("answerTokenID", answerTokenID)

      
        var answerQs = await answerQuestion({
          provider: new ethers.providers.Web3Provider(provider), 
          questionId: parseInt(questionTokenID),
          answerVideoId: parseInt(answerTokenID)
        })
        console.log(answerQs)
        this.loading = false

        return nftInfo
    }
  },
}
</script>
<style scoped>
.loading-ovelay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
}

.loader {
    position: absolute;
    top: 46%;
    left: 46%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    border: 10px solid #f3f3f3;
    border-radius: 50%;
    border-top: 10px solid #3498db;
    animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}


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