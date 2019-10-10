<template>
  <v-app id="app">
    <navBar />
    <v-content>
      <v-container>
        <!-- <v-row>
          <v-col align="center">
            <img alt="Vue logo" src="./assets/logo.png" />
          </v-col>
        </v-row>-->
        <v-row>
          <v-col cols="12">
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import navBar from "./components/Navigation/NavBar";
import routes from "./routes";

export default {
  name: "App",
  components: {
    navBar,
    routes
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #d1d9de; */
}
</style>
