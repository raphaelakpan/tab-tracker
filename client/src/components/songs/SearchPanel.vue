<template>
  <div class="mb-2">
    <panel title="Search Song">
      <v-form ref="form">
        <v-text-field
          label="Search Song"
          v-model="search"
        ></v-text-field>
      </v-form>
    </panel>
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

<style>

</style>
