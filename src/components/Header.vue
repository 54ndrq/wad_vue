<template>
  <header>
    <nav>
      <router-link to="/">Main</router-link>
      |
      <router-link to="/signup">Sign up</router-link>
    </nav>
  </header>
</template>

<script setup>
</script>

<style scoped>

nav {
  background-color: lightgray;
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
