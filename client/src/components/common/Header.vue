<template>
  <v-toolbar fixed flat dark class="blue">
    <v-toolbar-title>
      <span class="brand" @click="navigateTo('root')"> Tab-Tracker </span>
    </v-toolbar-title>
    <v-toolbar-items>
      <router-link to="songs" class="btn blue">Browse</router-link>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items v-if="!$store.state.userLoggedIn">
      <router-link to="login" class="btn blue">Log In</router-link>
      <router-link to="register" class="btn blue">Sign Up</router-link>
    </v-toolbar-items>
    <v-toolbar-items v-if="$store.state.userLoggedIn">
      <a href="#" class="btn blue" @click.prevent="logout()">Logout</a>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  export default {
    data () {
      return {
        drawer: true
      }
    },
    methods: {
      navigateTo (name) {
        this.$router.push({ name })
      },
      logout () {
        this.$store.dispatch('setToken', null)
        this.$store.dispatch('setUser', null)
      }
    }
  }
</script>

<style scoped>
  .brand {
    cursor: pointer;
    padding: 10px;
  }
</style>
