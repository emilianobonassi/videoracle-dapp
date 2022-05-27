<template>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  <Header/>
  <router-view/>
  <Footer/>
</template>
<script>
import Header from './components/Header'
import Footer from './components/Footer'


export default {
  name: 'App',
  components: {
    Header, 
    Footer,
  },
}
</script>

<style>
#app {
  font-family: "Clarkson",Helvetica,sans-serif;
  font-display: swap;
  padding: 0 20px 0px 20px;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  justify-content: flex-start;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
