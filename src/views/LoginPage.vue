<template>
  <div class="signup-container">
    <h2>Login</h2>

    <form @submit.prevent="login">
      <div class="form-group">
        <label>Email</label>
        <input type="email" v-model="email" required />
      </div>

      <div class="form-group">
        <label>Password</label>
        <input type="password" v-model="password" required />
      </div>

      <button type="submit" class="signup-btn">Login</button>
    </form>

    <p class="switch-text">
      Don't have an account?
      <button class="link-btn" @click="goToSignup">Sign up</button>
    </p>

    <div v-if="error" class="error">
      {{ error }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      error: ""
    };
  },

  methods: {
    async login() {
      this.error = "";

      try {
        const response = await fetch("http://localhost:3000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password
          })
        });

        const data = await response.json();

        if (!response.ok) {
          this.error = data.message || "Login failed";
          return;
        }

        // Save JWT
        localStorage.setItem("token", data.token);

        // Redirect to protected home page
        this.$router.push("/");
      } catch (err) {
        this.error = "Server error. Please try again.";
      }
    },

    goToSignup() {
      this.$router.push("/signup");
    }
  }
};
</script>

<style scoped>
/* REUSE signup page styling */
.signup-container {
  background: #f0f0f0;
  padding: 25px;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  margin: 40px auto;
  text-align: left;
  box-shadow: 0 0 10px #ccc;
}

.form-group {
  margin-bottom: 14px;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  margin-bottom: 4px;
}

input {
  padding: 6px;
  border: 1px solid #888;
  border-radius: 6px;
}

input:focus {
  border-color: #2a4977;
  outline: none;
}

.signup-btn {
  margin-top: 12px;
  width: 100%;
  padding: 10px;
  background: #557798;
  color: black;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.signup-btn:hover {
  background: #a6bbe4;
}

.switch-text {
  margin-top: 15px;
  text-align: center;
}

.link-btn {
  background: none;
  border: none;
  color: #2a4977;
  font-weight: bold;
  cursor: pointer;
}

.link-btn:hover {
  text-decoration: underline;
}

.error {
  margin-top: 15px;
  background: #ffe6e6;
  padding: 12px;
  border: 1px solid #d9534f;
  border-radius: 6px;
  color: #d9534f;
}
</style>
