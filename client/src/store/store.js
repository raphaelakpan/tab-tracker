import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,
  plugins: [createPersistedState()],
  state: {
    token: null,
    user: null,
    userLoggedIn: false,
    bookmarks: []
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      if (token) {
        state.userLoggedIn = true
      } else {
        state.userLoggedIn = false
      }
    },
    setUser (state, user) {
      state.user = user
    },
    setBookmarks (state, bookmarks) {
      state.bookmarks = bookmarks
    },
    addBookmark (state, bookmark) {
      state.bookmarks.push(bookmark)
    },
    deleteBookmark (state, bookmarkId) {
      const index = state.bookmarks.findIndex(bookmark => {
        return bookmark.id === bookmarkId
      })
      state.bookmarks = [
        ...state.bookmarks.splice(0, index),
        ...state.bookmarks.splice(index + 1)
      ]
    }
  },
  actions: {
    setToken (context, token) {
      context.commit('setToken', token)
    },
    setUser (context, user) {
      context.commit('setUser', user)
    },
    setBookmarks ({ commit }, bookmarks) {
      commit('setBookmarks', bookmarks)
    },
    addBookmark ({ commit }, bookmark) {
      commit('addBookmark', bookmark)
    },
    deleteBookmark ({ commit }, bookmarkId) {
      commit('deleteBookmark', bookmarkId)
    }
  }
})

export default store
