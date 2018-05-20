/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Router from 'vue-router'
import Vuetify from 'vuetify'
import Theme from '@/components/Theme'
import store from '../store'

Vue.use(Router)
Vue.use(Vuetify)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Theme',
      component: Theme
    }
  ]
})
