<template>
  <div class="main-page">
    <h1>Welcome to PostIt</h1>
    <div class="post-container">
      <post v-for="post in allPosts"
            :key="post.id"
            :post="post"/>
    </div>
  </div>
  <div>
    <button class="reset-likes" @click="resetLikes()"> Reset likes</button>
  </div>
</template>

<script setup>
import Post from "@/components/Post.vue";
import {useStore} from "vuex";
import {computed, onMounted} from "vue";

const store = useStore();
const allPosts = computed(() => store.getters.allPosts);

function resetLikes() {
  store.dispatch("unlikeAll");
}

onMounted(() => {
  store.dispatch("fetchPosts");
});
</script>

<style scoped>
.post-container {
  display: flex;
  flex-direction: column;
  max-width: 900px;
  margin: 0 auto;
  padding: 15px 0;
}

.reset-likes {
  background: #557798;
  color: lightgray;
  border: none;
  padding: 5px 10px;
  margin-bottom: 2%;
  border-radius: 15px;
  cursor: pointer;
}

.reset-likes:hover {
  background: #a6bbe4;
  color: black;
}

@media (max-width: 768px) {
  .post-container {
    display: flex;
    flex-direction: column;
    max-width: 100%;
    margin: 0 auto;
    padding: 10px;
  }
}

@media (max-width: 480px) {
  .post-container {
    max-width: 100%;
    padding: 8px;
  }
}

</style>
