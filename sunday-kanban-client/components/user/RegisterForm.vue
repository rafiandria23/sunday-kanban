<template>
  <div class="user-container mt-5">
    <form
      @submit.prevent="register"
      id="user-form"
      class="shadow"
    >
      <h3>Sign Up</h3>
      <div class="form-group">
        <label for="user_name">Your name</label>
        <input
          v-model="userData.user_name"
          type="text"
          class="form-control"
          id="user_name"
          aria-describedby="User's Name"
          placeholder="John Doe..."
        />
      </div>
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
      <button
        type="submit"
        class="mt-3 btn btn-primary"
      >Sign Up</button>
      <div>
        Have an account?
        <a type="button" @click.prevent="login">
          <b>Login</b>
        </a>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "RegisterForm",
  data: function() {
    return {
      userData: {
        user_name: "",
        user_email: "",
        user_password: ""
      }
    };
  },
  methods: {
    register() {
      const { user_name, user_email, user_password } = this.userData;
      this.$emit("register", { user_name, user_email, user_password });
    },
    login() {
      this.$emit("login");
    }
  }
};
</script>

<style scoped>
</style>