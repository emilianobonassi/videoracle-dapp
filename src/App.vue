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
@font-face {
  font-family: 'SpaceGrotesk';
  src: url('./assets/SpaceGrotesk-VariableFont_wght.ttf');
}
.btn-success {
  background-color: #FFA739 !important;
  border-color: #FFA739 !important;
}

#app {
  font-family: "SpaceGrotesk",SpaceGrotesk,sans-serif;
  font-display: swap;
  padding: 0 5% 0px 5% ;
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
