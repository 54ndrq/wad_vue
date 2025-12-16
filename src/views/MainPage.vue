<template>
  <div class="main-page">
    <h1>Welcome to PostIt</h1>
    <div class="post-container">
      <button class="logout-btn" @click="logout">
        Logout
      </button>
      <post v-for="post in allPosts"
            :key="post.id"
            :post="post"
            class="clickable-post"
            @click="goToPost(post.id)"
      />
    </div>
  </div>
  <div>
    <button class="reset-likes" @click="resetLikes()"> Reset likes</button>
  </div>
</template>

<script setup>
import Post from "@/components/Post.vue"
import {useStore} from "vuex"
import {computed, onMounted} from "vue"
import {useRouter} from "vue-router"

const store = useStore()
const router = useRouter()

const allPosts = computed(() => store.getters.allPosts)

function resetLikes() {
  store.dispatch("unlikeAll")
}

function logout() {
  store.dispatch("logout")
  router.push("/login")
}

function goToPost(id) {
  router.push(`/post/${id}`)
}

onMounted(() => {
  store.dispatch("fetchPosts")
})
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

.logout-btn {
  margin-bottom: 15px;
  padding: 8px 16px;
  align-self: center;
  width: 100px;
  background: #aeeea9;
  color: black;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.logout-btn:hover {
  background: #77b074;
}

.clickable-post {
  cursor: pointer;
}

.clickable-post:hover {
  opacity: 0.9;
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
