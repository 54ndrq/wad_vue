<template>
  <footer>
    <p id="copyRight">@2025 University of Tartu</p>
  </footer>
</template>

<script setup>
import {useStore} from "vuex";

const store = useStore();

function resetLikes() {
  store.dispatch("unlikeAll");
}
</script>

<style scoped>

footer {
  background-color: lightgray;
  text-align: center;
  padding: 10px;
  width: 100%;
  border-radius: 10px 10px 0 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}


#copyRight {
  text-decoration: underline;
}
</style>
