import Vue from "vue";
import App from "../components/App.vue";
import io from "socket.io-client";
import VueSocketIOExt from "vue-socket.io-extended";

// Development
const socket = io("http://localhost:3000");

// Production
// const socket = io("https://sunday-kanban.herokuapp.com/api");

Vue.use(VueSocketIOExt, socket);

new Vue({
  render: createElement => createElement(App)
}).$mount("#app");