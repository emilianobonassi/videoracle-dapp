<template>
    <div class="header-nav-bar">
        <div class="left-side-header">
            <router-link to="/"><img class="videoracle-logo" alt="videoracle-logo" src="../assets/logo-placeholder.png"/></router-link>
            <router-link style="margin-left: 0;" to="/">Videoracle</router-link>
        </div>
        <div class="center-side-header">
            <router-link to="/request">Request</router-link>
            <router-link to="/see-requests">Answer</router-link>
        </div>
        <div class="right-side-header">
            <div class="btn btn-success" @click="connect">Connect to your Wallet</div>
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
    }
  }
}
</script>

<style scoped>
.header-nav-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-decoration: none;
    margin-top: 20px;
}

a {
    text-decoration: none;
    margin: 0 20px;
    color: black;
}

.videoracle-logo {
    width: 50px;
    height: 50px;
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
