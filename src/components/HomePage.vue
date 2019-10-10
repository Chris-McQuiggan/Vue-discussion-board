<template>
  <div id="home-page">
    <v-row>
      <v-col align="center">
        <img alt="Vue logo" src="../assets/logo.png" style="height:100%" />
      </v-col>
    </v-row>
    <h1>Welcome to the dicussion board</h1>
    <v-carousel
      :show-arrows="false"
      continuous
      :cycle="true"
      hide-delimiter-background
      delimiter-icon="mdi-minus"
      height="450"
    >
      <v-carousel-item v-for="(item,i) in items" :key="i">
        <img
          :src="item.src"
          style="width:auto;max-width:100%;height:auto;max-height:100%;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);"
        />
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {
  name: "home-page",
  data() {
    return {
      items: [
        {
          src: require("../assets/forum.jpg")
        },
        {
          src: require("../assets/positivepostit.jpg")
        },
        {
          src: require("../assets/logo.svg")
        },
        {
          src: require("../assets/postBoxes.jpg")
        },
        {
          src: require("../assets/goalPost.jpg")
        }
      ]
    };
  }
};
</script>

<style scoped>
</style>