<template>
  <div>
    <Header :isLoggedIn="isLoggedIn" @logout="logout"></Header>
    <RegisterForm v-if="isRegister" @register="register" @login="preLogin"></RegisterForm>
    <LoginForm v-if="isLogin" @login="login" @googleLogin="googleLogin" @register="preRegister"></LoginForm>
    <KanbanContainer :isLoggedIn="isLoggedIn"></KanbanContainer>
  </div>
</template>

<script>
// Development
const baseURL = `http://localhost:3000/api`;

// Production
// const baseURL = `https://sunday-kanban.herokuapp.com/api`;

import axios from "axios";
import Header from "./layout/Header";
import RegisterForm from "./user/RegisterForm";
import LoginForm from "./user/LoginForm";
import KanbanContainer from "./KanbanContainer";

export default {
  name: "App",
  components: {
    Header,
    RegisterForm,
    LoginForm,
    KanbanContainer
  },
  data: function() {
    return {
      isRegister: false,
      isLogin: true,
      isLoggedIn: false
    };
  },
  mounted() {
    if (localStorage.getItem("token")) {
      this.isRegister = false;
      this.isLogin = false;
      this.isLoggedIn = true;
    } else {
      this.isRegister = false;
      this.isLogin = true;
      this.isLoggedIn = false;
    }
  },
  methods: {
    googleLogin(googleUser) {
      // console.log(googleUser.getAuthResponse().id_token);
      axios({
        method: "POST",
        url: `${baseURL}/login/google`,
        data: {
          id_token: googleUser.getAuthResponse().id_token
        }
      })
        .then(response => {
          localStorage.setItem("login_way", "google");
          const token = response.data.token;
          localStorage.setItem("token", token);
          this.isLoggedIn = true;
          this.isRegister = false;
          this.isLogin = false;
          this.showAllCategories();
          this.showAllTasks();
        })
        .catch(err => {
          console.log(err);
        });
    },
    logout() {
      if (localStorage.getItem("login_way") == "google") {
        const auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function() {
          console.log("User signed out.");
        });
        localStorage.clear();
        this.isLoggedIn = false;
        this.isRegister = false;
        this.isLogin = true;
      } else {
        localStorage.clear();
        this.isLoggedIn = false;
        this.isRegister = false;
        this.isLogin = true;
      }
    },
    preRegister() {
      this.isLogin = false;
      this.isRegister = true;
    },
    preLogin() {
      this.isLogin = true;
      this.isRegister = false;
    },
    register(registerData) {
      const { user_name, user_email, user_password } = registerData;
      axios({
        method: "POST",
        url: `${baseURL}/register`,
        data: {
          user_name,
          user_email,
          user_password
        }
      })
        .then(response => {
          const message = response.data.message;
          console.log(message);
        })
        .catch(err => {
          const errMessage = err.response.data.message;
          console.log(errMessage);
        });
    },
    login(loginData) {
      const { user_email, user_password } = loginData;
      axios({
        method: "POST",
        url: `${baseURL}/login`,
        data: {
          user_email,
          user_password
        }
      })
        .then(response => {
          const token = response.data.token;
          localStorage.setItem("token", token);
          this.isLoggedIn = true;
          this.isRegister = false;
          this.isLogin = false;
          this.showAllCategories();
          this.showAllTasks();
        })
        .catch(err => {
          const errMessage = err.response.data.message;
          console.log(errMessage);
        });
    }
  }
};
</script>

<style scoped></style>
