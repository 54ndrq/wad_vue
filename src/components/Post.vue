<script setup>
import {useStore} from "vuex";

const store = useStore();

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
});

function handleLike() {
  store.dispatch("likePost", props.post.id);
}

</script>

<template>
  <div class="post">
    <div v-if="post">
      <div class="user-info">
        <img class="profile-picture" src="@/assets/login.png">
        <p class="username">{{ post.username }}</p>
        <p class="post-date"> {{ post.date }}</p>
      </div>
      <img v-if="post.image" :src="require(`@/assets/${post.image}`)" class="post-image">
      <div class="post-footer">
        <p class="post-comment">{{ post.title }}</p>
        <div class="like-section">
          <button class="like-button" @click="handleLike">
            <img alt="Like" class="like-image" src="@/assets/like.png">
          </button>
          <p class="post-likes">{{ post.likes }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.post {
  border: 1px solid #ccc;
  border-radius: 20px;
  background-color: lightgray;
  padding: 1rem;
  margin: 1rem;
}

.user-info {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 5px 10px;
  gap: 20px;
  flex-wrap: nowrap;
}

.profile-picture {
  width: 42px;
  height: 42px;
  border-radius: 50%;
}

.username {
  font-weight: bold;
}

.post-date {
  margin-left: auto;
}

.post-image {
  width: 100%;
  border-radius: 10px;
  max-height: 400px;
}

.post-footer {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}

img {
  max-width: 100%;
}

.post-comment {
  margin: 10px 5px;
}

.like-section {
  display: flex;
  flex-direction: row;
}

.like-image {
  width: 36px;
  height: 36px;
  padding: 5px;
  cursor: pointer;
}

.like-button {
  border: none;
  background-color: lightgray;
}
</style>
