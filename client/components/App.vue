<template>
  <div>
    <Header :isLoggedIn="isLoggedIn" @logout="logout"></Header>
    <RegisterForm
      v-if="isRegister"
      @register="register"
      @login="preLogin"
    ></RegisterForm>
    <LoginForm
      v-if="isLogin"
      @login="login"
      @register="preRegister"
    ></LoginForm>
    <KanbanContainer
      :categories="categories"
      :tasks="tasks"
      v-if="isLoggedIn"
    ></KanbanContainer>
  </div>
</template>

<script>
const baseURL = `http://localhost:3000/api`;

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
      isLoggedIn: false,
      categories: [],
      tasks: []
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      this.isLoggedIn = false;
      this.isRegister = false;
      this.isLogin = true;
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
          console.log(token);
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
    },
    showAllCategories() {
      axios({
        method: "GET",
        url: `${baseURL}/categories`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(response => {
          const categories = response.data.categories;
          this.categories = [...categories];
        })
        .catch(err => {
          const errMessage = err.response.data.message;
          console.log(errMessage);
        });
    },
    showAllTasks() {
      axios({
        method: "GET",
        url: `${baseURL}/tasks`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(response => {
          console.log(response);
          const tasks = response.data.tasks;
          if (!tasks) {
            this.tasks = [];
          } else {
            this.tasks = [...tasks];
          }
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
