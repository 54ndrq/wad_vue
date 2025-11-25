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
  store.dispatch("toggleLike", props.post.id);
}

</script>

<template>
  <div class="post">
    <div v-if="post">
      <div class="user-info">
        <img alt="login_picture" class="profile-picture" src="@/assets/login.png">
        <p class="username">{{ post.username }}</p>
        <p class="post-date"> {{ post.date }}</p>
      </div>
      <img alt = "post_picture" v-if="post.image" :src="require(`@/assets/${post.image}`)" class="post-image">
      <div class="post-footer">
        <p class="post-comment">{{ post.title }}</p>
        <div class="like-section">
          <button :class="{'liked':post.isLiked}" class="like-button" @click="handleLike">
            <img alt="Like" class="like-image" src="@/assets/like.png">
          </button>
          <p class="post-likes">{{ post.likes }} likes</p>
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
  align-items: center;
  width: 100%;
}

.like-image {
  width: 36px;
  height: 36px;
  padding: 5px;
  opacity: 0.5;
  cursor: pointer;
}

.like-button.liked .like-image {
  width: 36px;
  height: 36px;
  padding: 5px;
  opacity: 1;
  cursor: pointer;
}

.like-button {
  border: none;
  background-color: lightgray;
}

.post-likes {
  margin-left: auto;
  margin-right: 10px;
  font-weight: bold;
}

@media (max-width: 768px) {

  .user-info {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 5px 10px;
    gap: 10px;
    flex-wrap: wrap;
  }
}
</style>
