<template>
  <div class="panel">
    <search-panel> </search-panel>
    <songs-panel :songs="songs"> </songs-panel>
  </div>
</template>

<script>
  import SongsApi from '@/services/Songs'
  import SongsPanel from './SongsPanel.vue'
  import SearchPanel from './SearchPanel.vue'

  export default {
    components: {
      SongsPanel,
      SearchPanel
    },
    data () {
      return {
        songs: []
      }
    },
    watch: {
      '$route.query.search': {
        immediate: true,
        handler (search) {
          SongsApi.getAllSongs(search).then(response => {
            this.songs = response.data.songs
          }).catch(error => {
            console.log(error)
          })
        }
      }
    }
  }
</script>

<style scoped>
  .panel {
    margin: 0 auto;
    width: 70%;
  }

</style>
