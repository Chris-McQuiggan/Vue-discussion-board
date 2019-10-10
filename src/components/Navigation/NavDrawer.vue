<template>
  <div id="nav-drawer">
    <v-navigation-drawer :value="handleDrawer" app clipped>
      <v-list dense>
        <v-list-item @click.prevent="navHandle('home')">
          <v-list-item-action>
            <v-icon>home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click.prevent="navHandle('all-posts')">
          <v-list-item-action>
            <v-icon>mdi-message-text</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>All Posts</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          v-if="!this.$store.state.loggedin"
          @click.prevent="handleOverlay('registerOverlay')"
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
        >
          <v-list-item-action>
            <v-icon>person</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="this.$store.state.loggedin" @click.prevent="logout">
          <v-list-item-action>
            <v-icon>person_outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  created() {
    this.$vuetify.theme.dark = true;
  },
  name: "nav-drawer",

  data() {
    return {
      drawer: false
    };
  },
  computed: {
    handleDrawer() {
      return this.$store.state.drawer;
    }
  },
  methods: {
    navHandle(name) {
      this.$router.push({ name: name });
    },
    logout() {
      this.$store.commit("logout");
    },
    handleOverlay(overlay) {
      this.$store.commit(overlay);
    }
  }
};
</script>