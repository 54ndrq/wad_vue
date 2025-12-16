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
  <div class="actions">
    <button class="add-post" @click="addPost()"> Add Post</button>
    <button class="delete-posts" @click="deletePosts()"> Delete All</button>
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

function addPost() {
  router.push("/addpost")
}

function deletePosts() {
  store.dispatch('deleteAllPosts')
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

.actions {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
}

.add-post, .delete-posts {
  margin-bottom: 15px;
  padding: 8px 16px;
  width: 100px;
  background: #aeeea9;
  color: black;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.add-post:hover, .delete-posts:hover {
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
