import Vue from "vue";
import App from "../components/App.vue";

new Vue({
  render: createElement => createElement(App)
}).$mount("#app");






// const baseURL = `http://localhost:3000/api`;

// const categories = ["Backlog", "Product", "Development", "Done"];

// const headerNavbar = new Vue({
//   el: "#header-navbar",
//   data: {
//     categories: [...categories]
//   }
// });

// const userForm = new Vue({
//   el: "#user-form",
//   data: {
//     loading: false,
//     userStatus: false,
//     registerStatus: false,
//     loginStatus: true,
//     userData: {
//       user_name: "",
//       user_email: "",
//       user_password: ""
//     }
//   },
//   methods: {
//     login: function(e) {
//       e.preventDefault();
//       this.loading = true;
//       const loginData = {
//         user_email: this.userData.user_email,
//         user_password: this.userData.user_password
//       };
//       axios
//         .post(`${baseURL}/login`, loginData)
//         .then(response => {
//           this.loading = false;
//           console.log(response);
//         })
//         .catch(err => {
//           this.loading = false;
//           console.log(err);
//         });
//     }
//   }
// });

// const kanban = new Vue({
//   el: "#kanban",
//   data: {
//     login: false,
//     categories: [...categories],
//     tasks: null
//   },
//   methods: {
//     getAllTasks: function(e) {
//       e.preventDefault();
//     }
//   }
// });
