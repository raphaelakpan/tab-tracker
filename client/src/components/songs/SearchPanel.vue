<template>
  <div class="white elevation-2 search-panel">
    <v-form ref="form">
      <v-text-field
        label="Search Song"
        v-model="search"
      ></v-text-field>
    </v-form>
  </div>
</template>

<script>
  import _ from 'lodash'

  export default {
    data () {
      return {
        search: null
      }
    },
    watch: {
      search: _.debounce(async function (value) {
        const route = {
          name: 'songs'
        }

        if (this.search) {
          route.query = {
            search: this.search
          }
        }

        this.$router.push(route)
      }, 500),
      '$route.query.search': {
        immediate: true,
        handler (value) {
          this.search = value
        }
      }
    }
  }
</script>

<style scoped>
  .search-panel {
    height: 49px;
    margin-bottom: 10px;
    padding-left: 2px;
  }

  label {
    left: 0.5% !important;
  }
</style>
