
<template>
    <div class="app">
        <v-navigation-drawer
        v-model="drawer"
        :mini-variant="miniVariant"
        :clipped="clipped"
        fixed
        app
        >
        <v-list>
            <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            router
            exact
            >
            <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title v-text="item.title" />
            </v-list-item-content>
            </v-list-item>
            
            <v-list-item
              @click="logoutFirebase()"
              href="#!"
              router
              exact
            >
              <v-list-item-action>
                  <v-icon>mdi-logout</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                  <v-list-item-title v-text="`Logout`" />
              </v-list-item-content>
            </v-list-item>
        </v-list>
        </v-navigation-drawer>
        <v-app-bar
        elevate-on-scroll
        :color="navbarConfig.plain ? `white` : `primary`"

        :dark="!navbarConfig.plain"
        :clipped-left="clipped"
        fixed
        app
        >
        <v-btn icon @click="goBack()" v-if="navbarConfig.goBack">
            <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" v-else />
        <v-toolbar-title v-text="navbarConfig.title || 'MindBloom'" />
        <v-spacer />
        </v-app-bar>
        <v-main class="py-0">
        <v-container>
            <slot />
        </v-container>
        </v-main>
        <v-bottom-navigation
        v-if="!hideFromPages"
        app
        :background-color="`white`"
        height="70"
        shift
        grow
        v-model="currentHomePage"
        color="primary"
        >
        <v-btn value="0">
            <span>Home</span>

            <v-icon>mdi-home</v-icon>
        </v-btn>

        <v-btn value="1">
            <span>History</span>

            <v-icon>mdi-chart-timeline-variant</v-icon>
        </v-btn>


        <v-btn value="2">
            <span>Medical</span>

            <v-icon>mdi-medical-bag</v-icon>
        </v-btn>

        <v-btn value="3">
            <span>My Profile</span>

            <v-icon>mdi-account</v-icon>
        </v-btn>
        </v-bottom-navigation>
    </div>
</template>

<script>
import { getAuth, signOut } from '@firebase/auth';
import { app } from '@/server/firebase';
import { mapMutations, mapState } from 'vuex';


const auth = getAuth(app);

export default {
  name: 'DefaultLayout',
  methods: {
    ...mapMutations('permaData', ['setHomePageSelector', 'setUserData']),
    goBack() {
      this.$router.go(-1);
    },
    async logoutFirebase() {
      await signOut(auth);

      this.setUserData({});
      
      this.$router.replace('/main-screen');
    }
  },
  computed: {
    ...mapState('permaData', ['navbarConfig', 'homePageSelector']),
    hideFromPages() {

      const hiddenFromThisPages = ['/signup', '/collect-data'];

      return hiddenFromThisPages.includes(this.$route.path);
    },
    currentHomePage: {
        get: function() {
            return this.homePageSelector;
        },
        set: function(value) {
            return this.setHomePageSelector(value)
        }
    },
  },
  data () {
    return {
      selectedMenu: 0,
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Let\'s Get Started'
    }
  }
}
</script>