<template>
  <div id="app">
    <v-app>
       <v-navigation-drawer temporary light v-model="drawer" overflow>
         <nav-drawer-content> </nav-drawer-content>
      </v-navigation-drawer>
      <app-header>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      </app-header>
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
  import NavDrawerContent from '@/components/common/NavDrawerContent.vue'

  export default {
    components: {
      AppHeader,
      NavDrawerContent
    },
    data () {
      return {
        drawer: true
      }
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
    /* margin-top: 60px; */
  }

  .router-link-exact-active {
    background: #eee !important;
    color: #000 !important;
    opacity: 0.7;
    font-weight: 900;
  }

  .form {
    margin: 0 auto;
    width: 40%;
  }

  a {
    text-decoration: none;
  }
</style>
