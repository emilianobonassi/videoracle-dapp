<template>
    <div class="seerequestswrapper">
    <div class="pagetitle">Answer this questions</div>
        <div v-for="req in requests" v-bind:key="req.id">
            <div class="request-container">
                <img class="request-element request-img" :src="req.requestImg">
                <div class="request-element request-title">{{req.requestTitle}}</div>
                <div class="request-element request-description">{{req.requestDescription}}</div>
                <div class="request-element request-money">{{req.requestMoney}}</div>
                <div class="request-element request-hours">{{req.requiredHours}}</div>
                <div class="request-element request-timestamp">{{req.timestamp}}</div>
            </div>
            <button class="btn btn-success" @click="answerRequest(req.id)">Answer</button>
        </div>
    </div>
</template>
<script>
export default {
  data: function() {
    return {
      requests: [{
        id: '1q9241092',
        requestImg: "https://its-mobility.de/wp-content/uploads/placeholder.png",
        requestTitle: 'TEST ONE',
        requestDescription: 'THIS IS A TEST DESCRIPTION',
        requestMoney: 10,
        requiredHours: 310
      }],
    }
  },
  methods: {
    answerRequest: function(id) {
      this.$router.push("/see-requests/" + id);
    }
  }
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