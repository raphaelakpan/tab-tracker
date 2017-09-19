import Api from '@/services/Api'

export default {
  getAllSongs (search) {
    return Api().get('songs', {
      params: { search }
    })
  },
  createSong (song) {
    return Api().post('songs', song)
  },
  getSong (id) {
    return Api().get('songs/' + id)
  },
  updateSong (id) {
    return Api().put('songs/' + id)
  },
  deleteSong (id) {
    return Api().delete('songs/' + id)
  }
}
