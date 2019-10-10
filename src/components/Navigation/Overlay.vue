<template>
  <div id="overlay">
    <v-overlay :value="this.$store.state.overlay" :dark="this.$vuetify.theme.dark">
      <v-card width="344" class="mx-auto">
        <v-card-title>
          <v-row v-if="this.$store.state.login">
            <v-col cols="4">Login</v-col>
            <v-col cols="3" offset="5">
              <v-btn icon @click.prevent="handleOverlay('loginOverlay')">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row v-if="this.$store.state.register">
            <v-col cols="5">Register</v-col>
            <v-col cols="3" offset="4">
              <v-btn id="close-overlay" icon @click.prevent="handleOverlay('registerOverlay')">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-title>
        <Login v-if="this.$store.state.login" />
        <Register v-if="this.$store.state.register" />
      </v-card>
    </v-overlay>
  </div>
</template>

<script>
import Login from "./Login";
import Register from "./Register";

export default {
  components: {
    Register,
    Login
  },
  methods: {
    handleOverlay(overlay) {
      this.$store.commit(overlay);
    }
  }
};
</script>