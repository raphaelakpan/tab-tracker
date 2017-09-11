<template>
  <div id="app">
    <v-app>
      <app-header></app-header>
      <main>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </main>
   </v-app>
  </div>
</template>

<script>
  import AppHeader from '@/components/common/Header.vue'

  export default {
    components: {
      AppHeader
    }
  }
</script>

<style>
body {
  background: #eee;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.router-link-exact-active {
  background: #eee !important;
  color: #000 !important;
  opacity: 0.7;
  font-weight: 900;
}
</style>
