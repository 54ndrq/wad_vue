<template>
  <div class="main-page-footer">
    <button class="reset-likes" @click="resetLikes()"> Reset likes</button>
    <footer>
      <p id="copyRight">@2025 University of Tartu</p>
    </footer>
  </div>
</template>

<script setup>
import {useStore} from "vuex";

const store = useStore();

function resetLikes() {
  store.dispatch("unlikeAll");
}
</script>

<style scoped>
.main-page-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

footer {
  background-color: lightgray;
  text-align: center;
  padding: 10px;
  width: 100%;
  border-radius: 10px 10px 0 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.reset-likes {
  background-color: #a6bbe4;
  border: none;
  padding: 4px 9px;
  border-radius: 15px;
  cursor: pointer;
}

#copyRight {
  text-decoration: underline;
}
</style>
