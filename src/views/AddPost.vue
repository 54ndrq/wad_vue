<template>
  <div class="add-post-page">
    <div class="form-container">
      <h2>Add Post</h2>

      <div class="form-group">
        <label for="body">Body</label>
        <input id="body" v-model="body" placeholder="New post" type="text"/>
      </div>

      <button class="action-btn" @click="createPost">Add</button>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'

const router = useRouter()
const store = useStore()
const body = ref('')

async function createPost() {
  if (body.value.trim()) {
    await store.dispatch('addPost', body.value)
    router.push('/')
  } else {
    alert("Post body cannot be empty")
  }
}
</script>

<style scoped>
.add-post-page {
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

.action-btn {
  padding: 10px 25px;
  background: #557798;
  color: black;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  width: 100px;
  margin-top: 10px;
}

.action-btn:hover {
  background: #a6bbe4;
}
</style>
