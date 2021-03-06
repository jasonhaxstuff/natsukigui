<template>
  <v-app id="inspire" dark>
    <navigationDrawer/>
    <v-content>
      <v-container fluid fill-height text-xs-center>
        <v-layout justify-center align-center row wrap>
          <chips />
          <v-flex xs12>
            <v-btn large style="background-color:#4286f4" to="/users" id='usersButton'><v-icon>account_circle</v-icon> <span v-if="this.$store.state.site.desktop">View Users</span></v-btn>
            <v-btn large style="background-color:#4286f4" to="/guilds" id='guildsButton'><i class="fas fa-users"></i>&nbsp;<span v-if="this.$store.state.site.desktop">View Guilds</span></v-btn>
            <v-btn large style="background-color:#4286f4" to="/giveaways" id='giveawaysButton'><v-icon>card_giftcard</v-icon> <span v-if="this.$store.state.site.desktop">View Giveaways</span></v-btn>
            <v-btn large style="background-color:#4286f4" to="/referrals" id='referralsButton'><v-icon>arrow_forward</v-icon> <span v-if="this.$store.state.site.desktop">View Referrals</span></v-btn>
            <div id="profile">
            </div>
          </v-flex>
          <v-flex shrink>
            <v-tooltip right>
              <v-btn slot="activator" href="https://github.com/jasonhaxstuff/nightwatchgui" icon large target="_blank">
                <v-icon large>code</v-icon>
              </v-btn>
              <span>Source</span>
            </v-tooltip>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <customFooter></customFooter>
  </v-app>
</template>

<script lang='ts'>
import axios from 'axios'
import NavigationDrawer from '@/components/NavigationDrawer.vue'
import Footer from '@/components/Footer.vue'
import Chips from '@/components/Chips.vue'
import Vue from 'vue'
import { apiUrl } from '@/config';

export default Vue.extend({
  components: {
    navigationDrawer: NavigationDrawer,
    customFooter: Footer,
    chips: Chips
  },
  data () {
    return {
      api: apiUrl
    }
  },
  created () {
    const x = window.innerWidth >= 1000
    const token = window.localStorage.getItem('token')
    const user = window.localStorage.getItem('user')

    this.$store.commit('setDesktop', x)

    if (token && user) {
      this.$store.commit('setToken', token)
      this.$store.commit('setUser', JSON.parse(user))
      this.$store.commit('setAuthenticated', true)

      this.loadUserInfo(this.$store.state.auth.user.id)
      return
    }

    if (window.location.toString().includes('nightwatch')) {
      window.location.href = 'http://www.nightwatch.ga/'
    } else if (window.location.toString().includes('localhost')) {
      window.location.href = 'http://localhost:8080/'
    }
  },
  methods: {
    loadUserInfo (id: string) {
      axios.get(`${this.api}/users/${id}`).then(response => {
        const div = document.getElementById('profile')

        if (!div) {
          return false
        }

        div.innerHTML = `
        <hr>
        <table style="margin:auto" class="highlight centered">
        <thead>
          <tr>
            <th>Property</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
        <tr>
          <td>Date created</td>
          <td>${response.data.dateCreated}</td>
        </tr>
        <tr>
          <td>ID</td>
          <td>${response.data.id}</td>
        </tr>
        <tr>
          <td>Avatar</td>
          <td><img src="${response.data.avatarUrl}" height="64" width="64"></td>
        </tr>
        <tr>
          <td>Date of last message</td>
          <td>${response.data.dateLastMessage}</td>
        </tr>
        <tr>
          <td>XP</td>
          <td>${response.data.level.xp}</td>
        </tr>
        <tr>
          <td>Level</td>
          <td>${response.data.level.level}</td>
        </tr>
        <tr>
          <td>Last level up</td>
          <td>${response.data.level.timestamp}</td>
        </tr>
        <tr>
          <td>Balance</td>
          <td>${response.data.balance.balance}</td>
        </tr>
        <tr>
          <td>Net worth</td>
          <td>${response.data.balance.netWorth}</td>
        </tr>
        <tr>
          <td>Last claimed dailies</td>
          <td>${response.data.balance.dateLastClaimedDailies}</td>
        </tr>
        <tr>
          <td>Title</td>
          <td>${response.data.profile.title}</td>
        </tr>
        <tr>
          <td>Bio</td>
          <td>${response.data.profile.bio}</td>
        </tr>
        <tr>
          <td>Background</td>
          <td>${response.data.profile.background}</td>
        </tr>
        <tr>
          <td>Levels enabled</td>
          <td>${response.data.settings.levelsEnabled}</td>
        </tr>
        <tr>
          <td>DMs enabled</td>
          <td>${response.data.settings.directMessagesEnabled}</td>
        </tr>
        <tr>
          <td>DB ID</td>
          <td>${response.data.settings.id}</td>
        </tr>
        </tbody>
        </table>
        <hr>
        `
      })
    }
  }
})
</script>
