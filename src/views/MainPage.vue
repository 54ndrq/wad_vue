<template>
  <div class="main-page">
    <h1>Welcome to PostIt</h1>
    <div class="post-container">
      <post v-for="post in allPosts"
            :key="post.id"
            :post="post"/>
    </div>
  </div>
</template>

<script setup>
import Post from "@/components/Post.vue";
import {useStore} from "vuex";
import {computed, onMounted} from "vue";

const store = useStore();
const allPosts = computed(() => store.getters.allPosts);
onMounted(() => {
  store.dispatch("fetchPosts");
});
</script>

<style scoped>
.post-container {
  display: flex;
  flex-direction: column;
  max-width: 70%;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .post-container {
    display: flex;
    flex-direction: column;
    max-width: 100%;
    margin: 0 auto;
  }
}

</style>
