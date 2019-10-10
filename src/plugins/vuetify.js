import Vue from "vue";
import Vuetify from "vuetify/lib";
import "material-design-icons-iconfont/dist/material-design-icons.css";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: { textbox: "#EEEEEE", danger: "#F44336", topicbg: "#FAFAFA" },
      dark: {
        primary: "#00bcd4",
        secondary: "#2196f3",
        accent: "#03a9f4",
        error: "#F44336",
        danger: "#F44336",
        warning: "#ff9800",
        info: "#005F6B",
        success: "#8bc34a",
        textbox: "#616161",
        topicbg: "#212121"
      }
    }
  },
  icons: {
    iconfont: "md"
  }
});
