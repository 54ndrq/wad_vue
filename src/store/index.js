import {createStore} from 'vuex';
import postsData from "@/data/posts.json";

export default createStore({
    state: {
        posts: []
    },
    getters: {
        allPosts: state => state.posts
    },
    mutations: {
        SET_POSTS(state, posts) {
            state.posts = posts.map(post => ({
                ...post,
                isLiked: false
            }))
        },
        TOGGLE_LIKE_BUTTON(state, postId) {
            const post = state.posts.find(p => p.id === postId);
            if (post) {
                post.isLiked = !post.isLiked;

                if (post.isLiked) {
                    post.likes++;
                } else {
                    post.likes--;
                }
            }
        },
        UNLIKE_ALL_POSTS(state) {
            for (const post of state.posts) {
                post.likes = 0;
                post.isLiked = false;
            }
        }
    },
    actions: {
        fetchPosts({commit}) {
            commit("SET_POSTS", postsData)
        },
        toggleLike({commit}, postId) {
            commit("TOGGLE_LIKE_BUTTON", postId)
        },
        unlikeAll({commit}) {
            commit("UNLIKE_ALL_POSTS")
        }
    },
    modules: {}
})
