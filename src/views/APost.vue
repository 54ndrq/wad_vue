<template>
  <div class="apost-page">
    <div class="form-container">
      <h2>A Post</h2>

      <div class="form-group">
        <label for="body">Body</label>
        <input id="body" v-model="body" type="text"/>
      </div>

      <div class="button-group">
        <button class="action-btn" @click="updatePost">Update</button>
        <button class="action-btn" @click="deletePost">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {useStore} from 'vuex'

const route = useRoute()
const router = useRouter()
const store = useStore()

const postId = route.params.id
const body = ref('')

onMounted(() => {
  const post = store.getters.allPosts.find(p => p.id == postId)
  if (post) {
    body.value = post.body
  } else {
    console.log("Post not found")
  }
})

async function updatePost() {
  await store.dispatch('updatePost', {id: postId, body: body.value})
  router.push('/')
}

async function deletePost() {
  await store.dispatch('deletePost', postId)
  router.push('/')
}
</script>

<style scoped>
.apost-page {
  display: flex;
  justify-content: center;
  padding-top: 50px;
}

.form-container {
  background: #f0f0f0;
  padding: 25px;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  margin: 40px auto;
  text-align: center;
  box-shadow: 0 0 10px #ccc;
}

h2 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

label {
  font-weight: bold;
  min-width: 50px;
  text-align: right;
}

input {
  padding: 8px;
  border: 1px solid #888;
  border-radius: 6px;
  width: 60%;
}

input:focus {
  border-color: #2a4977;
  outline: none;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 10px;
}

.action-btn {
  padding: 10px 25px;
  background: #557798;
  color: black;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  min-width: 100px;
}

.action-btn:hover {
  background: #a6bbe4;
}
</style>
