<template>
  <div>
    <panel title="Songs">
      <v-btn fab class="cyan accent-2" light absolute right small slot="action" :to="{name: 'newSong'}">
        <v-icon>add</v-icon>
      </v-btn>
      <v-layout class="songs">
        <v-card v-for="(song, index) in songs" :key="song.id" class="song">
          <v-card-media :src="song.albumImageUrl || sampleImageUrl " height="200px">
          </v-card-media>
          <v-card-title primary-title>
            <div>
              <h3 class="display-1"> {{ song.title }} </h3>
              <h4 class="headline h3"> In : {{ song.album }} </h4>
              <div> By {{ song.artist }} </div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat class="blue--text" :to="'/songs/' + song.id">View</v-btn>
          </v-card-actions>
        </v-card>
      </v-layout>
    </panel>
  </div>
</template>

<script>
  export default {
    props: {
      songs: {
        type: Array
      }
    },
    data () {
      return {
        sampleImageUrl: 'http://via.placeholder.com/350x150'
      }
    }
  }
</script>

<style scoped>
  .songs {
    display: flex;
    flex-wrap: wrap
  }

  .song {
    width: 32.3%;
    margin: 0.5%
  }
</style>

