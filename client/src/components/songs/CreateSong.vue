<template>
  <div class="form">
    <v-layout>
      <v-flex>
        <panel title="Add a New Song">
          <v-form v-model="valid" ref="form">
            <v-text-field
              label="Title"
              v-model="song.title"
              :rules="[rules.required]"
              required
            ></v-text-field>

            <v-text-field
              label="Genre"
              v-model="song.genre"
              :rules="[rules.required]"
              required
            ></v-text-field>

            <v-text-field
              label="Artist"
              v-model="song.artist"
              :rules="[rules.required]"
              required
            ></v-text-field>

            <v-text-field
              label="Album"
              v-model="song.album"
              :rules="[rules.required]"
              required
            ></v-text-field>

            <v-text-field
              label="Album Image Url"
              v-model="song.albumImageUrl"
              :rules="[rules.required, rules.urlRules]"
              required
            ></v-text-field>

            <v-text-field
              label="Youtube ID"
              v-model="song.youtubeId"
              :rules="[rules.required]"
              required
            ></v-text-field>

            <v-text-field
              label="Lyrics"
              v-model="song.lyrics"
              multi-line
              :rules="[rules.required]"
              rows="10"
              required
            ></v-text-field>

            <v-text-field
              label="Tab"
              v-model="song.tab"
              :rules="[rules.required]"
              multi-line
              required
            ></v-text-field>
            <div class="form-group">
              <v-btn dark class="blue" @click="createSong">Create</v-btn>
              <v-btn dark class="orange darken-4" @click="reset">Clear</v-btn>
            </div>
            <p v-if="message" class="red--text"> {{message}} </p>
            <p
              v-for="(error, index) in serverErrors"
              :key="index"
              class="red--text">
              {{ error }}
            </p>
            <div style="text-align: left">
              <router-link to="/songs">Back</router-link>
            </div>
          </v-form>
        </panel>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  /* eslint-disable no-useless-escape */

  import SongsApi from '@/services/Songs'

  export default {
    data () {
      return {
        song: {
          artist: '',
          title: '',
          genre: '',
          album: '',
          albumImageUrl: '',
          youtubeId: '',
          lyrics: '',
          tab: ''
        },
        valid: false,
        rules: {
          required: (v) => !!v || 'Field is required',
          urlRules:
            (v) => /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(v) || 'Invalid URL'
        },
        serverErrors: [],
        message: ''
      }
    },
    methods: {
      createSong () {
        this.message = ''
        this.valid = this.$refs.form.validate()
        if (!this.valid) {
          this.message = 'Please fill in all the required fields'
          return
        }

        SongsApi.createSong(this.song).then(response => {
          this.$refs.form.reset()
          this.$router.push({ name: 'songs' })
        }).catch(error => {
          this.serverErrors = error.response.data.errors
        })
      },
      reset () {
        this.message = ''
        this.$refs.form.reset()
      }
    }
  }
</script>

<style scoped>

</style>
