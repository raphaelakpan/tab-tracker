<template>
  <div>
    <v-toolbar flat class="transparent">
      <v-list class="pa-0">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ loggedInUser }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-list class="pt-0" dense>
      <v-divider></v-divider>
      <v-list-tile @click="redirectTo('/')">
        <v-list-tile-action>
          <v-icon> dashboard </v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title> Home </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-expansion-panel expand v-if="userLoggedIn">
        <v-expansion-panel-content :value="true">
          <div slot="header"> Bookmarks </div>
          <v-card>
            <v-card-text class="grey lighten-3" v-if="bookmarks.length > 0">
              <v-data-table
                :headers="table.headers"
                :items="bookmarks"
                hide-actions
                class="elevation-1"
              >
              <template slot="items" scope="props">
                <td>{{ props.item.SongTitle }}</td>
                <td>{{ props.item.SongArtist }}</td>
              </template>
            </v-data-table>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-list>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import BookmarksApi from '@/services/Bookmarks'

  export default {
    data () {
      return {
        drawer: true,
        table: {
          headers: [
            { text: 'Title', value: 'title', align: 'left', sortable: false },
            { text: 'Artist', value: 'artist', align: 'left', sortable: false }
          ]
        }
      }
    },
    computed: {
      ...mapState([
        'user',
        'bookmarks',
        'userLoggedIn'
      ]),
      loggedInUser () {
        let email = ''

        if (this.user) {
          email = this.user.email
        }

        return email
      }
    },
    methods: {
      redirectTo (route) {
        this.$router.push(route)
      }
    },
    mounted () {
      if (this.user) {
        BookmarksApi.getBookmarks(this.user.id)
        .then(response => {
          this.$store.dispatch('setBookmarks', response.data.bookmarks)
        }).catch(error => {
          console.log(error.response.data)
        })
      }
    }
  }
</script>

<style>

</style>
