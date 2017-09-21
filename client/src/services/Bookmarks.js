import Api from '@/services/Api'

export default {
  getBookmark (bookmark) {
    return Api().get('bookmarks', {
      params: bookmark
    })
  },
  getBookmarks (userId) {
    return Api().get(`users/${userId}/bookmarks`)
  },
  deleteBookmark (id) {
    return Api().delete(`bookmarks/${id}`)
  },
  addBookmark (bookmark) {
    return Api().post('bookmarks', bookmark)
  }
}
