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
            <form @submit.prevent="uploadVideoToLivepeer">
                <input type="submit">
            </form>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { videonft } from '@livepeer/video-nft'

export default {
  data: function() {
    return {
      currentRequest: {
        id: '1q9241092',
        requestImg: "https://its-mobility.de/wp-content/uploads/placeholder.png",
        requestTitle: 'TEST ONE',
        requestDescription: 'THIS IS A TEST DESCRIPTION',
        requestMoney: 10,
        requiredHours: 310
      },
    }
  },
  methods: {
    async uploadVideoToLivepeer() { 
        const apiOpts = {
            // auth: { apiKey: process.env.VUE_APP_LIVEPEERKEY}, TO-DO MASK API KEY THROUGH EXTERNAL SERVICE
            auth: { apiKey: 'c43ab73b-cf09-480b-b81d-04cd72ad4027'},
            endpoint: videonft.api.prodApiEndpoint,
        }
        // Get file from the subit
        /*
        const videofile = document.getElementById('myFile').files[0]
        const title = videofile.name
        */

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
        return nftInfo
    }
  }
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