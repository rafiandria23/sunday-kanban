<template>
  <div class="user-container mt-5">
    <form @submit.prevent="login" id="user-form" class="shadow">
      <h3>Login</h3>
      <div class="form-group">
        <label for="user_email">Email</label>
        <input
          v-model="userData.user_email"
          type="email"
          class="form-control"
          id="user_email"
          aria-describedby="User's Email"
          placeholder="johndoe@email.com"
        />
      </div>
      <div class="form-group">
        <label for="user_password">Password</label>
        <input
          v-model="userData.user_password"
          type="password"
          class="form-control"
          id="user_password"
          placeholder="Password"
        />
      </div>
      <button type="submit" class="mt-3 btn btn-primary">Login</button>
      <div>
        Don't have an account?
        <a type="button" @click.prevent="register">
          <b>Sign Up</b>
        </a>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
  data: function() {
    return {
      userData: {
        user_email: "",
        user_password: ""
      }
    };
  },
  methods: {
    login() {
      const { user_email, user_password } = this.userData;
      this.$emit("login", { user_email, user_password });
    },
    register() {
      this.$emit("register");
    }
  }
};
</script>

<style scoped>
</style>