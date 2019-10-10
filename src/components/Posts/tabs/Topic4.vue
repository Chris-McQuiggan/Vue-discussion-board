<template>
  <v-card flat color="topicbg" id="Topic4">
    <v-card-text>
      <v-container fluid>
        <v-row>
          <v-col v-if="this.$store.state.user.username!==null" cols="3">
            <NewPost />
          </v-col>
          <v-col v-else cols="3" />
          <v-col cols="6">
            <div v-for="info in this.$store.state.topic4.slice().reverse()" :key="info.id">
              <PostTemplate :data="info"></PostTemplate>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>
<script>
import PostTemplate from "../PostTemplate";
import NewPost from "../NewPost";

export default {
  name: "Topic4",
  components: {
    NewPost,
    PostTemplate
  }
};
</script>