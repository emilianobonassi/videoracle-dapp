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
        <div>
            <form @submit.prevent="respondWithVideo">
                <input type="submit">
            </form>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { videonft } from '@livepeer/video-nft'
import { answerQuestion } from '../services/videoracle'

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


        const questionURI = this.$route.params.id;
        const answerURI = ipfs.videoFileCid
        console.log("questionURI", questionURI)
        console.log("answerURI", answerURI)

        await answerQuestion({
          questionId: questionURI,
          answerVideoId: answerURI
        })

        return nftInfo
    }
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