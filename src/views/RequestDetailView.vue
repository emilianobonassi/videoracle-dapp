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
            <form action="/action_page.php">
                <input type="file" id="myFile" name="filename">
                <input type="submit">
            </form>
        </div>
    </div>
</template>
<script>
import axios from 'axios'

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
        var urlToUploadTheVidTo = await this.$axios
            .post('https://livepeer.com/api/asset/request-upload', {
                "name": file.name,
            }, {
                headers: {
                'Authorization': `Basic ${token}` , 
                'Content-Type': 'application/json'
                }, 
            })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
        })
        console.log(urlToUploadTheVidTo)
        var idLivePeer = await this.$axios
            .put(urlToUploadTheVidTo, {
                file: Buffer.from(file),
            }, {
                headers: {
                'Content-Type': 'video/mp4'
            }, 
        })
        console.log(idLivePeer)
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