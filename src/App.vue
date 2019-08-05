<template>
  <div id="app">
    <NavBar />

    <div class="container my-3">
      <router-view/>
    </div>
    
    <footer class="info">
      <p></p>
    </footer>
  </div>
</template>

<script>
  import NavBar from './components/shared/NavBar';

  //Soporte en toda la aplicación para HighCharts
  //import Vue from 'vue'
  //import HighchartsVue from 'highcharts-vue'

  // app Vue instance
  const app = {
    name: 'app',
    components: {
      NavBar
    },

    // app initial state
    data: () => {
      return {
      }
    }
  }

  export default app
</script>

<style>
  [v-cloak] { display: none; }
</style>