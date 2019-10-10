<template>
  <div id="nav-bar">
    <Overlay />
    <!-- <NavDrawer /> -->
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item @click.prevent="navHandle('home')" id="Home">
          <v-list-item-action>
            <v-icon>home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click.prevent="navHandle('all-posts')" id="Forum">
          <v-list-item-action>
            <v-icon>forum</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Forums</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          v-if="!this.$store.state.loggedin"
          @click.prevent="handleOverlay('registerOverlay')"
          id="Register"
        >
          <v-list-item-action>
            <v-icon>person_add</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Register</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-if="!this.$store.state.loggedin"
          @click.prevent="handleOverlay('loginOverlay')"
          id="Login"
        >
          <v-list-item-action>
            <v-icon>person</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="this.$store.state.loggedin" @click.prevent="logout" id="Logout">
          <v-list-item-action>
            <v-icon>person_outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click.prevent="navHandle('api')" id="API">
          <v-list-item-action>
            <v-icon>mdi-coin</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Crypto API</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click.prevent="navHandle('poem')" id="poem">
          <v-list-item-action>
            <v-icon>menu_book</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Poem Search</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon id="Menu" @click.stop="drawer=!drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Discussion Board</v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-switch
        style="margin-top:24px"
        append-icon="nights_stay"
        v-model="darkMode"
        @click.native="isDark"
      />
    </v-app-bar>

    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
  </div>
</template>

<script>
import Overlay from "./Overlay";
// import NavDrawer from "./NavDrawer";

export default {
  name: "nav-bar",
  components: {
    Overlay
    // NavDrawer
  },
  data() {
    return {
      overlay: false,
      drawer: null,
      darkMode: true
    };
  },
  created() {
    this.$vuetify.theme.dark = this.darkMode;
  },
  methods: {
    isDark() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      if (this.$vuetify.theme.dark) {
        this.darkMode = true;
      } else {
        this.darkMode = false;
      }
    },
    handleDrawer() {
      this.$store.commit("toggleDrawer");
    },
    handleOverlay(overlay) {
      this.$store.commit(overlay);
    },
    navHandle(name) {
      this.$router.push({ name: name });
    },
    logout() {
      this.$store.commit("logout");
    }
  }
};
</script>

<style scoped>
.v-expansion-panel {
  box-shadow: none !important;
}
</style>