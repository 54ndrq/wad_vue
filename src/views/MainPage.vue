<template>
  <div class="main-page">
    <h1>Main Page</h1>
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
  align-items: center;
  max-width: 500px;
  margin: 0 auto;
}

</style>
