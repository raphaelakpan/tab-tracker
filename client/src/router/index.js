import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Register from '@/components/user/Register'
import Login from '@/components/user/Login'

import Songs from '@/components/songs/Songs'
import CreateSong from '@/components/songs/CreateSong'
import ViewSong from '@/components/songs/ViewSong'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/songs',
      name: 'songs',
      component: Songs
    },
    {
      path: '/songs/new',
      name: 'newSong',
      component: CreateSong
    },
    {
      path: '/songs/:id',
      name: 'viewSong',
      component: ViewSong
    }
  ]
})
