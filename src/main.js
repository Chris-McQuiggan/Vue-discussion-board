import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import BootstrapVue from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import routes from "./routes";
import store from "./store/index.js";
import vuetify from "./plugins/vuetify";

Vue.use(VueRouter);
Vue.use(BootstrapVue);

Vue.config.productionTip = false;
const router = new VueRouter({ mode: "history", routes });

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
