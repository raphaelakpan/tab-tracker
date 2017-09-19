<template>
  <div class="song">
    <v-layout>
      <v-flex xs6 class="content elevation-2">
        <panel title="Song Details" style="height: 400px">
          <v-layout style="height: 325px">
            <v-flex xs6>
              <div>
                <div>
                  <img :src="song.albumImageUrl" class="album-image"> </img>
                </div>
              </div>
            </v-flex>

            <v-flex xs6 class="justify-center">
              <div>
                <div class="display-1 deep-orange--text">
                  <v-icon large class="deep-orange--text">audiotrack</v-icon>
                  {{song.title}}
                  <v-icon large class="deep-orange--text">audiotrack</v-icon>
                </div>
                <p>By</p>
                <div>
                  <span class="headline blue--text"> {{song.artist}} </span>
                </div>
                <p>In</p>
                <div>
                  <v-icon medium class="deep-orange--text">library_music</v-icon>
                  <span class="title deep-orange--text"> {{song.album}} </span>
                  <v-icon medium class="deep-orange--text">library_music</v-icon>
                </div>
              </div>
            </v-flex>
          </v-layout>
        </panel>

        <panel title="Lyrics">
          <div class="song-lyrics scroll">
            {{ song.lyrics }}
          </div>
        </panel>
      </v-flex>

      <v-flex xs6 ml-10 class="content elevation-2 ml-2">
        <panel title="Youtube" style="height: 400px">
          <youtube :video-id="song.youtubeId" player-width="100%" player-height="320"></youtube>
        </panel>
        <panel title="Guitar Tabs">
          <div class="song-tab scroll">
            {{song.tab}}
          </div>
        </panel>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import SongApi from '@/services/Songs'

  export default {
    data () {
      return {
        id: null,
        song: '',
        sampleImageUrl: 'http://via.placeholder.com/350x150'
      }
    },
    created () {
      this.id = this.$route.params.id
      SongApi.getSong(this.id).then(response => {
        this.song = response.data.song
      }).catch(error => {
        console.log(error.response)
      })
    }
  }
</script>

<style scoped>
  .song {
    width: 80%;
    margin: 0 auto;
  }

  .album-image {
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 10px;
    -webkit-box-shadow: 0px 0px 5px 0px rgba(0,0,0,1);
    -moz-box-shadow: 0px 0px 5px 0px rgba(0,0,0,1);
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,1);
  }

  .song-lyrics {
    white-space: pre-line;
    font-family: Monaco;
  }

  .content {
    padding: 10px;
  }

  .song-tab {
    white-space: pre-line;
    font-family: Monaco;
  }

  .scroll {
    overflow: scroll;
    height: 500px;
  }

  .justify-center {
    justify-content: center;
    align-items: center;
    display: flex;
  }

  .justify-center div > * {
    margin-bottom: 10px;
  }

  iframe {
    width: 100%
  }
</style>
