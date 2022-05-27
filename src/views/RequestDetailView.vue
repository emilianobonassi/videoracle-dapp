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
                <input type="file" id="myFile" name="filename">
                <input type="submit">
            </form>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
<<<<<<< HEAD
import { videonft } from '@livepeer/video-nft'
=======
>>>>>>> 3cfadd3a0a331e4413a0f63b208e0777cd6cbd64

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
        var token = "b97c9795-7807-49c8-b2a3-d739fc7a8453"
        const file = document.getElementById('myFile').files[0]
        console.log(file.name)
        // To upload videos from the filesystem
        const uploader = new videonft.minter.Uploader();
        // To process videos and export to IPFS
        const vodApi = new videonft.minter.Api({ auth: { token } });
        // To mint the NFT from the IPFS files
        const { chainId } = ethereum
        const web3 = new videonft.minter.Web3({ ethereum, chainId });
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