<template>
  <div id="all-posts">
    <v-snackbar v-model="snackbar" :timeout="tOut" top right>
      Login to add a comment
      <v-btn color="primary" icon text @click="snackbar = false">
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>

    <v-row>
      <v-col cols="12">
        <v-parallax
          src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
          height="400"
          jumbotron
        >
          <h1>Forums</h1>
        </v-parallax>
        <v-tabs id="tabs" v-model="tab" background-color="transparent" grow>
          <v-tab
            :id="index"
            v-for="(item, index) in items"
            :key="item"
            @click="handleTab(item)"
          >{{ item }}</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item v-for="item in items" :key="item">
            <Topic1 v-if="tab==0" />
            <Topic2 v-if="tab==1" />
            <Topic3 v-if="tab==2" />
            <Topic4 v-if="tab==3" />
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// import PostTemplate from "./PostTemplate";
// import NewPost from "./NewPost";
import Topic1 from "./tabs/Topic1";
import Topic2 from "./tabs/Topic2";
import Topic3 from "./tabs/Topic3";
import Topic4 from "./tabs/Topic4";

export default {
  name: "all-posts",
  data() {
    return {
      show: true,
      tab: null,
      items: ["topic 1", "topic 2", "topic 3", "topic 4"],
      text: "",
      snackbar: false,
      tOut: 10000
    };
  },
  components: {
    // NewPost,
    // PostTemplate,
    Topic1,
    Topic2,
    Topic3,
    Topic4
  },
  mounted() {
    this.toggleSnackbar;
  },
  computed: {},
  methods: {
    toggleSnackbar() {
      if (this.$store.state.user.username === null) {
        this.snackbar = true;
      } else {
        this.snackbar = false;
      }
    },
    handleTab(item) {
      let liveItem = item.replace(/\s+/g, "");
      this.$store.commit("setTopic", liveItem);
    }
  }
};
</script>
<style scoped>
h3 {
  text-align: center;
}
</style>