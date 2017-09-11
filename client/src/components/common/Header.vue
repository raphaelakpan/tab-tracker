<template>
  <v-toolbar fixed flat dark class="blue">
    <v-toolbar-title>
      <span class="brand" @click="navigateTo('root')"> Tab-Tracker </span>
    </v-toolbar-title>
    <v-toolbar-items>
      <!-- <router-link to="/" class="btn blue">Browse</router-link> -->
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <router-link to="login" class="btn blue">Log In</router-link>
      <router-link to="register" class="btn blue">Sign Up</router-link>
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
      }
    }
  }
</script>

<style scoped>
  .brand {
    cursor: pointer;
  }
</style>
