import Vue from "vue";
import App from "./App.vue";
import vuetify from "@/plugins/vuetify";
import VueRouter from "vue-router";
import store from "./store/store";

import Home from "./views/Home";
import Pets from "./views/Pets";
import Favorites from "./views/Favorites";
import Form from "./views/Form";

Vue.use(VueRouter);
//routes for the home and pets pages
const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/pets",
    component: Pets
  },
  {
    path: "/favorites",
    component: Favorites
  },
  {
    path: "/form",
    component: Form
  }
];
//Creating a VueRouter instance and passing our routes to it
const router = new VueRouter({ routes });

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
