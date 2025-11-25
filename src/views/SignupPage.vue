<template>
  <div class="signup-container">
    <h2>Signup</h2>

    <form @submit.prevent="validatePassword">
      <div class="form-group">
        <label>Email</label>
        <input type="email" v-model="email" required />
      </div>

      <div class="form-group">
        <label>Password</label>
        <input type="password" v-model="password" required />
      </div>

      <button type="submit" class="signup-btn">Sign up</button>
    </form>

    <div v-if="errors.length" class="error">
      <strong>The password is not valid:</strong>
      <ul>
        <li v-for="(err, index) in errors" :key="index">{{ err }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },

  methods: {
    validatePassword() {
      this.errors = [];
      const pw = this.password;

      // Rules
      if (pw.length < 8 || pw.length > 14) {
        this.errors.push("Password must be between 8 and 14 characters");
      }
      if (!/^[A-Z]/.test(pw)) {
        this.errors.push("Password must start with an uppercase letter");
      }
      if ((pw.match(/[a-z]/g) || []).length < 2) {
        this.errors.push("Password must contain at least two lowercase letters");
      }
      if (!/[0-9]/.test(pw)) {
        this.errors.push("Password must include at least one number");
      }
      if (!pw.includes("_")) {
        this.errors.push("Password must include the character '_'");
      }

      if (this.errors.length > 0) {
        this.password = '';
      } else {
        alert("Signup successful!");
        //Clears the form
        this.email = '';
        this.password = '';
      }
    }
  }
};
</script>

<style scoped>
.signup-container {
  background: #f0f0f0;
  padding: 25px;
  border-radius: 12px;
  width: 350px;
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

.error {
  margin-top: 15px;
  background: #ffe6e6;
  padding: 12px;
  border-radius: 6px;
  color: red;
}
</style>
