<template>
  <div id="app">
    <Header/>
    <main>
      <router-view/>
    </main>
    <Footer/>
  </div>
</template>

<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
</script>

<style>
html, body {
  height: 100%;
  overflow-x: hidden;
  margin: 0;  /* This takes away the browser's margins */
}

/* Takes away overflow of elements*/
* {
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

@media (max-width: 768px) {
  main {
    padding: 5%;
  }
}

@media (max-width: 480px) {
  main {
    padding: 8%;
  }
}

</style>
