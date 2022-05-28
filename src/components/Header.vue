<template>
    <div class="header-nav-bar">
        <div class="left-side-header">
            <router-link style="margin-left: 0; margin-right: 10px;" to="/"><img class="videoracle-logo" alt="videoracle-logo" src="../assets/logo.png"/></router-link>
            <router-link style="margin-left: 0;" to="/"><img class="videoracle-logotype" alt="videoracle-logo" src="../assets/logotype.png"/></router-link>
        </div>
        <div class="center-side-header">
            <router-link to="/request">Request</router-link>
            <router-link to="/answerable-requests">Answer</router-link>
            <router-link to="/my-requests">My Requests</router-link>
        </div>
        <div v-if="!this.$store.state.active" class="right-side-header">
            <div class="btn btn-success" @click="connect">Connect to your Wallet</div>
        </div>
        <div v-else class="right-side-header">
            <div class="btn btn-success" @click="disconnect">Disconnect</div>
        </div>
        <web3-modal-component
        ref="web3modal"
        :theme="theme"
        :provider-options="providerOptions"
        cache-provider
        />
    </div>
</template>
<script>
import {Web3ModalComponent} from "web3modal-vue3"
import { web3Modal } from "../config/mixins"
import Header from "@/components/Header"

export default {
  components: {
    Header,
    Web3ModalComponent
  },
  mixins: [web3Modal],
  data() {
    return {
      theme: "light",
      number: 0,
      balance: 0
    }
  },
  created() {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      this.theme = "dark"
    }
  },
  mounted() {
    this.$nextTick(async () => {
      const web3modal = this.$refs.web3modal
      this.$store.commit("setWeb3Modal", web3modal)

    if (web3modal.cachedProvider) {
        await this.$store.dispatch("connect")
      }
    })
  },
  methods: {
    connect() {
      this.$store.dispatch("connect")
    },
    disconnect() {
      this.$store.dispatch("resetApp")
    }
  }
}
</script>

<style scoped>
.videoracle-logotype {
  height: 1.5rem;
}

.header-nav-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-decoration: none;
    margin-top: 20px;
    margin-bottom: 20px;
}

a {
    text-decoration: none;
    margin: 0 20px;
    color: black;
    font-size: 1.2rem;
}

.videoracle-logo {
    width: 50px;
    height: 50px;
    margin-right: 0px !important;
}

.left-side-header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 20%;
}

.center-side-header {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60%;
}

.right-side-header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 20%;
}

</style>
